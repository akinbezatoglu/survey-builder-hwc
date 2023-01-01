package model

import (
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

//	var emailRegexp = regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

// User is the structure of a user
type User struct {
	ID       primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Name     string             `json:"name" bson:"name,omitempty"`
	Lastname string             `json:"lastname" bson:"lastname,omitempty"`
	Email    string             `json:"email" bson:"email,omitempty"`
	Password string             `json:"password" bson:"password,omitempty"`
	Forms    []string           `bson:"forms,omitempty"`
	Token    string             `json:"token" bson:"token,omitempty"`
}

type ViewUser struct {
	ID       string   `json:"_id" bson:"_id,omitempty"`
	Name     string   `json:"name" bson:"name,omitempty"`
	Lastname string   `json:"lastname" bson:"lastname,omitempty"`
	Forms    []string `bson:"forms,omitempty"`
	Email    string   `json:"email" bson:"email,omitempty"`
	Password string   `json:"password" bson:"password,omitempty"`
	Token    string   `json:"token" bson:"token,omitempty"`
}

// ContextKey implements type for context key
type ContextKey string

// ContextJWTKey is the key for the jwt context value
const ContextJWTKey ContextKey = "jwt"

// ParseJWT parses and validates a token using the HMAC signing method
func (u *User) ParseJWT() error {
	token, err := jwt.Parse(u.Token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte("Cv2UGHgSLdkIpw8"), nil
	})

	if err != nil {
		return err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		u.Email = claims["email"].(string)
		u.Name = claims["name"].(string)
		u.Lastname = claims["lastname"].(string)
		u.Password = claims["password"].(string)
		return nil
	}
	return fmt.Errorf("jwt validation failed")
}

// createJWT creates, signs, and encodes a JWT token using the HMAC signing method
func (u *User) CreateJWT() error {
	claims := jwt.MapClaims{
		"email":    u.Email,
		"name":     u.Name,
		"lastname": u.Lastname,
		"password": u.Password,
		"exp":      time.Now().Add(time.Hour * 24).Unix(), // one day
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte("Cv2UGHgSLdkIpw8"))
	if err != nil {
		return err
	}

	u.Token = tokenString
	return nil
}

// HashPassword hashed the password of the user
func (u *User) HashPassword() error {
	key, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	u.Password = string(key)

	return nil
}

// MatchPassword returns true if the hashed user password matches the password
func (u *User) MatchPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))

	return err == nil
}

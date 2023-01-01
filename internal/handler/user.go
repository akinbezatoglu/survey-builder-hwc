package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"strings"

	"huaweicloud.com/akinbe/survey-builder-app/internal/model"
	"huaweicloud.com/akinbe/survey-builder-app/internal/service"
)

// api/v1/auth	GET
// Checks if the user is authenticated
func UserValidate(token string) (*model.ViewUser, int, error) {
	var u model.User
	u.Token = token
	err := u.ParseJWT()
	if err != nil {
		return nil, http.StatusUnauthorized, err
	}
	s := service.New()
	err = s.Start()
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}

	user, err := s.DB.GetUserByEmail(u.Email)
	if err != nil {
		return nil, http.StatusUnauthorized, err
	}
	resp := &model.ViewUser{
		ID:       user.ID.Hex(),
		Name:     user.Name,
		Lastname: user.Lastname,
		Forms:    user.Forms,
	}
	return resp, http.StatusOK, nil
}

// api/v1/auth/login	POST
// Handles user login
func UserLoginPostHandler(reqBody string) (*model.User, int, error) {
	s := service.New()
	err := s.Start()
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}

	var u *model.User
	err = json.Unmarshal([]byte(reqBody), &u)
	if err != nil {
		return nil, http.StatusBadRequest, err
	}

	if len(u.Email) == 0 || len(u.Password) == 0 {
		return nil, http.StatusBadRequest, errors.New("missing required data")
	}

	// Always use the lower case email address
	u.Email = strings.ToLower(u.Email)
	// Get the user database entry
	user, err := s.DB.GetUserByEmail(u.Email)
	if err != nil {
		return nil, http.StatusInternalServerError, err
	} else if user == nil {
		return nil, http.StatusBadRequest, errors.New("missing required data")
	}
	// Check the password
	if !user.MatchPassword(u.Password) {
		return nil, http.StatusBadRequest, errors.New("missing required data")
	}
	// Create jwt token
	err = user.CreateJWT()
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}
	return user, http.StatusOK, nil
}

// api/v1/auth/signup	POST
// Handles user registration
func UserSignupPostHandler(reqBody string) (*model.ViewUser, int, error) {
	s := service.New()
	err := s.Start()
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}

	var u model.User
	err = json.Unmarshal([]byte(reqBody), &u)
	if err != nil {
		return nil, http.StatusBadRequest, err
	}

	if len(u.Email) == 0 || len(u.Password) == 0 || len(u.Name) == 0 || len(u.Lastname) == 0 {
		return nil, http.StatusBadRequest, errors.New("missing required data")
	}

	// Always use the lower case email address
	u.Email = strings.ToLower(u.Email)

	// Create jwt token
	u.CreateJWT()
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}
	// Hash the user password
	err = u.HashPassword()
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}
	// Save user to database
	InsertedUserID, err := s.DB.CreateUser(&u)
	if err != nil {
		if err.Error() == "email_address_already_exists" {
			return nil, http.StatusConflict, errors.New("email address already exists")
		}
		return nil, http.StatusInternalServerError, err
	}
	returnUser := model.ViewUser{
		ID:       InsertedUserID,
		Name:     u.Name,
		Lastname: u.Lastname,
		Email:    u.Email,
		Password: u.Password,
		Token:    u.Token,
	}
	return &returnUser, http.StatusOK, nil
}

// api/v1/profile/{userid}	GET
// Retrieves the user's information
func UserProfileGetHandler(token string) (*model.User, int, error) {
	var u model.User
	u.Token = token
	err := u.ParseJWT()
	if err != nil {
		return nil, http.StatusUnauthorized, err
	}

	s := service.New()
	err = s.Start()
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}

	user, err := s.DB.GetUserByEmail(u.Email)
	if err != nil {
		return nil, http.StatusUnauthorized, err
	}
	return user, http.StatusOK, nil
}

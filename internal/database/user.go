package database

import (
	"context"
	"fmt"

	"huaweicloud.com/akinbe/survey-builder-app/internal/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// CreateUser creates a new user
func (db *DB) CreateUser(u *model.User) (string, error) {
	collection := db.GetCollectionByName("User")

	result, err := collection.InsertOne(context.Background(), u)
	if err != nil {
		if writeErr, ok := err.(mongo.WriteErrors); ok {
			if len(writeErr) == 1 && writeErr[0].Code == 11000 {
				return "", fmt.Errorf("email_address_already_exists")
			}
		}
		return "", err
	}

	InsertedUserID := result.InsertedID.(primitive.ObjectID).Hex()
	return InsertedUserID, nil
}

// GetUser returns a user
func (db *DB) GetUser(id string) (*model.User, error) {
	collection := db.GetCollectionByName("User")
	var user model.User
	docID, _ := primitive.ObjectIDFromHex(id)
	cursor := collection.FindOne(
		context.Background(),
		bson.D{primitive.E{
			Key:   "_id",
			Value: docID,
		}},
	)

	err := cursor.Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}

		return nil, err
	}

	return &user, nil
}

// GetUserByEmail returns a user by his email address
func (db *DB) GetUserByEmail(email string) (*model.User, error) {
	collection := db.GetCollectionByName("User")
	var user model.User

	cursor := collection.FindOne(
		context.Background(),
		bson.D{primitive.E{
			Key:   "email",
			Value: email,
		}},
	)

	err := cursor.Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}

		return nil, err
	}

	return &user, nil
}

// GetUserByForm returns a user by his forms
func (db *DB) GetUserByForm(formID string) (*model.User, error) {
	collection := db.GetCollectionByName("User")
	var user model.User

	cursor := collection.FindOne(
		context.Background(),
		bson.D{primitive.E{
			Key:   "forms",
			Value: formID,
		}},
	)

	if cursor.Err() != nil {

		return nil, cursor.Err()
	}

	err := cursor.Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}

		return nil, err
	}

	return &user, nil
}

// SaveUser saves the given user struct
func (db *DB) SaveUser(u *model.User) error {
	collection := db.GetCollectionByName("User")
	cursor := collection.FindOneAndReplace(
		context.Background(),
		bson.D{primitive.E{
			Key:   "_id",
			Value: u.ID,
		}},
		u,
	)

	if cursor.Err() != nil {
		if writeErr, ok := cursor.Err().(mongo.WriteErrors); ok {
			if len(writeErr) == 1 && writeErr[0].Code == 11000 {
				return fmt.Errorf("email_address_already_exists")
			}
		}

		return cursor.Err()
	}

	return nil
}

// DeleteUser deletes the user with the given id
func (db *DB) DeleteUser(id string) error {
	collection := db.GetCollectionByName("User")
	cursor := collection.FindOneAndDelete(
		context.Background(),
		bson.D{primitive.E{
			Key:   "_id",
			Value: id,
		}},
	)

	if cursor.Err() != nil {
		return cursor.Err()
	}

	return nil
}

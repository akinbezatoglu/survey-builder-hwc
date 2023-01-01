package database

import (
	"context"

	"huaweicloud.com/akinbe/survey-builder-app/internal/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// CreateUser creates a new user
func (db *DB) CreateAnswer(q *model.Answer) (string, error) {
	collection := db.GetCollectionByName("Answer")

	result, err := collection.InsertOne(context.Background(), q)
	if err != nil {
		return "", err
	}

	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (db *DB) GetAnswer(id string) (*model.Answer, error) {
	collection := db.GetCollectionByName("Answer")
	var ans model.Answer
	docID, _ := primitive.ObjectIDFromHex(id)
	cursor := collection.FindOne(
		context.Background(),
		bson.D{primitive.E{
			Key:   "_id",
			Value: docID,
		}},
	)
	if cursor.Err() != nil {
		return nil, cursor.Err()
	}
	err := cursor.Decode(&ans)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}
	return &ans, nil
}

// SaveUser saves the given user struct
func (db *DB) SaveAnswer(q *model.Answer) error {
	collection := db.GetCollectionByName("Answer")
	cursor := collection.FindOneAndReplace(
		context.Background(),
		bson.D{primitive.E{
			Key:   "_id",
			Value: q.ID,
		}},
		q,
	)
	if cursor.Err() != nil {
		return cursor.Err()
	}
	return nil
}

// DeleteUser deletes the user with the given id
func (db *DB) DeleteAnswer(id string) error {
	collection := db.GetCollectionByName("Answer")
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

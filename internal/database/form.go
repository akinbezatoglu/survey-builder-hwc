package database

import (
	"context"
	"fmt"

	"huaweicloud.com/akinbe/survey-builder-app/internal/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func (db *DB) CreateForm(f *model.Form) (string, error) {
	collection := db.GetCollectionByName("Form")

	result, err := collection.InsertOne(context.Background(), f)
	if err != nil {
		return "", err
	}

	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (db *DB) GetForm(id string) (*model.Form, error) {
	collection := db.GetCollectionByName("Form")
	var form model.Form
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
	err := cursor.Decode(&form)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}
	return &form, nil
}

func (db *DB) SaveForm(f *model.Form) error {
	collection := db.GetCollectionByName("Form")
	cursor := collection.FindOneAndReplace(
		context.Background(),
		bson.D{primitive.E{
			Key:   "_id",
			Value: f.ID,
		}},
		f,
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

func (db *DB) DeleteForm(id primitive.ObjectID) error {
	collection := db.GetCollectionByName("Form")
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

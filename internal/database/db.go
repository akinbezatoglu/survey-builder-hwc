package database

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Config represents MongoDB configuration
type Config struct {
	ConnectionURI string `json:"connection_uri"`
	DatabaseName  string `json:"database_name"`
}

// Instance represents an instance of the server
type DB struct {
	Config *Config
	Client *mongo.Client
}

// NewConnection creates a new database connection
func (db *DB) NewConnection() error {
	client_options := options.Client().ApplyURI(db.Config.ConnectionURI)

	// 5 second
	var t time.Duration = 1000000000 * 5
	client_options.ServerSelectionTimeout = &t

	var err error
	db.Client, err = mongo.Connect(context.Background(), client_options)

	if err != nil {
		return err
	}
	// Check the connection
	err = db.Client.Ping(context.Background(), nil)
	if err != nil {
		return err
	}
	return nil
}

// Get specified collection by name
func (db *DB) GetCollectionByName(collectionName string) *mongo.Collection {
	collection := db.Client.Database(db.Config.DatabaseName).Collection(collectionName)
	return collection
}

// CloseConnection closes the database connection
func (db *DB) CloseConnection() error {
	err := db.Client.Disconnect(context.Background())
	if err != nil {
		return err
	}
	return nil
}

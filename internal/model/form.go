package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Form is the structure of a form
type Form struct {
	ID        primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Name      string             `json:"name" bson:"name,omitempty"`
	Desc      string             `json:"desc" bson:"desc,omitempty"`
	Questions []string           `json:"questions" bson:"questions,omitempty"`
	IsVisible bool               `json:"isVisible" bson:"isVisible,omitempty"`
}

type ViewForm struct {
	ID        primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Name      string             `json:"name" bson:"name,omitempty"`
	Desc      string             `json:"desc" bson:"desc,omitempty"`
	Questions []Question         `json:"questions" bson:"questions,omitempty"`
	IsVisible bool               `json:"isVisible" bson:"isVisible,omitempty"`
}

// For Home Page
type FormSmall struct {
	ID   string `json:"_id" bson:"_id,omitempty"`
	Name string `json:"name" bson:"name,omitempty"`
}

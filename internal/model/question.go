package model

import "go.mongodb.org/mongo-driver/bson/primitive"

// Form is the structure of a form
type Question struct {
	ID         primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Ques       string             `json:"ques" bson:"ques,omitempty"`
	Options    []Option           `json:"options" bson:"options,omitempty"`
	Type       int                `json:"type" bson:"type,omitempty"`
	Score      int                `json:"score" bson:"score,omitempty"`
	Answers    []string           `json:"answers" bson:"answers,omitempty"`
	No         int                `json:"no" bson:"no,omitempty"`
	After      int                `json:"after" bson:"after,omitempty"`
	IsRequired bool               `json:"isrequired" bson:"isrequired,omitempty"`
}

type Option struct {
	Number int    `json:"number" bson:"number,omitempty"`
	Opt    string `json:"opt" bson:"opt,omitempty"`
	IsTrue bool   `json:"isTrue" bson:"isTrue,omitempty"`
}

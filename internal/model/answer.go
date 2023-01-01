package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Form is the structure of a form
type Answer struct {
	ID     primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	QuesID string             `json:"quesID" bson:"quesID,omitempty"`
	Opt    string             `json:"opt" bson:"opt,omitempty"`
	IsTrue bool               `json:"isTrue" bson:"isTrue,omitempty"`
	Score  int                `json:"score" bson:"score,omitempty"`
}

type AllAnswers struct {
	Answers []Answer `json:"answers" bson:"answers,omitempty"`
}

type ViewResponse struct {
	Ques string   `json:"ques" bson:"ques,omitempty"`
	Opt  []string `json:"opt" bson:"opt,omitempty"`
}

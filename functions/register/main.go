package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"net/http"

	"huaweicloud.com/akinbe/survey-builder-app/internal/go-runtime/events/apig"
	"huaweicloud.com/akinbe/survey-builder-app/internal/go-runtime/go-api/context"
	"huaweicloud.com/akinbe/survey-builder-app/internal/go-runtime/pkg/runtime"
	"huaweicloud.com/akinbe/survey-builder-app/internal/handler"
)

func RegisterHandler(payload []byte, ctx context.RuntimeContext) (interface{}, error) {
	// parse request body
	var apigEvent apig.APIGTriggerEvent
	err := json.Unmarshal(payload, &apigEvent)
	if err != nil {
		apigResp := apig.APIGTriggerResponse{
			Body: err.Error(),
			Headers: map[string]string{
				"content-type": "application/json",
			},
			StatusCode: http.StatusBadRequest,
		}
		return apigResp, nil
	}

	// Logic
	//user := &model.User{
	//	Name:     apigEvent.PathParameters["name"],
	//	Lastname: apigEvent.PathParameters["lastname"],
	//	Email:    apigEvent.PathParameters["email"],
	//	Password: apigEvent.PathParameters["password"],
	//}
	data, _ := base64.StdEncoding.DecodeString(apigEvent.PathParameters["data"])
	data_str := bytes.NewBuffer(data).String()
	viewuser, status, err := handler.UserSignupPostHandler(data_str)
	if err != nil {
		// response with status
		apigResp := apig.APIGTriggerResponse{
			Body: err.Error(),
			Headers: map[string]string{
				"content-type": "application/json",
			},
			StatusCode: status,
		}
		return apigResp, nil
	} else {
		e, _ := json.Marshal(viewuser)
		user_str := string(e)
		//response with status OK and user's token in body
		apigResp := apig.APIGTriggerResponse{
			Body: user_str,
			Headers: map[string]string{
				"content-type": "application/json",
			},
			StatusCode: status, // OK
		}
		return apigResp, nil
	}
}

func main() {
	runtime.Register(RegisterHandler)
}

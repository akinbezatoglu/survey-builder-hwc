package main

import (
	"encoding/json"
	"net/http"
	"strings"

	"huaweicloud.com/akinbe/survey-builder-app/internal/go-runtime/events/apig"
	"huaweicloud.com/akinbe/survey-builder-app/internal/go-runtime/go-api/context"
	"huaweicloud.com/akinbe/survey-builder-app/internal/go-runtime/pkg/runtime"
	"huaweicloud.com/akinbe/survey-builder-app/internal/handler"
)

func UserProfileHandler(payload []byte, ctx context.RuntimeContext) (interface{}, error) {
	// parse request body
	var apigEvent apig.APIGTriggerEvent
	err := json.Unmarshal(payload, &apigEvent)
	if err != nil {
		apigResp := apig.APIGTriggerResponse{
			Body: apigEvent.String(),
			Headers: map[string]string{
				"content-type": "application/json",
			},
			StatusCode: http.StatusBadRequest, // BadRequest
		}
		return apigResp, nil
	}

	// Logic
	//data, _ := base64.StdEncoding.DecodeString(apigEvent.PathParameters["data"])
	//data_str := bytes.NewBuffer(data).String()

	authz := apigEvent.Headers["Authorization"]
	authzParts := strings.Split(authz, " ")

	if len(authzParts) != 2 || strings.ToLower(authzParts[0]) != "bearer" {
		apigResp := apig.APIGTriggerResponse{
			Body: apigEvent.String(),
			Headers: map[string]string{
				"content-type": "application/json",
			},
			StatusCode: http.StatusUnauthorized,
		}
		return apigResp, nil
	}

	token := authzParts[1]

	user, status, err := handler.UserProfileGetHandler(token)
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
		e, _ := json.Marshal(user)
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
	runtime.Register(UserProfileHandler)
}
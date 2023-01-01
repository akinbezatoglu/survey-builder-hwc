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

func CreateFormHandler(payload []byte, ctx context.RuntimeContext) (interface{}, error) {
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

	// Logic
	userid := apigEvent.PathParameters["userid"]

	fID, status, err := handler.CreateFormHandler(token, userid)
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
		//response with status OK and user's token in body
		apigResp := apig.APIGTriggerResponse{
			Body: fID,
			Headers: map[string]string{
				"content-type": "application/json",
			},
			StatusCode: status, // OK
		}
		return apigResp, nil
	}
}

func main() {
	runtime.Register(CreateFormHandler)
}

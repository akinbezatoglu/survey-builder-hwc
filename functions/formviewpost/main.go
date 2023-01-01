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
	"huaweicloud.com/akinbe/survey-builder-app/internal/model"
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

	// Logic
	formid := apigEvent.PathParameters["formid"]

	data, _ := base64.StdEncoding.DecodeString(apigEvent.PathParameters["data"])
	data_str := bytes.NewBuffer(data).String()

	var ans []model.Answer
	err = json.Unmarshal([]byte(data_str), &ans)
	if err != nil {
		apigResp := apig.APIGTriggerResponse{
			Body: err.Error(),
			Headers: map[string]string{
				"content-type": "application/json",
			},
			StatusCode: 400,
		}
		return apigResp, nil
	}

	status, err := handler.FormViewPostHandler(formid, ans)
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
			Body: "",
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

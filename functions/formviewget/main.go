package main

import (
	"encoding/json"
	"net/http"

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

	// Logic
	formid := apigEvent.PathParameters["formid"]

	form, status, err := handler.FormViewGetHandler(formid)
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
		e, _ := json.Marshal(form)
		form_str := string(e)
		//response with status OK and user's token in body
		apigResp := apig.APIGTriggerResponse{
			Body: form_str,
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

## A Survey Management Application on Huawei Cloud

### Project Architecture
![2b0ad016eaf546c3b7a3812c04d218af 20230125131434 16010621640136025150067405028411](https://github.com/akinbezatoglu/survey-builder-hwc/assets/61403011/bddf2ec8-2825-48cc-844e-5bfdc5a43873)

### API Gateway Endpoints with Serverless Backend (Functions)

This list shows which endpoints and HTTP methods will trigger which serverless functions in the backend.

1. #### [functions/register](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/register/main.go)
    `POST` `/api/v1/auth/signup`

    This API endpoint is designed to handle user registration. It expects a POST request containing user information, likely in the request body, for creating a new user account.

2. #### [functions/login](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/login/main.go)
    `POST` `/api/v1/auth/login`

    This API endpoint is used for user login. It expects a POST request containing user credentials, typically in the request body, to authenticate an existing user.

2. #### [functions/userprofile](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/userprofile/main.go)
    `GET` `/api/v1/profile`

    This API endpoint retrieves a user's profile information. It expects a GET request and likely requires some form of authentication (e.g., an access token) to be included in the request header to authorize access to the user's private profile data.

3. #### [functions/formcreate](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/formcreate/main.go)
    `POST` `/api/v1/f`

    This API endpoint handles form submissions. It expects a POST request containing form data, typically in the request body, to create a form.

4. #### [functions/formdelete](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/formdelete/main.go)
    `DELETE` `/api/v1/f/{id}`

    This API endpoint is used to delete a specific form. It expects a DELETE request targeting a URL with a placeholder for the form identifier.

5. #### [functions/formget](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/formget/main.go)
    `GET` `/api/v1/f/{id}`

    This API endpoint retrieves information about a specific form. It expects a GET request targeting a URL with a placeholder for the form identifier.

6. #### [functions/formgetall](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/formgetall/main.go)
    `GET` `/api/v1/f`

    This API endpoint retrieves a list of forms accessible to the user. It expects a GET request and might require some form of authentication (e.g., access token) to be included in the request header.

7. #### [functions/formput](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/formput/main.go)
    `PUT` `/api/v1/f/{id}`

    This API endpoint allows updating an existing form. It expects a PUT request targeting a URL with a placeholder for the form identifier and includes the updated form data in the request body.

8. #### [functions/formresponseget](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/formresponseget/main.go)
    `GET` `/api/v1/f/{id}/response`

    This API endpoint retrieves responses submitted to a specific form. It expects a GET request targeting a URL with a placeholder for the form identifier.

9. #### [functions/formviewget](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/formviewget/main.go)
    `GET` `/api/v1/f/{id}/view`

    This API endpoint retrieves information about a specific form for viewing purposes. It expects a GET request targeting a URL with a placeholder for the form identifier.

10. #### [functions/formviewpost](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/formviewpost/main.go)
    `POST` `/api/v1/f/{id}/answer`

    This API endpoint allows users to submit answers for a specific form. It expects a POST request to be sent to the designated URL.

14. #### [functions/questiondelete](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/questiondelete/main.go)
    `DELETE` `/api/v1/f/{id}/question/{id}`

    This API endpoint permanently deletes a specific question from a form. It expects a DELETE request to be sent to the designated URL.

15. #### [functions/questionpost](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/questionpost/main.go)
    `POST` `/api/v1/f/{id}/question`
    
    This API endpoint creates a new question within a specified form. It expects a POST request to be sent to the designated URL.

16. #### [functions/questionpostcopy](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/questionpostcopy/main.go)
    `POST` `/api/v1/f/{id}/question/{id}/copy`

    This API endpoint duplicates an existing question within a form, creating a new copy of the question. It expects a POST request to be sent to the designated URL.

17. #### [functions/questionput](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/questionput/main.go)
    `PUT` `/api/v1/f/{id}/question/{id}`

    This API endpoint updates an existing question within a form. It replaces the entire question with the new data provided in the request body. It expects a PUT request to be sent to the designated URL.

11. #### [functions/optiondelete](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/optiondelete/main.go)
    `DELETE` `/api/v1/f/{id}/question/{id}/option/{id}`

    This API endpoint permanently deletes a specific option from within a question on a form. It expects a DELETE request to be sent to the designated URL.

12. #### [functions/optionpost](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/optionpost/main.go)
    `POST` `/api/v1/f/{id}/question/{id}/option`

    This API endpoint creates a new option within a specified question on a form. It expects a POST request to be sent to the designated URL.

13. #### [functions/optionput](https://github.com/akinbezatoglu/survey-builder/blob/master/functions/optionput/main.go)
    `PUT` `/api/v1/f/{id}/question/{id}/option/{id}`

    This API endpoint updates an existing option within a question on a form. It replaces the entire option with the new data provided in the request body. It expects a PUT request to be sent to the designated URL.

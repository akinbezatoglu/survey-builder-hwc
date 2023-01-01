package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"strings"

	"github.com/mitchellh/mapstructure"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"huaweicloud.com/akinbe/survey-builder-app/internal/model"
	"huaweicloud.com/akinbe/survey-builder-app/internal/service"
)

// f/{formid}/view	GET
// Handles surveys being displayed on a page where they can be answered.
func FormViewGetHandler(formid string) (*model.ViewForm, int, error) {
	s := service.New()
	err := s.Start()
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}
	f, err := s.DB.GetForm(formid)
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}
	var q []model.Question
	for i := 0; i < len(f.Questions); i++ {
		ques, err := s.DB.GetQuestion(f.Questions[i])
		if err != nil {
			return nil, http.StatusInternalServerError, err
		}
		q = append(q, *ques)
	}
	var viewForm model.ViewForm
	mapstructure.Decode(f, &viewForm)
	viewForm.Questions = q
	return &viewForm, http.StatusOK, nil
}

// f/{formid}/view	POST
// Handles survey responses
func FormViewPostHandler(formid string, allAnswers []model.Answer) (int, error) {
	s := service.New()
	err := s.Start()
	if err != nil {
		return http.StatusInternalServerError, err
	}
	_, err = s.DB.GetForm(formid)
	if err != nil {
		return http.StatusInternalServerError, err
	}
	for i := 0; i < len(allAnswers); i++ {
		q, err := s.DB.GetQuestion(allAnswers[i].QuesID)
		if err != nil {
			return http.StatusInternalServerError, err
		}
		answer := allAnswers[i]
		ansID, err := s.DB.CreateAnswer(&answer)
		if err != nil {
			return http.StatusInternalServerError, err
		}
		q.Answers = append(q.Answers, ansID)
		err = s.DB.SaveQuestion(q)
		if err != nil {
			return http.StatusInternalServerError, err
		}
	}
	return http.StatusOK, nil
}

// f/{userid}/{formid} GET
// Handles sending the user the survey that the user wants to edit.
func FormGetHandler(token string, userid string, formid string) (*model.ViewForm, int, error) {
	var u model.User
	u.Token = token
	err := u.ParseJWT()
	if err != nil {
		return nil, http.StatusUnauthorized, err
	}

	s := service.New()
	err = s.Start()
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}

	owner := false
	user, err := s.DB.GetUser(userid)
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}

	us, err := s.DB.GetUserByEmail(u.Email)
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}
	if us.ID == user.ID {
		for _, v := range user.Forms {
			if v == formid {
				owner = true
				break
			}
		}
		if owner {
			f, err := s.DB.GetForm(formid)
			if err != nil {
				return nil, http.StatusInternalServerError, err
			}
			var q []model.Question
			if len(f.Questions) != 0 {
				for i := 0; i < len(f.Questions); i++ {
					ques, err := s.DB.GetQuestion(f.Questions[i])
					if err != nil {
						return nil, http.StatusInternalServerError, err
					}
					q = append(q, *ques)
				}
			}
			var viewForm model.ViewForm
			mapstructure.Decode(f, &viewForm)
			viewForm.Questions = q
			return &viewForm, http.StatusOK, nil
		} else {
			return nil, http.StatusUnauthorized, errors.New("Unauthorized")
		}
	} else {
		return nil, http.StatusForbidden, errors.New("Forbidden")
	}
}

// f/{userid}/{formid} GET
// Handles the changes that the users will have made in their surveys.
func FormPutHandler(token string, userid string, formid string, reqBody string) (int, error) {
	var u model.User
	u.Token = token
	err := u.ParseJWT()
	if err != nil {
		return http.StatusUnauthorized, err
	}

	s := service.New()
	err = s.Start()
	if err != nil {
		return http.StatusInternalServerError, err
	}

	owner := false

	user, err := s.DB.GetUser(userid)
	if err != nil {
		return http.StatusInternalServerError, err
	}

	us, err := s.DB.GetUserByEmail(u.Email)
	if err != nil {
		return http.StatusInternalServerError, err
	}
	if us.ID == user.ID {
		for _, v := range user.Forms {
			if v == formid {
				owner = true
				break
			}
		}
		if owner {
			form, err := s.DB.GetForm(formid)
			if err != nil {
				return http.StatusInternalServerError, err
			}
			r := strings.NewReader(reqBody)
			err = json.NewDecoder(r).Decode(&form)
			if err != nil {
				return http.StatusInternalServerError, err
			}
			err = s.DB.SaveForm(form)
			if err != nil {
				return http.StatusInternalServerError, err
			}
			return http.StatusOK, nil
		} else {
			return http.StatusUnauthorized, errors.New("Unauthorized")
		}
	} else {
		return http.StatusForbidden, errors.New("Forbidden")
	}
}

// f/{userid}/{formid} DELETE
// Handles users deleting their surveys.
func FormDeleteHandler(token string, userid string, formid string) (int, error) {
	var u model.User
	u.Token = token
	err := u.ParseJWT()
	if err != nil {
		return http.StatusUnauthorized, err
	}

	s := service.New()
	err = s.Start()
	if err != nil {
		return http.StatusInternalServerError, err
	}

	owner := false

	user, err := s.DB.GetUser(userid)
	if err != nil {
		return http.StatusInternalServerError, err
	}

	us, err := s.DB.GetUserByEmail(u.Email)
	if err != nil {
		return http.StatusInternalServerError, err
	}
	if us.ID == user.ID {
		for _, v := range user.Forms {
			if v == formid {
				owner = true
				break
			}
		}
		if owner {
			succes := false
			for i := 0; i < len(user.Forms); i++ {
				if user.Forms[i] == formid {
					fID, err := primitive.ObjectIDFromHex(formid)
					if err != nil {
						return http.StatusInternalServerError, err
					}
					err = s.DB.DeleteForm(fID)
					if err != nil {
						return http.StatusInternalServerError, err
					}
					// Remove the element at index i from a.
					copy(user.Forms[i:], user.Forms[i+1:])      // Shift a[i+1:] left one index.
					user.Forms[len(user.Forms)-1] = ""          // Erase last element (write zero value).
					user.Forms = user.Forms[:len(user.Forms)-1] // Truncate slice.
					err = s.DB.SaveUser(user)
					if err != nil {
						return http.StatusInternalServerError, err
					}
					succes = true
					return http.StatusOK, nil
				}
			}
			if !succes {
				return http.StatusInternalServerError, err
			} else {
				return http.StatusUnauthorized, errors.New("Unauthorized")
			}
		} else {
			return http.StatusUnauthorized, errors.New("Unauthorized")
		}
	} else {
		return http.StatusForbidden, errors.New("Forbidden")
	}
}

// f/{userid}/{formid}/response	GET
// Handles the display of survey responses.
func FormResponseGetHandler(token string, userid string, formid string) ([]model.ViewResponse, int, error) {
	var u model.User
	u.Token = token
	err := u.ParseJWT()
	if err != nil {
		return nil, http.StatusUnauthorized, err
	}

	s := service.New()
	err = s.Start()
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}

	owner := false

	user, err := s.DB.GetUser(userid)
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}
	for _, v := range user.Forms {
		if v == formid {
			owner = true
			break
		}
	}
	if owner {
		f, err := s.DB.GetForm(formid)
		if err != nil {
			return nil, http.StatusInternalServerError, err
		}
		var res []model.ViewResponse
		for i := 0; i < len(f.Questions); i++ {

			ques, err := s.DB.GetQuestion(f.Questions[i])
			if err != nil {
				return nil, http.StatusInternalServerError, err
			}
			var responseOfques model.ViewResponse
			responseOfques.Ques = ques.Ques
			for j := 0; j < len(ques.Answers); j++ {
				ans, err := s.DB.GetAnswer(ques.Answers[j])
				if err != nil {
					return nil, http.StatusInternalServerError, err
				}
				responseOfques.Opt = append(responseOfques.Opt, ans.Opt)
			}
			res = append(res, responseOfques)
		}
		return res, http.StatusOK, nil
	} else {
		return nil, http.StatusUnauthorized, errors.New("Unauthorized")
	}
}

// q/{userid}/{formid}
// Handles creating new questions on the survey.
func QuestionPostHandler(token string, userid string, formid string, reqBody string) (string, int, error) {
	var u model.User
	u.Token = token
	err := u.ParseJWT()
	if err != nil {
		return "", http.StatusUnauthorized, err
	}

	s := service.New()
	err = s.Start()
	if err != nil {
		return "", http.StatusInternalServerError, err
	}

	owner := false

	user, err := s.DB.GetUser(userid)
	if err != nil {
		return "", http.StatusInternalServerError, err
	}

	us, err := s.DB.GetUserByEmail(u.Email)
	if err != nil {
		return "", http.StatusInternalServerError, err
	}
	if us.ID == user.ID {
		for _, v := range user.Forms {
			if v == formid {
				owner = true
				break
			}
		}
		if owner {
			f, err := s.DB.GetForm(formid)
			if err != nil {
				return "", http.StatusInternalServerError, err
			}
			numberOfQuestions := len(f.Questions)
			var q model.Question

			r := strings.NewReader(reqBody)
			err = json.NewDecoder(r).Decode(&q)
			if err != nil {
				return "", http.StatusInternalServerError, err
			}
			if err != nil {
				return "", http.StatusInternalServerError, err
			}

			q.Ques = "Soru"
			q.No = numberOfQuestions + 1
			var o model.Option
			if q.Type == 1 {
				o.Opt = "Seçenek"

			} else if q.Type == 3 {
				o.Opt = "İşaretleyiniz"
			}

			o.IsTrue = false
			o.Number = 1

			q.Options = append(q.Options, o)
			qID, err := s.DB.CreateQuestion(&q)
			if err != nil {
				return "", http.StatusInternalServerError, err
			}
			f.Questions = append(f.Questions, qID)
			err = s.DB.SaveForm(f)
			if err != nil {
				return "", http.StatusInternalServerError, err
			}
			return qID, http.StatusOK, nil

		} else {
			return "", http.StatusUnauthorized, errors.New("Unauthorized")
		}
	} else {
		return "", http.StatusForbidden, errors.New("Forbidden")
	}
}

// q/{userid}/{formid}/copy
// Handles creating new questions on the survey.
func QuestionPostCopyHandler(token string, userid string, formid string, reqBody string) (string, int, error) {
	var u model.User
	u.Token = token
	err := u.ParseJWT()
	if err != nil {
		return "", http.StatusUnauthorized, err
	}

	s := service.New()
	err = s.Start()
	if err != nil {
		return "", http.StatusInternalServerError, err
	}

	owner := false
	user, err := s.DB.GetUser(userid)
	if err != nil {
		return "", http.StatusInternalServerError, err
	}

	us, err := s.DB.GetUserByEmail(u.Email)
	if err != nil {
		return "", http.StatusInternalServerError, err
	}
	if us.ID == user.ID {
		for _, v := range user.Forms {
			if v == formid {
				owner = true
				break
			}
		}
		if owner {
			f, err := s.DB.GetForm(formid)
			if err != nil {
				return "", http.StatusInternalServerError, err
			}
			numberOfQuestions := len(f.Questions)
			var q model.Question

			r := strings.NewReader(reqBody)
			err = json.NewDecoder(r).Decode(&q)
			if err != nil {
				return "", http.StatusInternalServerError, err
			}
			q.No = numberOfQuestions + 1
			qID, err := s.DB.CreateQuestion(&q)
			if err != nil {
				return "", http.StatusInternalServerError, err
			}
			f.Questions = append(f.Questions, qID)
			err = s.DB.SaveForm(f)
			if err != nil {
				return "", http.StatusInternalServerError, err
			}
			return qID, http.StatusOK, err
		} else {
			return "", http.StatusUnauthorized, errors.New("Unauthorized")
		}
	} else {
		return "", http.StatusForbidden, errors.New("Forbidden")
	}
}

// q/{userid}/{formid}/{questionid}
// Handles updating the question on the survey.
func QuestionPutHandler(token string, userid string, formid string, reqBody string, qID string) (int, error) {
	var u model.User
	u.Token = token
	err := u.ParseJWT()
	if err != nil {
		return http.StatusUnauthorized, err
	}

	s := service.New()
	err = s.Start()
	if err != nil {
		return http.StatusInternalServerError, err
	}

	owner := false

	user, err := s.DB.GetUser(userid)
	if err != nil {
		return http.StatusInternalServerError, err
	}

	us, err := s.DB.GetUserByEmail(u.Email)
	if err != nil {
		return http.StatusInternalServerError, err
	}
	if us.ID == user.ID {
		for _, v := range user.Forms {
			if v == formid {
				owner = true
				break
			}
		}
		if owner {
			q, err := s.DB.GetQuestion(qID)
			if err != nil {
				return http.StatusInternalServerError, err
			}

			r := strings.NewReader(reqBody)
			err = json.NewDecoder(r).Decode(&q)
			if err != nil {
				return http.StatusInternalServerError, err
			}
			if err != nil {
				return http.StatusInternalServerError, err
			}
			err = s.DB.SaveQuestion(q)
			if err != nil {
				return http.StatusInternalServerError, err
			}
			return http.StatusOK, nil

		} else {
			return http.StatusUnauthorized, errors.New("Unauthorized")
		}
	} else {
		return http.StatusForbidden, errors.New("Forbidden")
	}
}

// q/{userid}/{formid}/{questionid}
// Handles deleting the question on the survey.
func QuestionDeleteHandler(token string, userid string, formid string, qID string) (int, error) {
	var u model.User
	u.Token = token
	err := u.ParseJWT()
	if err != nil {
		return http.StatusUnauthorized, err
	}

	s := service.New()
	err = s.Start()
	if err != nil {
		return http.StatusInternalServerError, err
	}

	owner := false

	user, err := s.DB.GetUser(userid)
	if err != nil {
		return http.StatusInternalServerError, err
	}

	us, err := s.DB.GetUserByEmail(u.Email)
	if err != nil {
		return http.StatusInternalServerError, err
	}
	if us.ID == user.ID {
		for _, v := range user.Forms {
			if v == formid {
				owner = true
				break
			}
		}
		if owner {
			quesID, err := primitive.ObjectIDFromHex(qID)
			if err != nil {
				return http.StatusInternalServerError, err
			}
			f, err := s.DB.GetForm(formid)
			if err != nil {
				return http.StatusInternalServerError, err
			}
			succes := false
			for i := 0; i < len(f.Questions); i++ {
				if f.Questions[i] == qID {
					err = s.DB.DeleteQuestion(quesID)
					if err != nil {
						return http.StatusInternalServerError, err
					}
					// Remove the element at index i from a.
					copy(f.Questions[i:], f.Questions[i+1:])       // Shift a[i+1:] left one index.
					f.Questions[len(f.Questions)-1] = ""           // Erase last element (write zero value).
					f.Questions = f.Questions[:len(f.Questions)-1] // Truncate slice.
					err = s.DB.SaveForm(f)
					if err != nil {
						return http.StatusInternalServerError, err
					}
					for k := i; k < len(f.Questions); k++ {
						qq, err := s.DB.GetQuestion(f.Questions[k])
						if err != nil {
							return http.StatusInternalServerError, err
						}
						qq.No -= 1
						err = s.DB.SaveQuestion(qq)
						if err != nil {
							return http.StatusInternalServerError, err
						}
					}

					succes = true
					return http.StatusOK, nil
				} else {
					return http.StatusInternalServerError, err
				}
			}
			if !succes {
				return http.StatusInternalServerError, err
			} else {
				return http.StatusInternalServerError, err
			}
		} else {
			return http.StatusUnauthorized, errors.New("Unauthorized")
		}
	} else {
		return http.StatusForbidden, errors.New("Forbidden")
	}
}

// o/{userid}/{formid}/{questionid}
// Handles creating the option on the question on the survey.
func OptionPostHandler(token string, userid string, formid string, qID string) (int, error) {
	var u model.User
	u.Token = token
	err := u.ParseJWT()
	if err != nil {
		return http.StatusUnauthorized, err
	}

	s := service.New()
	err = s.Start()
	if err != nil {
		return http.StatusInternalServerError, err
	}

	owner := false

	user, err := s.DB.GetUser(userid)
	if err != nil {
		return http.StatusInternalServerError, err
	}

	us, err := s.DB.GetUserByEmail(u.Email)
	if err != nil {
		return http.StatusInternalServerError, err
	}
	if us.ID == user.ID {
		for _, v := range user.Forms {
			if v == formid {
				owner = true
				break
			}
		}
		if owner {
			q, err := s.DB.GetQuestion(qID)
			if err != nil {
				return http.StatusInternalServerError, err
			}
			if q.Type == 1 {
				newOpt := model.Option{
					Number: len(q.Options) + 1,
					Opt:    "Seçenek",
					IsTrue: false,
				}
				q.Options = append(q.Options, newOpt)
				err = s.DB.SaveQuestion(q)
				if err != nil {
					return http.StatusInternalServerError, err
				}
				return http.StatusOK, nil
			} else if q.Type == 3 {
				newOpt := model.Option{
					Number: len(q.Options) + 1,
					Opt:    "İşaretleyiniz",
					IsTrue: false,
				}
				q.Options = append(q.Options, newOpt)
				err = s.DB.SaveQuestion(q)
				if err != nil {
					return http.StatusInternalServerError, err
				}
				return http.StatusOK, nil
			} else {
				return http.StatusInternalServerError, err

			}

		} else {
			return http.StatusUnauthorized, errors.New("Unauthorized")
		}
	} else {
		return http.StatusForbidden, errors.New("Forbidden")
	}
}

// o/{userid}/{formid}/{questionid}/{optionid}
// Handles updating the option on the question on the survey.
func OptionPutHandler(token string, userid string, formid string, reqBody string, qID string, oID string) (int, error) {
	var u model.User
	u.Token = token
	err := u.ParseJWT()
	if err != nil {
		return http.StatusUnauthorized, err
	}

	s := service.New()
	err = s.Start()
	if err != nil {
		return http.StatusInternalServerError, err
	}

	owner := false

	user, err := s.DB.GetUser(userid)
	if err != nil {
		return http.StatusInternalServerError, err
	}
	us, err := s.DB.GetUserByEmail(u.Email)
	if err != nil {
		return http.StatusInternalServerError, err
	}
	if us.ID == user.ID {
		for _, v := range user.Forms {
			if v == formid {
				owner = true
				break
			}
		}
		if owner {
			oID_int, err := strconv.Atoi(oID)
			if err != nil {
				return http.StatusInternalServerError, err
			}
			q, err := s.DB.GetQuestion(qID)
			if err != nil {
				return http.StatusInternalServerError, err
			}

			r := strings.NewReader(reqBody)
			err = json.NewDecoder(r).Decode(&q.Options[oID_int-1])
			if err != nil {
				return http.StatusInternalServerError, err
			}

			err = s.DB.SaveQuestion(q)
			if err != nil {
				return http.StatusInternalServerError, err
			}
			return http.StatusOK, nil
		} else {
			return http.StatusUnauthorized, errors.New("Unauthorized")
		}
	} else {
		return http.StatusForbidden, errors.New("Forbidden")
	}
}

// o/{userid}/{formid}/{questionid}/{optionid}
// Handles deleting the option on the question on the survey.
func OptionDeleteHandler(token string, userid string, formid string, qID string, oID string) (int, error) {
	var u model.User
	u.Token = token
	err := u.ParseJWT()
	if err != nil {
		return http.StatusUnauthorized, err
	}

	s := service.New()
	err = s.Start()
	if err != nil {
		return http.StatusInternalServerError, err
	}

	owner := false

	user, err := s.DB.GetUser(userid)
	if err != nil {
		return http.StatusInternalServerError, err
	}

	us, err := s.DB.GetUserByEmail(u.Email)
	if err != nil {
		return http.StatusInternalServerError, err
	}
	if us.ID == user.ID {
		for _, v := range user.Forms {
			if v == formid {
				owner = true
				break
			}
		}
		if owner {
			oID_int, err := strconv.Atoi(oID)
			if err != nil {
				return http.StatusInternalServerError, err
			}
			q, err := s.DB.GetQuestion(qID)
			if err != nil {
				return http.StatusInternalServerError, err
			}
			deleteIndex := oID_int - 1
			// Remove the element at index i from a.
			copy(q.Options[deleteIndex:], q.Options[deleteIndex+1:]) // Shift a[i+1:] left one index.
			q.Options[len(q.Options)-1] = model.Option{}             // Erase last element (write zero value).
			q.Options = q.Options[:len(q.Options)-1]                 // Truncate slice.
			for i := deleteIndex; i < len(q.Options); i++ {
				q.Options[i].Number -= 1
			}
			err = s.DB.SaveQuestion(q)
			if err != nil {
				return http.StatusInternalServerError, err
			}
			return http.StatusOK, nil

		} else {
			return http.StatusUnauthorized, errors.New("Unauthorized")
		}
	} else {
		return http.StatusForbidden, errors.New("Forbidden")
	}
}

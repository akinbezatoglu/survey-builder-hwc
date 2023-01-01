package handler

import (
	"net/http"

	"huaweicloud.com/akinbe/survey-builder-app/internal/model"
	"huaweicloud.com/akinbe/survey-builder-app/internal/service"
)

// api/v1/f/{userid}	GET
// Gets all forms that belong to the user.
func GetAllFormsHandler(token string, userid string) ([]model.Form, int, error) {
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

	user, err := s.DB.GetUser(userid)
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}
	var f []model.Form
	form_num := len(user.Forms)
	if form_num == 0 {
		return nil, http.StatusOK, nil
	}
	for i := 0; i < form_num; i++ {
		form, err := s.DB.GetForm(user.Forms[i])
		if err != nil {
			return nil, http.StatusInternalServerError, err
		}
		f = append(f, *form)
	}
	return f, http.StatusOK, nil
}

// api/v1/f/{userid}	POST
// Creates a form that belongs to the user.
func CreateFormHandler(token string, userid string) (string, int, error) {
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
	user, err := s.DB.GetUser(userid)
	if err != nil {
		return "", http.StatusInternalServerError, err
	}
	var f model.Form
	f.Name = "Adsız Başlık"
	f.Desc = "Adsız açıklama"
	f.IsVisible = true

	var q model.Question
	q.Ques = "Soru"
	q.Type = 1 // 1: çoktan seçmeli // 2:Paragraf // 3: kutu işaretlemeli
	q.No = 1
	q.IsRequired = false

	var o model.Option
	o.Opt = "Seçenek"
	o.IsTrue = false
	o.Number = 1

	q.Options = append(q.Options, o)

	ques_id, err := s.DB.CreateQuestion(&q)
	if err != nil {
		return "", http.StatusInternalServerError, err
	}
	f.Questions = append(f.Questions, ques_id)
	formID, err := s.DB.CreateForm(&f)
	if err != nil {
		return "", http.StatusInternalServerError, err
	}
	user.Forms = append(user.Forms, formID)
	err = s.DB.SaveUser(user)
	if err != nil {
		return "", http.StatusInternalServerError, err
	}
	return formID, http.StatusOK, nil
}

// api/v1/f/{userid}/less	GET
func GetAllFormsWithLessValueHandler(token string, userid string) ([]model.FormSmall, int, error) {
	var u *model.User
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

	user, err := s.DB.GetUser(userid)
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}
	var f []model.FormSmall
	form_num := len(user.Forms)
	for i := 0; i < form_num; i++ {
		form, err := s.DB.GetForm(user.Forms[i])
		if err != nil {
			return nil, http.StatusInternalServerError, err
		}
		f_sm := &model.FormSmall{
			ID:   form.ID.Hex(),
			Name: form.Name,
		}
		f = append(f, *f_sm)
	}
	return f, http.StatusOK, nil
}

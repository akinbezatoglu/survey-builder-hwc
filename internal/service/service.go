package service

import "huaweicloud.com/akinbe/survey-builder-app/internal/database"

type Service struct {
	DB database.DB
}

func New() *Service {
	mongo_conf := database.Config{
		ConnectionURI: "",
		DatabaseName:  "SurveyDB",
	}
	return &Service{
		DB: database.DB{
			Config: &mongo_conf,
		},
	}
}

func (s *Service) Start() error {
	// Establish database connection
	err := s.DB.NewConnection()
	if err != nil {
		return err
	}
	return nil
}

func (s *Service) Shutdown() error {
	err := s.DB.CloseConnection()
	if err != nil {
		return err
	}
	return nil
}

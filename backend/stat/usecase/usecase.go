package usecase

import (
	"nik19ta/backend/models"
	"nik19ta/backend/stat"
)

type statUseCase struct {
	userRepo stat.UserRepository
}

func NewStatUseCase(userRepo stat.UserRepository) *statUseCase {
	return &statUseCase{userRepo: userRepo}
}

func (a *statUseCase) GetVisits() (*models.VisitStatsWithTotal, error) {
	visits, err := a.userRepo.GetVisits()
	if err != nil {
		return nil, stat.DataBaseError
	}

	return visits, nil
}

func (a *statUseCase) GetUniqueVisits() (*models.UniqueVisitStatsWithTotal, error) {
	visits, err := a.userRepo.GetUniqueVisits()
	if err != nil {
		return nil, stat.DataBaseError
	}

	return visits, nil
}

func (a *statUseCase) GetCliksStat() (*[]models.ClicksStat, error) {
	clicks, err := a.userRepo.GetCliksStat()
	if err != nil {
		return nil, stat.DataBaseError
	}

	return clicks, nil
}

func (a *statUseCase) GetProjectStat() (map[string][]models.ProjectsStats, error) {
	statProjects, err := a.userRepo.GetProjectVisits()
	if err != nil {
		return nil, stat.DataBaseError
	}

	return statProjects, nil
}

func (a *statUseCase) AddVisit(ip string) error {
	addVisitsErr := a.userRepo.AddVisit()

	if addVisitsErr != nil {
		return addVisitsErr
	}

	addCountryErr := a.userRepo.SetCountry(ip)

	if addCountryErr != nil {
		return addCountryErr
	}

	return nil
}

func (a *statUseCase) AddUniqueVisit(ip string) error {
	addVisitsErr := a.userRepo.AddUniqueVisit()

	if addVisitsErr != nil {
		return addVisitsErr
	}

	addCountryErr := a.userRepo.SetCountry(ip)

	if addCountryErr != nil {
		return addCountryErr
	}

	return nil
}

func (a *statUseCase) AddClikc(buttonId string) error {
	return a.userRepo.AddClikc(buttonId)
}

func (a *statUseCase) AddProjectVisit(projectId string) error {
	return a.userRepo.AddProjectVisit(projectId)
}

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

func (a *statUseCase) AddVisit() error {
	return a.userRepo.AddVisit()
}

func (a *statUseCase) AddUniqueVisit() error {
	return a.userRepo.AddUniqueVisit()
}

func (a *statUseCase) AddClikc(buttonId string) error {
	return a.userRepo.AddClikc(buttonId)
}

func (a *statUseCase) AddProjectVisit(projectId string) error {
	return a.userRepo.AddProjectVisit(projectId)
}

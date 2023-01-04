package usecase

import (
	"nik19ta/backend/models"
	"nik19ta/backend/projects"
	Projects "nik19ta/backend/projects"
)

type ProjectsUseCase struct {
	userRepo Projects.UserRepository
}

func NewProjectsUseCase(userRepo Projects.UserRepository) *ProjectsUseCase {
	return &ProjectsUseCase{userRepo: userRepo}
}

func (a *ProjectsUseCase) GetProjects(lang string) ([]models.ProjectsResponse, error) {
	data, err := a.userRepo.GetProjects(lang)

	return data, err
}

func (a *ProjectsUseCase) GetProject(lang string, id string) (*models.ProjectResponse, error) {
	data, err := a.userRepo.GetProject(lang, id)

	if data.ID == "" {
		return nil, projects.CouldNotFindProject
	}

	return data, err
}

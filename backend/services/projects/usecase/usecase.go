package usecase

import (
	projects "nik19ta/backend/services/projects"
)

type ProjectsUseCase struct {
	userRepo projects.UserRepository
}

func NewProjectsUseCase(userRepo projects.UserRepository) *ProjectsUseCase {
	return &ProjectsUseCase{userRepo: userRepo}
}

func (a *ProjectsUseCase) GetProjects(lang string) ([]projects.ProjectsResponse, error) {
	data, err := a.userRepo.GetProjects(lang)

	return data, err
}

func (a *ProjectsUseCase) GetProject(lang string, id string) (*projects.ProjectResponse, error) {
	data, err := a.userRepo.GetProject(lang, id)

	if data.ID == "" {
		return nil, projects.CouldNotFindProject
	}

	return data, err
}

package usecase

import (
	"log"
	"nik19ta/backend/models"
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

	if err != nil {
		return nil, err
	}

	return data, nil
}
func (a *ProjectsUseCase) GetProject(lang string, id string) ([]models.ProjectsResponse, error) {
	data, err := a.userRepo.GetProject(lang, id)
	cards, err := a.userRepo.GetCards(id)

	log.Println(data, cards, err)

	return nil, nil
}

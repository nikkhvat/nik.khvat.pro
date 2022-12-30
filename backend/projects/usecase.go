package projects

import "nik19ta/backend/models"

type UseCase interface {
	GetProjects(lang string) ([]models.ProjectsResponse, error)
	GetProject(lang string, id string) ([]models.ProjectsResponse, error)
}

package projects

import "nik19ta/backend/models"

type UserRepository interface {
	GetProjects(lang string) ([]models.ProjectsResponse, error)

	GetProject(lang string, id string) ([]models.ProjectsResponse, error)
	GetCards(uuid string) ([]models.ProjectsResponse, error)
	GetFeatures(uuid string) ([]models.ProjectsResponse, error)
	GetPhotos(uuid string) ([]models.ProjectsResponse, error)
}

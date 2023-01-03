package projects

import "nik19ta/backend/models"

type UserRepository interface {
	GetProjects(lang string) ([]models.ProjectsResponse, error)
	GetProject(lang string, uuid string) (*models.ProjectResponse, error)
}

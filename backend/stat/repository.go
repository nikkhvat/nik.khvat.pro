package stat

import "nik19ta/backend/models"

type UserRepository interface {
	GetCliksStat() (*[]models.ClicksStat, error)
	GetProjectVisits() (map[string][]models.ProjectsStats, error)

	AddVisit(data models.Visits) error
	VisitExtend(session string) error
	GetVisits() ([]models.Visits, error)

	AddClikc(buttonId string) error
	AddProjectVisit(projectId string) error
}

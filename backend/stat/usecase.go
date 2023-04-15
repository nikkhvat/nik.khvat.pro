package stat

import "nik19ta/backend/models"

type UseCase interface {
	GetVisits() (*int, error)
	GetUniqueVisits() (*int, error)
	GetCliksStat() (*[]models.ClicksStat, error)
	GetProjectStat() (*[]models.ProjectsStats, error)

	AddVisit() error
	AddUniqueVisit() error
	AddClikc(buttonId string) error
	AddProjectVisit(projectId string) error
}

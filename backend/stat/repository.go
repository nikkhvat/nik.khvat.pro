package stat

import "nik19ta/backend/models"

type UserRepository interface {
	GetVisits() (*models.VisitStatsWithTotal, error)
	GetUniqueVisits() (*models.UniqueVisitStatsWithTotal, error)
	GetCliksStat() (*[]models.ClicksStat, error)
	// GetProjectStat() (*[]models.ProjectsStats, error)
	GetProjectVisits() (map[string][]models.ProjectsStats, error)

	AddVisit() error
	AddUniqueVisit() error
	AddClikc(buttonId string) error
	AddProjectVisit(projectId string) error
}

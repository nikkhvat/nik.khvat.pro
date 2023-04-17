package stat

import "nik19ta/backend/models"

type UserRepository interface {
	GetVisits() (*models.VisitStatsWithTotal, error)
	GetUniqueVisits() (*models.UniqueVisitStatsWithTotal, error)
	GetCliksStat() (*[]models.ClicksStat, error)
	GetProjectVisits() (map[string][]models.ProjectsStats, error)

	SetCountry(ip string) error
	AddVisit() error
	AddUniqueVisit() error
	AddClikc(buttonId string) error
	AddProjectVisit(projectId string) error
}

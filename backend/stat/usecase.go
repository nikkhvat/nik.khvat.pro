package stat

import (
	"github.com/google/uuid"
	"nik19ta/backend/models"
)

type UseCase interface {
	GetCliksStat() (*[]models.ClicksStat, error)
	GetProjectStat() (map[string][]models.ProjectsStats, error)
	//GetCountries() ([]models.CountriesResponse, error)

	AddVisit(ip, userAgent, utm string, unique bool) (uuid.UUID, error)
	VisitExtend(session string) error
	GetVisits() (models.SiteStats, error)

	AddClikc(buttonId string) error
	AddProjectVisit(projectId string) error
}

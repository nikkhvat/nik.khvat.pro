package stat

import (
	"github.com/google/uuid"
	"nik19ta/backend/services/links"
)

type UseCase interface {
	GetProjectStat() (map[string][]ProjectsStats, error)

	AddVisit(ip, userAgent, utm, httpReferer string, unique bool) (uuid.UUID, error)
	VisitExtend(session string) error
	GetVisits() (SiteStats, error)

	AddProjectVisit(projectId string) error
	GetLinks() ([]links.Link, error)
}

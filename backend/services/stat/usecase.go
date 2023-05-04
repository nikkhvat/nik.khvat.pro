package stat

import (
	"github.com/google/uuid"
)

type UseCase interface {
	GetClicksStat() (*[]ClicksStat, error)
	GetProjectStat() (map[string][]ProjectsStats, error)

	AddVisit(ip, userAgent, utm string, unique bool) (uuid.UUID, error)
	VisitExtend(session string) error
	GetVisits() (SiteStats, error)

	AddProjectVisit(projectId string) error
}

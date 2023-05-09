package stat

import (
	"nik19ta/backend/services/links"
)

type UseCase interface {
	AddVisit(ip, userAgent, utm, httpReferer, url, title, session string, unique bool) (string, error)
	VisitExtend(session string) error
	GetVisits() (SiteStats, error)

	GetLinks() ([]links.Link, error)
}

package stat

import "nik19ta/backend/services/links"

type UserRepository interface {
	GetProjectVisits() (map[string][]ProjectsStats, error)

	AddVisit(data Visits) error
	VisitExtend(session string) error
	GetVisits() ([]Visits, error)

	AddProjectVisit(projectId string) error
	GetLinks() ([]links.Link, error)
}

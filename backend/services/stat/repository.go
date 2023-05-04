package stat

type UserRepository interface {
	GetCliksStat() (*[]ClicksStat, error)
	GetProjectVisits() (map[string][]ProjectsStats, error)

	AddVisit(data Visits) error
	VisitExtend(session string) error
	GetVisits() ([]Visits, error)

	AddProjectVisit(projectId string) error
}

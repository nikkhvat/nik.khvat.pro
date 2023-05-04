package projects

type UseCase interface {
	GetProjects(lang string) ([]ProjectsResponse, error)
	GetProject(lang string, id string) (*ProjectResponse, error)
}

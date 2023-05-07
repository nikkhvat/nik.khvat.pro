package projects

type UserRepository interface {
	GetProjects(lang string) ([]ProjectsResponse, error)
	GetProject(lang string, uuid string) (*ProjectResponse, error)

	GetCategories() ([]Category, error)
}

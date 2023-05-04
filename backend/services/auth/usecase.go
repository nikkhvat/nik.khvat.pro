package auth

type UseCase interface {
	SignIn(username, password string) (*string, error)
}

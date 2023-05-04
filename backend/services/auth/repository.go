package auth

type UserRepository interface {
	GetUserToken(mail, password string) (*string, error)
}

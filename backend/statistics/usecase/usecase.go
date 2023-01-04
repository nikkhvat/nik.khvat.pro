package usecase

import (
	"nik19ta/backend/auth"
)

type AuthUseCase struct {
	userRepo auth.UserRepository
}

func NewAuthUseCase(userRepo auth.UserRepository) *AuthUseCase {
	return &AuthUseCase{userRepo: userRepo}
}

func (a *AuthUseCase) SignIn(username, password string) (*string, error) {
	token, err := a.userRepo.GetUserToken(username, password)
	if err != nil {
		return nil, auth.ErrUserNotFound
	}

	return token, nil
}

package usecase

import (
	auth2 "nik19ta/backend/services/auth"
)

type AuthUseCase struct {
	userRepo auth2.UserRepository
}

func NewAuthUseCase(userRepo auth2.UserRepository) *AuthUseCase {
	return &AuthUseCase{userRepo: userRepo}
}

func (a *AuthUseCase) SignIn(username, password string) (*string, error) {
	token, err := a.userRepo.GetUserToken(username, password)
	if err != nil {
		return nil, auth2.ErrUserNotFound
	}

	return token, nil
}

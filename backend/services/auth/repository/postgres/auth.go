package postgres

import (
	"nik19ta/backend/services/auth"
	"nik19ta/backend/utils/token"

	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r UserRepository) GetUserToken(mail, password string) (*string, error) {
	user := auth.User{}
	result := r.db.Where(&auth.User{Mail: mail, Password: password}).First(&user)

	if result.Error != nil {
		return nil, result.Error
	}

	userToken, err := token.GenerateToken(user.UUID)

	if err != nil {
		return nil, err
	}

	return &userToken, nil
}

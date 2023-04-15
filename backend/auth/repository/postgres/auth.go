package postgres

import (
	"nik19ta/backend/models"
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
	user := models.User{}
	result := r.db.Where(&models.User{Mail: mail, Password: password}).First(&user)

	if result.Error != nil {
		return nil, result.Error
	}

	token, err := token.GenerateToken(user.UUID)

	if err != nil {
		return nil, err
	}

	return &token, nil
}

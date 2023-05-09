package postgres

import (
	"nik19ta/backend/services/links"
	"time"

	stat "nik19ta/backend/services/stat"

	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r UserRepository) GetVisits() ([]stat.Visits, error) {
	// Создаем временную границу для последних 30 дней
	timeBoundary := time.Now().AddDate(0, 0, -30)

	var visits []stat.Visits
	r.db.Where("time_entry > ?", timeBoundary).Find(&visits)

	return visits, nil
}

type Project struct {
	UUID string `json:"uuid"`
}

func (r UserRepository) AddVisit(data stat.Visits) error {
	result := r.db.Create(&data)

	return result.Error
}

func (r UserRepository) VisitExtend(session string) error {
	// result := r.db.Model(&stat.Visits{}).Where("session = ?", session).Update("time_leaving", time.Now())
	var lastVisit stat.Visits

	// Найти последнюю запись с указанной сессией
	err := r.db.Model(&stat.Visits{}).Where("session = ?", session).Order("time_entry desc").First(&lastVisit).Error
	if err != nil {
		// Обработать ошибку
	}

	// Обновить поле time_leaving для найденной записи, используя ID в условии WHERE
	result := r.db.Model(&stat.Visits{}).Where("uid = ?", lastVisit.UId).Update("time_leaving", time.Now())

	return result.Error
}

func (r UserRepository) GetLinks() ([]links.Link, error) {
	var linksArray []links.Link
	now := time.Now()
	monthAgo := now.AddDate(0, -1, 0)

	result := r.db.Where("date >= ? AND date <= ?", monthAgo, now).Find(&linksArray)

	if result.Error != nil {
		return nil, result.Error
	}

	return linksArray, nil
}

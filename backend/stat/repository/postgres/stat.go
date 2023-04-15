package postgres

import (
	"nik19ta/backend/models"

	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r UserRepository) GetVisits() (*int, error) {
	visits := models.VisitStats{}

	result := r.db.First(&visits)

	if result.Error != nil {
		return nil, result.Error
	}

	return &visits.Count, nil
}

func (r UserRepository) GetUniqueVisits() (*int, error) {
	visits := models.UniqueVisitStats{}

	result := r.db.First(&visits)

	if result.Error != nil {
		return nil, result.Error
	}

	return &visits.Count, nil
}

func (r UserRepository) GetCliksStat() (*[]models.ClicksStat, error) {
	clicks := []models.ClicksStat{}

	result := r.db.Find(&clicks)

	if result.Error != nil {
		return nil, result.Error
	}

	return &clicks, nil
}

func (r UserRepository) GetProjectStat() (*[]models.ProjectsStats, error) {
	projectsStats := []models.ProjectsStats{}

	result := r.db.Find(&projectsStats)

	if result.Error != nil {
		return nil, result.Error
	}

	return &projectsStats, nil
}

func (r UserRepository) AddVisit() error {
	visits := models.VisitStats{}
	resultUpdate := r.db.Model(&visits).Where("id = 0").Update("count", gorm.Expr("count + ?", 1))

	if resultUpdate.Error != nil {
		return resultUpdate.Error
	}

	return nil
}

func (r UserRepository) AddUniqueVisit() error {
	visits := models.UniqueVisitStats{}

	resultUpdate := r.db.Model(&visits).Where("id = 0").Update("count", gorm.Expr("count + ?", 1))

	if resultUpdate.Error != nil {
		return resultUpdate.Error
	}

	return nil
}

func (r UserRepository) AddClikc(buttonId string) error {
	project := models.ClicksStat{}

	resultUpdate := r.db.Model(&project).Where("id = ?", buttonId).Update("count", gorm.Expr("count + ?", 1))

	if resultUpdate.Error != nil {
		return resultUpdate.Error
	}

	return nil
}

func (r UserRepository) AddProjectVisit(projectId string) error {
	project := models.ProjectsStats{}

	resultUpdate := r.db.Model(&project).Where("uuid = ?", projectId).Update("count", gorm.Expr("count + ?", 1))

	if resultUpdate.Error != nil {
		return resultUpdate.Error
	}

	return nil
}

package postgres

import (
	"nik19ta/backend/services/links"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type LinkRepository struct {
	db *gorm.DB
}

func NewLinksRepository(db *gorm.DB) *LinkRepository {
	return &LinkRepository{db: db}
}

func (r LinkRepository) SaveStat(link, page string) error {
	data := links.Link{
		Page: page,
		Link: link,
		UID:  uuid.New(),
		Date: time.Now(),
	}

	res := r.db.Create(&data)

	return res.Error
}

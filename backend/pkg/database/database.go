package database

import (
	"fmt"
	"log"

	"nik19ta/backend/models"
	"nik19ta/backend/pkg/config"

	postgres "gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func InitDB() *gorm.DB {
	conf := config.GetConfig()

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s",
		conf.PostgresHost,
		conf.PostgresUser,
		conf.PostgresPassword,
		conf.PostgresDbname,
		conf.PostgresPort,
		conf.PostgresSslmode,
		conf.PostgresTimezone)

	db, err := gorm.Open(postgres.New(postgres.Config{DSN: dsn}), &gorm.Config{})

	if err != nil {
		log.Panicln(err)
	}

	autoMigrateDB(db)

	return db
}

func autoMigrateDB(db *gorm.DB) {
	// Users
	db.AutoMigrate(&models.User{})

	// Projects
	db.AutoMigrate(&models.Project{})
	db.AutoMigrate(&models.Subtitles{})
	db.AutoMigrate(&models.Descriptions{})
	db.AutoMigrate(&models.Cards{})
	db.AutoMigrate(&models.Features{})
	db.AutoMigrate(&models.Photos{})

	// Stats
	db.AutoMigrate(&models.ProjectsStats{})
	db.AutoMigrate(&models.VisitStats{})
	db.AutoMigrate(&models.ClicksStat{})
	db.AutoMigrate(&models.UniqueVisitStats{})
	db.AutoMigrate(&models.CountryStats{})
}

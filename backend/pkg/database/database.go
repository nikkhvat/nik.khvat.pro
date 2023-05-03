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
	_ = db.AutoMigrate(&models.User{})
	// Projects
	_ = db.AutoMigrate(&models.Project{})
	_ = db.AutoMigrate(&models.Subtitles{})
	_ = db.AutoMigrate(&models.Descriptions{})
	_ = db.AutoMigrate(&models.Cards{})
	_ = db.AutoMigrate(&models.Features{})
	_ = db.AutoMigrate(&models.Photos{})

	// Stats
	_ = db.AutoMigrate(&models.ProjectsStats{})
	_ = db.AutoMigrate(&models.ClicksStat{})
	_ = db.AutoMigrate(&models.Visits{})
}

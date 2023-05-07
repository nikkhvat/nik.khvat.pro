package database

import (
	"fmt"
	"log"
	"nik19ta/backend/pkg/config"
	"nik19ta/backend/services/auth"
	"nik19ta/backend/services/links"
	stat "nik19ta/backend/services/stat"

	projects "nik19ta/backend/services/projects"

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
		conf.PostgresSSLMode,
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
	_ = db.AutoMigrate(&auth.User{})
	// Projects
	_ = db.AutoMigrate(&projects.Project{})
	_ = db.AutoMigrate(&projects.Subtitles{})
	_ = db.AutoMigrate(&projects.Descriptions{})
	_ = db.AutoMigrate(&projects.Cards{})
	_ = db.AutoMigrate(&projects.Features{})
	_ = db.AutoMigrate(&projects.Photos{})
	_ = db.AutoMigrate(&projects.Category{})

	// Stats
	_ = db.AutoMigrate(&stat.ProjectsStats{})
	_ = db.AutoMigrate(&stat.ClicksStat{})
	_ = db.AutoMigrate(&stat.Visits{})

	// Links
	_ = db.AutoMigrate(&links.Link{})
}

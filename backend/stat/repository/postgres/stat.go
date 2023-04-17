package postgres

import (
	"errors"
	"log"
	"nik19ta/backend/models"
	"time"

	"github.com/ip2location/ip2location-go"
	"gorm.io/gorm"

	config "nik19ta/backend/pkg/config"

	date "nik19ta/backend/utils/date"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r UserRepository) GetVisits() (*models.VisitStatsWithTotal, error) {

	// 1. Получить дату, которая была 30 дней назад от текущей даты
	now := time.Now()
	startDate := now.AddDate(0, 0, -30).Format("2006/01/02")

	// 2. Использовать эту дату в SQL-запросе для получения данных о посещениях
	var visits []models.VisitStats
	err := r.db.Where("date >= ?", startDate).Find(&visits).Error
	if err != nil {
		return nil, err
	}

	// 3. Заполнить пропущенные даты с нулевым количеством посещений
	visitMap := make(map[string]int)
	for _, visit := range visits {
		visitMap[visit.Date] = visit.Count
	}

	result := make([]models.VisitStats, 0, 30)
	for i := 0; i < 30; i++ {
		date := now.AddDate(0, 0, -i).Format("2006/01/02")
		count, ok := visitMap[date]
		if !ok {
			count = 0
		}
		result = append([]models.VisitStats{{Date: date, Count: count}}, result...)
	}

	total := 0

	for _, item := range result {
		total += item.Count
	}

	data := models.VisitStatsWithTotal{
		Total:  total,
		ByDays: result,
	}

	return &data, nil
}

func (r UserRepository) GetUniqueVisits() (*models.UniqueVisitStatsWithTotal, error) {

	// 1. Получить дату, которая была 30 дней назад от текущей даты
	now := time.Now()
	startDate := now.AddDate(0, 0, -30).Format("2006/01/02")

	// 2. Использовать эту дату в SQL-запросе для получения данных о посещениях
	var visits []models.UniqueVisitStats
	err := r.db.Where("date >= ?", startDate).Find(&visits).Error
	if err != nil {
		return nil, err
	}

	// 3. Заполнить пропущенные даты с нулевым количеством посещений
	visitMap := make(map[string]int)
	for _, visit := range visits {
		visitMap[visit.Date] = visit.Count
	}

	result := make([]models.UniqueVisitStats, 0, 30)
	for i := 0; i < 30; i++ {
		date := now.AddDate(0, 0, -i).Format("2006/01/02")
		count, ok := visitMap[date]
		if !ok {
			count = 0
		}
		result = append([]models.UniqueVisitStats{{Date: date, Count: count}}, result...)
	}

	total := 0

	for _, item := range result {
		total += item.Count
	}

	data := models.UniqueVisitStatsWithTotal{
		Total:  total,
		ByDays: result,
	}

	return &data, nil
}

func (r UserRepository) GetCliksStat() (*[]models.ClicksStat, error) {
	clicks := []models.ClicksStat{}

	result := r.db.Find(&clicks)

	if result.Error != nil {
		return nil, result.Error
	}

	return &clicks, nil
}

type Project struct {
	UUID string `json:"uuid"`
}

func (r UserRepository) SetCountry(ip string) error {

	if ip == "" {
		return errors.New("Missing IP parameter")
	}

	db, err := ip2location.OpenDB(config.GetConfig().IpDataBasePath)

	if err != nil {
		return errors.New("Error opening IP2Location database")
	}
	defer db.Close()

	results, err := db.Get_country_short(ip)

	if err != nil {
		return err
	}

	if results.Country_short == "-" {
		return errors.New("IP not found")
	}

	log.Println(ip)

	return nil
}

func (r UserRepository) GetProjectVisits() (map[string][]models.ProjectsStats, error) {
	// 1. Получить список всех проектов с их UUID
	var projects []Project
	err := r.db.Select("uuid").Find(&projects).Error
	if err != nil {
		return nil, err
	}

	// Получить дату, которая была 30 дней назад от текущей даты
	now := time.Now()
	startDate := now.AddDate(0, 0, -30).Format("2006/01/02")

	projectVisits := make(map[string][]models.ProjectsStats)

	for _, project := range projects {
		// 2. Использовать UUID каждого проекта для выполнения запроса и получения информации о посещениях проекта за последние 30 дней
		var projectStats []models.ProjectsStats
		err := r.db.Where("uuid = ? AND date >= ?", project.UUID, startDate).Find(&projectStats).Error
		if err != nil {
			return nil, err
		}

		// 3. Заполнить пропущенные даты с нулевым количеством посещений для каждого проекта
		projectStatsMap := make(map[string]int)
		for _, stat := range projectStats {
			projectStatsMap[stat.Date] = stat.Count
		}

		result := make([]models.ProjectsStats, 0, 30)
		for i := 0; i < 30; i++ {
			date := now.AddDate(0, 0, -i).Format("2006/01/02")
			count, ok := projectStatsMap[date]
			if !ok {
				count = 0
			}
			result = append([]models.ProjectsStats{{UUID: project.UUID, Date: date, Count: count}}, result...)
		}

		projectVisits[project.UUID] = result
	}

	return projectVisits, nil
}

// func (r UserRepository) GetProjectStat() (*[]models.ProjectsStats, error) {
// 	// projectsStats := []models.ProjectsStats{}

// 	// result := r.db.Find(&projectsStats)

// 	// if result.Error != nil {
// 	// 	return nil, result.Error
// 	// }

// 	return &projectsStats, nil
// }

func (r UserRepository) AddVisit() error {
	date := date.GetDate()

	sqlQuery := `
		INSERT INTO visit_stats (date, count)
		VALUES (?, 1)
		ON CONFLICT (date) DO UPDATE SET count = visit_stats.count + 1
	`

	err := r.db.Exec(sqlQuery, date).Error
	if err != nil {
		return err
	}
	return nil
}

func (r UserRepository) AddUniqueVisit() error {
	date := date.GetDate()

	sqlQuery := `
		INSERT INTO unique_visit_stats (date, count)
		VALUES (?, 1)
		ON CONFLICT (date) DO UPDATE SET count = unique_visit_stats.count + 1
	`

	err := r.db.Exec(sqlQuery, date).Error
	if err != nil {
		return err
	}
	return nil
}

func (r UserRepository) AddClikc(buttonId string) error {
	date := date.GetDate()

	sqlQuery := `
		INSERT INTO clicks_stats (uuid, date, count)
		VALUES (?, ?, 1)
		ON CONFLICT (uuid, date) DO UPDATE SET
			count = clicks_stats.count + 1
		WHERE clicks_stats.uuid = ?`

	err := r.db.Exec(sqlQuery, buttonId, date, buttonId).Error
	if err != nil {
		return err
	}
	return nil
}

func (r UserRepository) AddProjectVisit(projectId string) error {
	date := date.GetDate()

	sqlQuery := `
		INSERT INTO projects_stats (uuid, date, count)
		VALUES (?, ?, 1)
		ON CONFLICT (uuid, date) DO UPDATE SET
			count = projects_stats.count + 1
		WHERE projects_stats.uuid = ?`

	err := r.db.Exec(sqlQuery, projectId, date, projectId).Error
	if err != nil {
		return err
	}
	return nil
}

package postgres

import (
	"errors"
	"nik19ta/backend/services/links"
	"time"

	stat "nik19ta/backend/services/stat"

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

func (r UserRepository) GetVisits() ([]stat.Visits, error) {
	// Создаем временную границу для последних 30 дней
	timeBoundary := time.Now().AddDate(0, 0, -30)

	var visits []stat.Visits
	r.db.Where("time_entry > ?", timeBoundary).Find(&visits)

	return visits, nil
}

func (r UserRepository) GetUniqueVisits() (*stat.UniqueVisitStatsWithTotal, error) {

	// 1. Получить дату, которая была 30 дней назад от текущей даты
	now := time.Now()
	startDate := now.AddDate(0, 0, -30).Format("2006/01/02")

	// 2. Использовать эту дату в SQL-запросе для получения данных о посещениях
	var visits []stat.UniqueVisitStats
	err := r.db.Where("date >= ?", startDate).Find(&visits).Error
	if err != nil {
		return nil, err
	}

	// 3. Заполнить пропущенные даты с нулевым количеством посещений
	visitMap := make(map[string]int)
	for _, visit := range visits {
		visitMap[visit.Date] = visit.Count
	}

	result := make([]stat.UniqueVisitStats, 0, 30)

	for i := 0; i < 30; i++ {
		date := now.AddDate(0, 0, -i).Format("2006/01/02")
		count, ok := visitMap[date]
		if !ok {
			count = 0
		}
		result = append([]stat.UniqueVisitStats{{Date: date, Count: count}}, result...)
	}

	total := 0

	for _, item := range result {
		total += item.Count
	}

	data := stat.UniqueVisitStatsWithTotal{
		Total:  total,
		ByDays: result,
	}

	return &data, nil
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

	country := results.Country_short

	date := date.GetDate()

	sqlQuery := `
		INSERT INTO country_stats (country, date, count)
		VALUES (?, ?, 1)
		ON CONFLICT (country, date) DO UPDATE SET
			count = country_stats.count + 1
		WHERE country_stats.country = ?`

	err = r.db.Exec(sqlQuery, country, date, country).Error
	if err != nil {
		return err
	}
	return nil
}

func (r UserRepository) GetCountries() ([]stat.CountriesResponse, error) {
	var countries []stat.CountriesResponse
	currentDate := time.Now()
	startDate := currentDate.AddDate(0, 0, -30).Format("2006/01/02")

	err := r.db.Table("country_stats").Select("country, SUM(count) as count").
		Where("date >= ?", startDate).
		Group("country").
		Order("count DESC").
		Scan(&countries).Error

	if err != nil {
		return nil, err
	}

	return countries, nil

}

func (r UserRepository) GetProjectVisits() (map[string][]stat.ProjectsStats, error) {
	// 1. Получить список всех проектов с их UUID
	var projects []Project
	err := r.db.Select("uuid").Find(&projects).Error
	if err != nil {
		return nil, err
	}

	// Получить дату, которая была 30 дней назад от текущей даты
	now := time.Now()
	startDate := now.AddDate(0, 0, -30).Format("2006/01/02")

	projectVisits := make(map[string][]stat.ProjectsStats)

	for _, project := range projects {
		// 2. Использовать UUID каждого проекта для выполнения запроса и получения информации о посещениях проекта за последние 30 дней
		var projectStats []stat.ProjectsStats
		err := r.db.Where("uuid = ? AND date >= ?", project.UUID, startDate).Find(&projectStats).Error
		if err != nil {
			return nil, err
		}

		// 3. Заполнить пропущенные даты с нулевым количеством посещений для каждого проекта
		projectStatsMap := make(map[string]int)
		for _, stat := range projectStats {
			projectStatsMap[stat.Date] = stat.Count
		}

		result := make([]stat.ProjectsStats, 0, 30)
		for i := 0; i < 30; i++ {
			date := now.AddDate(0, 0, -i).Format("2006/01/02")
			count, ok := projectStatsMap[date]
			if !ok {
				count = 0
			}
			result = append([]stat.ProjectsStats{{UUID: project.UUID, Date: date, Count: count}}, result...)
		}

		projectVisits[project.UUID] = result
	}

	return projectVisits, nil
}

func (r UserRepository) AddVisit(data stat.Visits) error {
	result := r.db.Create(&data)

	return result.Error
}

func (r UserRepository) VisitExtend(session string) error {
	result := r.db.Model(&stat.Visits{}).Where("uid = ?", session).Update("time_leaving", time.Now())

	return result.Error
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

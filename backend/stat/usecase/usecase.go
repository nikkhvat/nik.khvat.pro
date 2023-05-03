package usecase

import (
	"github.com/ip2location/ip2location-go"
	"nik19ta/backend/models"
	"nik19ta/backend/pkg/config"
	"nik19ta/backend/stat"
	"time"

	"github.com/google/uuid"
	"github.com/mssola/useragent"
)

type statUseCase struct {
	userRepo stat.UserRepository
}

func NewStatUseCase(userRepo stat.UserRepository) *statUseCase {
	return &statUseCase{userRepo: userRepo}
}

//func (a *statUseCase) GetVisits() (*models.VisitStatsWithTotal, error) {
//	visits, err := a.userRepo.GetVisits()
//	if err != nil {
//		return nil, stat.DataBaseError
//	}
//
//	return visits, nil
//}

//func (a *statUseCase) GetUniqueVisits() (*models.UniqueVisitStatsWithTotal, error) {
//	visits, err := a.userRepo.GetUniqueVisits()
//	if err != nil {
//		return nil, stat.DataBaseError
//	}
//
//	return visits, nil
//}

func (a *statUseCase) GetCliksStat() (*[]models.ClicksStat, error) {
	clicks, err := a.userRepo.GetCliksStat()
	if err != nil {
		return nil, stat.DataBaseError
	}

	return clicks, nil
}

func (a *statUseCase) GetProjectStat() (map[string][]models.ProjectsStats, error) {
	statProjects, err := a.userRepo.GetProjectVisits()
	if err != nil {
		return nil, stat.DataBaseError
	}

	return statProjects, nil
}

func countryDefinition(ip string) string {
	if ip == "" {
		return "-"
	}

	db, err := ip2location.OpenDB(config.GetConfig().IpDataBasePath)

	if err != nil {
		return "-"
	}
	defer db.Close()

	results, err := db.Get_country_short(ip)

	if err != nil {
		return "-"
	}

	return results.Country_short
}

func (a *statUseCase) VisitExtend(session string) error {
	return a.userRepo.VisitExtend(session)
}

func (a *statUseCase) AddVisit(ip, userAgent, utm string, unique bool) (uuid.UUID, error) {
	ua := useragent.New(userAgent)
	session := uuid.New()

	browserName, _ := ua.Browser()

	country := countryDefinition(ip)

	data := models.Visits{
		UId:         session,
		TimeEntry:   time.Now(),
		Browser:     browserName,
		Os:          ua.Platform(),
		TimeLeaving: time.Now(),
		Country:     country,
		Unique:      unique,
		Ip:          ip,
		Utm:         utm,
	}

	err := a.userRepo.AddVisit(data)

	return session, err
}

func calculateSiteStats(visits []models.Visits) models.SiteStats {
	stats := models.SiteStats{
		TopCountries:      make(map[string]int),
		TotalVisits:       len(visits),
		UniqueVisits:      0,
		UniqueVisitsByDay: make(map[string]int),
		TotalVisitsByDay:  make(map[string]int),
		TopOS:             make(map[string]int),
		TopBrowsers:       make(map[string]int),
		AvgTimeOnSite:     0,
	}

	uniqueVisitors := make(map[string]bool)
	var totalTimeOnSite time.Duration

	for _, visit := range visits {
		if visit.Browser == "Googlebot" {
			visit.Os = "Googlebot"
		}
		
		stats.TopCountries[visit.Country]++
		if !uniqueVisitors[visit.Ip] {
			stats.UniqueVisits++
			uniqueVisitors[visit.Ip] = true
		}

		date := visit.TimeEntry.Format("2006-01-02")
		stats.UniqueVisitsByDay[date]++
		stats.TotalVisitsByDay[date]++

		stats.TopOS[visit.Os]++
		stats.TopBrowsers[visit.Browser]++

		timeOnSite := visit.TimeLeaving.Sub(visit.TimeEntry)
		totalTimeOnSite += timeOnSite

		// Подробности посещения
		found := false
		for i, details := range stats.VisitsDetailsByDays {
			if details.Date == date {

				stats.VisitsDetailsByDays[i].Details = append(details.Details, visit)
				found = true
				break
			}
		}
		if !found {
			stats.VisitsDetailsByDays = append(stats.VisitsDetailsByDays, models.VisitsDetails{Date: date, Details: []models.Visits{visit}})
		}
	}

	stats.AvgTimeOnSite = totalTimeOnSite / time.Duration(stats.TotalVisits)

	return stats
}

func (a *statUseCase) GetVisits() (models.SiteStats, error) {
	data, err := a.userRepo.GetVisits()

	if err != nil {
		return models.SiteStats{}, err
	}

	resp := calculateSiteStats(data)

	return resp, nil
}

func (a *statUseCase) AddClikc(buttonId string) error {
	return a.userRepo.AddClikc(buttonId)
}

func (a *statUseCase) AddProjectVisit(projectId string) error {
	return a.userRepo.AddProjectVisit(projectId)
}

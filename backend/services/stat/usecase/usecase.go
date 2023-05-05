package usecase

import (
	"log"
	"nik19ta/backend/pkg/config"
	"nik19ta/backend/services/links"
	stat "nik19ta/backend/services/stat"
	"strings"
	"time"

	"github.com/ip2location/ip2location-go"

	"github.com/google/uuid"
	"github.com/mssola/useragent"
)

type statUseCase struct {
	userRepo stat.UserRepository
}

func NewStatUseCase(userRepo stat.UserRepository) *statUseCase {
	return &statUseCase{userRepo: userRepo}
}

func (a *statUseCase) GetProjectStat() (map[string][]stat.ProjectsStats, error) {
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

	ua.Model()

	data := stat.Visits{
		UId:         session,
		TimeEntry:   time.Now(),
		Browser:     browserName,
		Platform:    ua.Platform(),
		Os:          ua.OS(),
		TimeLeaving: time.Now(),
		Country:     country,
		Unique:      unique,
		Ip:          ip,
		Utm:         utm,
	}

	err := a.userRepo.AddVisit(data)

	return session, err
}

func calculateSiteStats(visits []stat.Visits) stat.SiteStats {
	stats := stat.SiteStats{
		TopCountries:      make(map[string]int),
		TotalVisits:       0,
		TotalBots:         0,
		UniqueVisits:      0,
		UniqueVisitsByDay: make(map[string]int),
		TotalVisitsByDay:  make(map[string]int),
		VisitsBotByDay:    make(map[string]int),
		TopOS:             make(map[string]int),
		TopBrowsers:       make(map[string]int),
		AvgTimeOnSite:     0,
	}

	uniqueVisitors := make(map[string]bool)
	var totalTimeOnSite time.Duration

	for _, visit := range visits {
		if visit.Browser == "Googlebot" || visit.Browser == "AhrefsBot" || visit.Browser == "Vercelbot" {
			visit.Os = visit.Browser
		}

		date := visit.TimeEntry.Format("2006-01-02")

		browser := strings.ToLower(visit.Browser)

		if strings.Contains(browser, "bot") {
			log.Println("BOT FOUND")
			stats.VisitsBotByDay[date]++
			stats.TotalBots++
		} else {
			stats.UniqueVisitsByDay[date]++
			stats.TotalVisitsByDay[date]++
			stats.TopOS[visit.Os]++
			stats.TopBrowsers[visit.Browser]++
			stats.TotalVisits++

			timeOnSite := visit.TimeLeaving.Sub(visit.TimeEntry)
			totalTimeOnSite += timeOnSite

			stats.TopCountries[visit.Country]++
			if !uniqueVisitors[visit.Ip] {
				stats.UniqueVisits++
				uniqueVisitors[visit.Ip] = true
			}
		}

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
			stats.VisitsDetailsByDays = append(stats.VisitsDetailsByDays, stat.VisitsDetails{Date: date, Details: []stat.Visits{visit}})
		}
	}

	stats.AvgTimeOnSite = int64(totalTimeOnSite / time.Duration(stats.TotalVisits))

	return stats
}

func (a *statUseCase) GetVisits() (stat.SiteStats, error) {
	data, err := a.userRepo.GetVisits()

	if err != nil {
		return stat.SiteStats{}, err
	}

	resp := calculateSiteStats(data)

	return resp, nil
}

func (a *statUseCase) AddProjectVisit(projectId string) error {
	return a.userRepo.AddProjectVisit(projectId)
}

func (a *statUseCase) GetLinks() ([]links.Link, error) {
	return a.userRepo.GetLinks()
}

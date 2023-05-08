package usecase

import (
	"nik19ta/backend/pkg/config"
	"nik19ta/backend/services/links"
	stat "nik19ta/backend/services/stat"
	"sort"
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

func (a *statUseCase) AddVisit(ip, userAgent, utm, httpReferer string, unique bool) (uuid.UUID, error) {
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
		HTTPReferer: httpReferer,
	}

	err := a.userRepo.AddVisit(data)

	return session, err
}

type Pair struct {
	Key   string
	Value int
}

type PairList []Pair

func (p PairList) Len() int           { return len(p) }
func (p PairList) Less(i, j int) bool { return p[i].Value > p[j].Value } // Сортировка по убыванию
func (p PairList) Swap(i, j int)      { p[i], p[j] = p[j], p[i] }

func sortMapByValue(m map[string]int) PairList {
	pl := make(PairList, len(m))
	i := 0
	for k, v := range m {
		pl[i] = Pair{k, v}
		i++
	}
	sort.Sort(pl)
	return pl
}

func calculateSiteStats(visits []stat.Visits) stat.SiteStats {
	stats := stat.SiteStats{
		TotalVisits:       0,
		TotalBots:         0,
		UniqueVisits:      0,
		UniqueVisitsByDay: make(map[string]int),
		TotalVisitsByDay:  make(map[string]int),
		//VisitsBotByDay:    make(map[string]int),
		AvgTimeOnSite: 0,
	}

	var totalDuration time.Duration
	var peoples int

	uniqueVisitors := make(map[string]bool)
	botsByDate := make(map[string][]stat.Entry)
	TopCountries := make(map[string]int)
	TopBrowsers := make(map[string]int)
	TopOS := make(map[string]int)

	for _, visit := range visits {
		if visit.Browser == "Googlebot" || visit.Browser == "AhrefsBot" || visit.Browser == "Vercelbot" {
			visit.Os = visit.Browser
		}

		date := visit.TimeEntry.Format("2006-01-02")

		browser := strings.ToLower(visit.Browser)

		if strings.Contains(browser, "bot") {
			botsByDate[date] = append(botsByDate[date], stat.Entry{
				Name:  visit.Browser,
				Count: 1,
			})
			stats.TotalBots++
		} else {
			stats.UniqueVisitsByDay[date]++
			stats.TotalVisitsByDay[date]++

			stats.TotalVisits++

			TopOS[visit.Os]++
			TopBrowsers[visit.Browser]++

			//timeOnSite := visit.TimeLeaving.Sub(visit.TimeEntry)
			duration := visit.TimeLeaving.Sub(visit.TimeEntry)
			totalDuration += duration

			peoples++

			TopCountries[visit.Country]++
			if !uniqueVisitors[visit.Ip] {
				stats.UniqueVisits++
				uniqueVisitors[visit.Ip] = true
			}
		}

		// Подробности посещения
		//found := false
		//for i, details := range stats.VisitsDetailsByDays {
		//	if details.Date == date {
		//
		//		stats.VisitsDetailsByDays[i].Details = append(details.Details, visit)
		//		found = true
		//		break
		//	}
		//}
		//if !found {
		//	stats.VisitsDetailsByDays = append(stats.VisitsDetailsByDays, stat.VisitsDetails{Date: date, Details: []stat.Visits{visit}})
		//}
	}

	stats.AvgTimeOnSite = int64(totalDuration/time.Duration(peoples)) / 1000000

	// Sort TopCountries
	sortedCountries := make([]stat.Entry, 0, len(TopCountries))

	for k, v := range TopCountries {
		sortedCountries = append(sortedCountries, stat.Entry{Name: k, Count: v})
	}

	sort.Slice(sortedCountries, func(i, j int) bool {
		return sortedCountries[i].Count > sortedCountries[j].Count
	})

	stats.TopCountries = sortedCountries

	// Sort TopCountries END

	// Sort Browser
	sortedBrowsers := make([]stat.Entry, 0, len(TopBrowsers))

	for k, v := range TopBrowsers {
		sortedBrowsers = append(sortedBrowsers, stat.Entry{Name: k, Count: v})
	}

	sort.Slice(sortedBrowsers, func(i, j int) bool {
		return sortedBrowsers[i].Count > sortedBrowsers[j].Count
	})

	stats.TopBrowsers = sortedBrowsers

	// Sort Browser END

	// Sort top os
	sortedTopOs := make([]stat.Entry, 0, len(TopOS))

	for k, v := range TopOS {
		sortedTopOs = append(sortedTopOs, stat.Entry{Name: k, Count: v})
	}

	sort.Slice(sortedTopOs, func(i, j int) bool {
		return sortedTopOs[i].Count > sortedTopOs[j].Count
	})

	stats.TopOS = sortedTopOs

	// Sort top os END

	// Start top Bots
	now := time.Now()
	endDate := now.Format("2006-01-02")
	startDate := now.AddDate(0, 0, -16).Format("2006-01-02")

	bots := convertToBots(botsByDate, startDate, endDate)

	stats.VisitsBotByDay = bots
	// End top bots
	return stats
}

func convertToBots(data map[string][]stat.Entry, startDate, endDate string) []stat.Bot {
	start, _ := time.Parse("2006-01-02", startDate)
	end, _ := time.Parse("2006-01-02", endDate)

	bots := []stat.Bot{}
	for d := start; !d.After(end); d = d.AddDate(0, 0, 1) {
		date := d.Format("2006-01-02")
		details, ok := data[date]
		if !ok {
			details = []stat.Entry{}
		} else {
			details = mergeEntries(details)
		}

		total := getTotal(details)

		bot := stat.Bot{
			Date:    date,
			Details: details,
			Total:   total,
		}
		bots = append(bots, bot)
	}
	return bots
}

func getTotal(details []stat.Entry) int {
	total := 0
	for _, entry := range details {
		total += entry.Count
	}
	return total
}

func mergeEntries(entries []stat.Entry) []stat.Entry {
	merged := make(map[string]int)
	for _, entry := range entries {
		merged[entry.Name] += entry.Count
	}

	mergedEntries := make([]stat.Entry, 0, len(merged))
	for name, count := range merged {
		mergedEntries = append(mergedEntries, stat.Entry{Name: name, Count: count})
	}

	return mergedEntries
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

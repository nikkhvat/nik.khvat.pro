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

func (a *statUseCase) AddVisit(ip, userAgent, utm, httpReferer, url, title string, session string, unique bool) (string, error) {
	ua := useragent.New(userAgent)

	var userSession string

	if session == "" {
		userSession = uuid.New().String()
	} else {
		userSession = session
	}

	// Я получаю сессию, если она есть то я её записываю, если её нет то я создаю и возвращаю новому пользоваетлю
	// Проверка идёт по Сесии, и считаються уникальными
	// Также статистика идёт по страницам

	browserName, _ := ua.Browser()

	country := countryDefinition(ip)

	ua.Model()

	data := stat.Visits{
		UId:         uuid.New(),
		Session:     userSession,
		TimeEntry:   time.Now(),
		Browser:     browserName,
		Platform:    ua.Platform(),
		Os:          ua.OS(),
		TimeLeaving: time.Now(),
		Country:     country,
		Unique:      unique,
		Ip:          ip,
		Utm:         utm,
		URL:         url,
		Title:       title,
		HTTPReferer: httpReferer,
	}

	err := a.userRepo.AddVisit(data)

	return userSession, err
}

// func calculateSiteStats(visits []stat.Visits) stat.SiteStats {
// 	stats := stat.SiteStats{
// 		TotalVisits:       0,
// 		TotalBots:         0,
// 		UniqueVisits:      0,
// 		UniqueVisitsByDay: make(map[string]int),
// 		TotalVisitsByDay:  make(map[string]int),
// 		//VisitsBotByDay:    make(map[string]int),
// 		AvgTimeOnSite: 0,
// 	}

// 	var totalDuration time.Duration
// 	var peoples int

// 	uniqueVisitors := make(map[string]bool)
// 	botsByDate := make(map[string][]stat.Entry)
// 	TopCountries := make(map[string]int)
// 	TopBrowsers := make(map[string]int)
// 	TopOS := make(map[string]int)

// 	for _, visit := range visits {
// 		if visit.Browser == "Googlebot" || visit.Browser == "AhrefsBot" || visit.Browser == "Vercelbot" {
// 			visit.Os = visit.Browser
// 		}

// 		date := visit.TimeEntry.Format("2006-01-02")

// 		browser := strings.ToLower(visit.Browser)

// 		if strings.Contains(browser, "bot") {
// 			botsByDate[date] = append(botsByDate[date], stat.Entry{
// 				Name:  visit.Browser,
// 				Count: 1,
// 			})
// 			stats.TotalBots++
// 		} else {
// 			stats.UniqueVisitsByDay[date]++

// 			if visit.Unique {
// 				stats.TotalVisitsByDay[date]++
// 			}

// 			stats.TotalVisits++

// 			TopOS[visit.Os]++
// 			TopBrowsers[visit.Browser]++

// 			//timeOnSite := visit.TimeLeaving.Sub(visit.TimeEntry)
// 			duration := visit.TimeLeaving.Sub(visit.TimeEntry)
// 			totalDuration += duration

// 			peoples++

// 			TopCountries[visit.Country]++
// 			if !uniqueVisitors[visit.Ip] {
// 				stats.UniqueVisits++
// 				uniqueVisitors[visit.Ip] = true
// 			}
// 		}
// 	}

// 	stats.AvgTimeOnSite = int64(totalDuration/time.Duration(peoples)) / 1000000

// 	// Sort TopCountries
// 	sortedCountries := make([]stat.Entry, 0, len(TopCountries))

// 	for k, v := range TopCountries {
// 		sortedCountries = append(sortedCountries, stat.Entry{Name: k, Count: v})
// 	}

// 	sort.Slice(sortedCountries, func(i, j int) bool {
// 		return sortedCountries[i].Count > sortedCountries[j].Count
// 	})

// 	stats.TopCountries = sortedCountries

// 	// Sort TopCountries END

// 	// Sort Browser
// 	sortedBrowsers := make([]stat.Entry, 0, len(TopBrowsers))

// 	for k, v := range TopBrowsers {
// 		sortedBrowsers = append(sortedBrowsers, stat.Entry{Name: k, Count: v})
// 	}

// 	sort.Slice(sortedBrowsers, func(i, j int) bool {
// 		return sortedBrowsers[i].Count > sortedBrowsers[j].Count
// 	})

// 	stats.TopBrowsers = sortedBrowsers

// 	// Sort Browser END

// 	// Sort top os
// 	sortedTopOs := make([]stat.Entry, 0, len(TopOS))

// 	for k, v := range TopOS {
// 		sortedTopOs = append(sortedTopOs, stat.Entry{Name: k, Count: v})
// 	}

// 	sort.Slice(sortedTopOs, func(i, j int) bool {
// 		return sortedTopOs[i].Count > sortedTopOs[j].Count
// 	})

// 	stats.TopOS = sortedTopOs

// 	// Sort top os END

// 	// Start top Bots
// 	now := time.Now()
// 	endDate := now.Format("2006-01-02")
// 	startDate := now.AddDate(0, 0, -16).Format("2006-01-02")

// 	bots := convertToBots(botsByDate, startDate, endDate)

// 	stats.VisitsBotByDay = bots
// 	// End top bots
// 	return stats
// }

// func convertToBots(data map[string][]stat.Entry, startDate, endDate string) []stat.Bot {
// 	start, _ := time.Parse("2006-01-02", startDate)
// 	end, _ := time.Parse("2006-01-02", endDate)

// 	bots := []stat.Bot{}
// 	for d := start; !d.After(end); d = d.AddDate(0, 0, 1) {
// 		date := d.Format("2006-01-02")
// 		details, ok := data[date]
// 		if !ok {
// 			details = []stat.Entry{}
// 		} else {
// 			details = mergeEntries(details)
// 		}

// 		total := getTotal(details)

// 		bot := stat.Bot{
// 			Date:    date,
// 			Details: details,
// 			Total:   total,
// 		}
// 		bots = append(bots, bot)
// 	}
// 	return bots
// }

// func getTotal(details []stat.Entry) int {
// 	total := 0
// 	for _, entry := range details {
// 		total += entry.Count
// 	}
// 	return total
// }

// func mergeEntries(entries []stat.Entry) []stat.Entry {
// 	merged := make(map[string]int)
// 	for _, entry := range entries {
// 		merged[entry.Name] += entry.Count
// 	}

// 	mergedEntries := make([]stat.Entry, 0, len(merged))
// 	for name, count := range merged {
// 		mergedEntries = append(mergedEntries, stat.Entry{Name: name, Count: count})
// 	}

// 	return mergedEntries
// }

func calculateSiteStats(visits []stat.Visits) stat.SiteStats {
	// Создаем пустой объект SiteStats
	stats := stat.SiteStats{}

	// Создаем временные хранилища
	topPagesMap := make(map[string]stat.URLCountPair)
	browserCounter := make(map[string]int)
	countryCounter := make(map[string]int)
	sessionCounter := make(map[string]bool)
	topOSMap := make(map[string]int)

	var totalDuration time.Duration

	// Создайте отображение для хранения информации о первых посещениях по сессиям
	firstVisitSessions := make(map[string]bool)

	// Создайте отображение для хранения информации о первых посещениях по дням
	firstVisitsByDayMap := make(map[string]int)

	// Получите текущую дату и вычислите дату 30 дней назад
	now := time.Now()
	startDate := now.AddDate(0, 0, -30)

	for _, visit := range visits {
		// * Если браузер содержит "bot", учитываем его как бота
		if containsBot(visit.Browser) {
			stats.TotalBots++
			continue
		}

		if _, ok := firstVisitSessions[visit.Session]; !ok {
			firstVisitSessions[visit.Session] = true

			// Если посещение находится в интервале последних 30 дней
			if visit.TimeEntry.After(startDate) {
				// Получите дату посещения без времени
				visitDate := visit.TimeEntry.Format("2006-01-02")

				// Обновление информации о первых посещениях по дням
				firstVisitsByDayMap[visitDate]++
			}

			// * Обновление информации о топ-ОС
			topOSMap[visit.Os]++

			// * Обновляем счетчик для браузера
			browserCounter[visit.Browser]++

			// * Обновляем счетчик для страны
			countryCounter[visit.Country]++
		}

		// * Иначе учитываем его как обычное посещение
		stats.TotalVisits++

		// * Обновляем счетчик для уникальных сессий
		sessionCounter[visit.Session] = true

		// * Обновляем сумму продолжительности
		totalDuration += visit.TimeLeaving.Sub(visit.TimeEntry)

		// * Обновление информации о топ-страницах
		if page, ok := topPagesMap[visit.URL]; ok {
			page.Count++
			topPagesMap[visit.URL] = page
		} else {
			topPagesMap[visit.URL] = stat.URLCountPair{
				URL:   visit.URL,
				Title: visit.Title,
				Count: 1,
			}
		}

		// * Конвертирование отображения firstVisitsByDayMap в срез firstVisitsByDay

		var firstVisitsByDay []stat.DateCountPair
		for date := startDate; !date.After(now); date = date.AddDate(0, 0, 1) {
			formattedDate := date.Format("2006-01-02")
			count := firstVisitsByDayMap[formattedDate]
			firstVisitsByDay = append(firstVisitsByDay, stat.DateCountPair{Date: formattedDate, Count: count})
		}

		stats.FirstVisitsByDay = firstVisitsByDay

	}

	// Вычисляем среднюю продолжительность посещения
	if stats.TotalVisits > 0 {
		stats.AvgDuration = int64((totalDuration / time.Duration(stats.TotalVisits)) / 1000000)
	}

	// * Вычисляем количество уникальных сессий
	stats.FirstVisits = len(sessionCounter)

	// * Сортируем и добавляем топ страниц
	// Конвертирование отображения topPagesMap в срез topPages
	var topPages []stat.URLCountPair
	for _, page := range topPagesMap {
		topPages = append(topPages, page)
	}

	// Сортировка topPages по убыванию count
	sort.Slice(topPages, func(i, j int) bool {
		return topPages[i].Count > topPages[j].Count
	})

	stats.TopPages = topPages

	// * Сортируем и добавляем топ браузеров
	stats.TopBrowsers = sortAndSliceTopBrowsers(browserCounter)

	// * Сортируем и добавляем топ стран
	stats.TopCountries = sortAndSliceTopCountries(countryCounter)

	// * Конвертирование отображения topOSMap в срез topOS
	var topOS []stat.NameCountPair
	for name, count := range topOSMap {
		topOS = append(topOS, stat.NameCountPair{Name: name, Count: count})
	}

	// * Сортировка topOS по убыванию count
	sort.Slice(topOS, func(i, j int) bool {
		return topOS[i].Count > topOS[j].Count
	})

	stats.TopOS = topOS

	return stats
}

func sortAndSliceTopCountries(countryCounter map[string]int) []stat.NameCountPair {
	sortedCountries := make(stat.NameCountPairs, 0, len(countryCounter))

	for country, count := range countryCounter {
		sortedCountries = append(sortedCountries, stat.NameCountPair{
			Name:  country,
			Count: count,
		})
	}

	sort.Sort(sort.Reverse(sortedCountries))

	return sortedCountries
}

func containsBot(browser string) bool {
	return strings.Contains(strings.ToLower(browser), "bot")
}

func sortAndSliceTopBrowsers(browserCounter map[string]int) []stat.BrowserCount {
	browsers := make([]stat.BrowserCount, 0, len(browserCounter))

	for name, count := range browserCounter {
		browsers = append(browsers, stat.BrowserCount{Name: name, Count: count})
	}

	sort.Slice(browsers, func(i, j int) bool {
		return browsers[i].Count > browsers[j].Count
	})

	return browsers
}

func (a *statUseCase) GetVisits() (stat.SiteStats, error) {
	data, err := a.userRepo.GetVisits()

	if err != nil {
		return stat.SiteStats{}, err
	}

	resp := calculateSiteStats(data)

	return resp, nil
}

func (a *statUseCase) GetLinks() ([]links.Link, error) {
	return a.userRepo.GetLinks()
}

package models

import (
	"github.com/google/uuid"
	"time"
)

type StatUpdateParam struct {
	ID string `uri:"id" binding:"required,uuid"`
}

type StatUpdateParamButtons struct {
	ID string `uri:"id" binding:"required"`
}

type VisitStatsWithTotal struct {
	Total  int          `json:"total"`
	ByDays []VisitStats `json:"by_days"`
}

type UniqueVisitStatsWithTotal struct {
	Total  int                `json:"total"`
	ByDays []UniqueVisitStats `json:"by_days"`
}

type CountriesResponse struct {
	Country string `json:"country"`
	Count   int    `json:"count"`
}

type Visits struct {
	UId         uuid.UUID `json:"uid"`          // Уникальный идентификатор
	TimeEntry   time.Time `json:"time_entry"`   // Время в которое человек зашёл
	Browser     string    `json:"browser"`      // Браузер (Chrome, Firefox и тд)
	Platform    string    `json:"platform"`     // Платформа (Linux, Macintosh, iPhone)
	Os          string    `json:"os"`           // Операционная система (Windows, MacOs и тд)
	TimeLeaving time.Time `json:"time_leaving"` // Время когда пользователь покинул сайт
	Country     string    `json:"country"`      // Короткий код страны (EE, DE и тд )
	Unique      bool      `json:"unique"`       // Заходил ли пользователь уже или нет
	Ip          string    `json:"ip"`           // Ip адресс с которого заходили
	Utm         string    `json:"utm"`          // id UTM метки
}

type SiteStats struct {
	TopCountries        map[string]int  `json:"top_countries"`          // Топ стран
	TotalVisits         int             `json:"total_visits"`           // Посещения
	UniqueVisits        int             `json:"unique_visits"`          // Уникальные посещения
	UniqueVisitsByDay   map[string]int  `json:"unique_visits_by_day"`   // Уникальные посещения за день
	TotalVisitsByDay    map[string]int  `json:"total_visits_by_day"`    // Визиты за день
	TopOS               map[string]int  `json:"top_os"`                 // Топ операционных систем
	TopBrowsers         map[string]int  `json:"top_browsers"`           // Топ бразуреов
	AvgTimeOnSite       time.Duration   `json:"avg_time_on_site"`       // Среднее время нахождение на сайте
	VisitsDetailsByDays []VisitsDetails `json:"visits_details_by_days"` // Полная статистика посещений по пользывателям
}

type VisitsDetails struct {
	Date    string   `json:"date"`    // Дата
	Details []Visits `json:"details"` // Детали
}

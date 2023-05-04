package models

import (
	"time"

	"github.com/google/uuid"
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

// swagger:model Visits
type Visits struct {
	UId         uuid.UUID `json:"uid"`          // Unique identifier
	TimeEntry   time.Time `json:"time_entry"`   // The time at which the person entered
	Browser     string    `json:"browser"`      // Browser (Chrome, Firefox, etc.)
	Platform    string    `json:"platform"`     // Platform (Linux, Macintosh, iPhone)
	Os          string    `json:"os"`           // Operating system (Windows, macOS, etc.)
	TimeLeaving time.Time `json:"time_leaving"` // The time when the user left the site
	Country     string    `json:"country"`      // Short country code (EE, DE, etc.)
	Unique      bool      `json:"unique"`       // Has the user already logged in or not
	Ip          string    `json:"ip"`           // The IP address from which
	Utm         string    `json:"utm"`          // the UTM tag id came in
}

// swagger:model SiteStats
type SiteStats struct {
	TopCountries        map[string]int  `json:"top_countries"`          // Top countries
	TotalVisits         int             `json:"total_visits"`           // Visits
	UniqueVisits        int             `json:"unique_visits"`          // Unique visits
	UniqueVisitsByDay   map[string]int  `json:"unique_visits_by_day"`   // Unique visits per day
	TotalVisitsByDay    map[string]int  `json:"total_visits_by_day"`    // Visits per day
	TopOS               map[string]int  `json:"top_os"`                 // Top Operating systems
	TopBrowsers         map[string]int  `json:"top_browsers"`           // Top browsers
	AvgTimeOnSite       int64           `json:"avg_time_on_site"`       // Average time spent on the site
	VisitsDetailsByDays []VisitsDetails `json:"visits_details_by_days"` // Full statistics of visits by users
}

// swagger:model VisitsDetails
type VisitsDetails struct {
	Date    string   `json:"date"`    // Date
	Details []Visits `json:"details"` // Details
}

// swagger:model VisitsResponse
type VisitsResponse struct {
	Data SiteStats `json:"data"`
}

// swagger:model SessionResponse
type SessionResponse struct {
	Session uuid.UUID `json:"session"`
}

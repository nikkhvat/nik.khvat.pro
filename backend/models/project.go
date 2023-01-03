package models

import (
	JSON "nik19ta/backend/pkg/json"

	"github.com/lib/pq"
)

type FeaturesResp struct {
	Name string `json:"name"`
	Lang string `json:"lang"`
}

type ProjectResponse struct {
	Categories  pq.Int64Array  `json:"categories" gorm:"type:integer[]"`
	ID          string         `json:"id"`
	URL         string         `json:"url"`
	Title       string         `json:"title"`
	SubTitle    string         `json:"subtitle"`
	Description string         `json:"description"`
	Cards       JSON.JSONB     `json:"cards"`
	Features    JSON.JSONB     `json:"features" gorm:"type:string[]"`
	Photos      pq.StringArray `json:"photos" gorm:"type:string[]"`
}

type ProjectsResponse struct {
	Categories pq.Int64Array `json:"categories" gorm:"type:integer[]"`
	ID         string        `json:"id"`
	URL        string        `json:"url"`
	Title      string        `json:"title"`
	SubTitle   string        `json:"subtitle"`
}

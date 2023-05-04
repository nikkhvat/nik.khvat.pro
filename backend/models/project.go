package models

import (
	JSON "nik19ta/backend/pkg/json"

	"github.com/lib/pq"
)

type FeaturesResp struct {
	Name string `json:"name"`
	Lang string `json:"lang"`
}

// swagger:model ProjectResponse
type ProjectResponse struct {
	Categories  pq.Int64Array  `json:"categories" gorm:"type:integer[]" swaggertype:"array,number"`
	ID          string         `json:"id"`
	URL         string         `json:"url"`
	Title       string         `json:"title"`
	SubTitle    string         `json:"subtitle"`
	Description string         `json:"description"`
	Cards       JSON.JSONB     `json:"cards" swaggertype:"string"`
	Features    JSON.JSONB     `json:"features" gorm:"type:string[]" swaggertype:"string"`
	Photos      pq.StringArray `json:"photos" gorm:"type:string[]" swaggertype:"array,number"`
}

// swagger:model ProjectsResponse
type ProjectsResponse struct {
	Categories pq.Int64Array `json:"categories" gorm:"type:integer[]" swaggertype:"array,number"`
	ID         string        `json:"id"`
	URL        string        `json:"url"`
	Title      string        `json:"title"`
	SubTitle   string        `json:"subtitle"`
}

// swagger:model ProjectsResp
type ProjectsResp struct {
	Data []ProjectsResponse `json:"data"`
}

package models

import "github.com/lib/pq"

type ProjectResponse struct {
	Categories  []int  `json:"categories"`
	ID          string `json:"id"`
	URL         string `json:"url"`
	Title       string `json:"title"`
	SubTitle    string `json:"subtitle"`
	Description string `json:"description"`
	Cards       []struct {
		Title    string `json:"title"`
		SubTitle string `json:"sub_title"`
	} `json:"cards"`
	Features []struct {
		Name string `json:"name"`
		Lang string `json:"lang"`
	} `json:"features"`
	Photos []string `json:"photos"`
}

type ProjectsResponse struct {
	Categories pq.Int64Array `json:"categories" gorm:"type:integer[]"`
	ID         string        `json:"id"`
	URL        string        `json:"url"`
	Title      string        `json:"title"`
	SubTitle   string        `json:"subtitle"`
}

// `json:"categories"`

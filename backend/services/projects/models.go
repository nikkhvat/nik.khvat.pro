package projects

import (
	JSON "nik19ta/backend/pkg/json"

	"github.com/lib/pq"
)

type Project struct {
	UUID       string `json:"id"`
	PhotoUrl   string `json:"photo_url"`
	Title      string `json:"title"`
	Categories string `json:"categories"`
}

type Subtitles struct {
	ProjectUUID string `json:"project_id"`
	UUID        string `json:"uuid"`
	Lang        string `json:"lang"`
	Content     string `json:"content"`
}

type Descriptions struct {
	ProjectUUID string `json:"project_id"`
	UUID        string `json:"uuid"`
	Lang        string `json:"lang"`
	Content     string `json:"content"`
}

type Cards struct {
	ProjectUUID string `json:"project_id"`
	UUID        string `json:"uuid"`
	Title       string `json:"title"`
	SubTitle    string `json:"sub_title"`
}

type Features struct {
	ProjectUUID string `json:"project_id"`
	UUID        string `json:"uuid"`
	Lang        string `json:"lang"`
	Content     string `json:"content"`
}

type Photos struct {
	ProjectUUID string `json:"project_id"`
	UUID        string `json:"uuid"`
	Path        string `json:"path"`
}

type FeaturesResp struct {
	Name string `json:"name"`
	Lang string `json:"lang"`
}

// swagger:model ProjectResponse
type ProjectResponse struct {
	Categories  pq.Int64Array  `json:"categories" gorm:"type:integer[]" swaggertype:"array,number"` // Category ids
	ID          string         `json:"id"`                                                          // Project's id
	URL         string         `json:"url"`                                                         // url preview
	Title       string         `json:"title"`                                                       // Project's title
	SubTitle    string         `json:"subtitle"`                                                    // Project's subtitle
	Description string         `json:"description"`                                                 // Project's description
	Cards       JSON.JSONB     `json:"cards" swaggertype:"string"`                                  // Project's card
	Features    JSON.JSONB     `json:"features" gorm:"type:string[]" swaggertype:"string"`          // Project's features
	Photos      pq.StringArray `json:"photos" gorm:"type:string[]" swaggertype:"array,number"`      // Project's photos
}

// swagger:model ProjectsResponse
type ProjectsResponse struct {
	Categories pq.Int64Array `json:"categories" gorm:"type:integer[]" swaggertype:"array,number"` // Category ids
	ID         string        `json:"id"`                                                          // Project's id
	URL        string        `json:"url"`                                                         // Url preview
	Title      string        `json:"title"`                                                       // Project's title
	SubTitle   string        `json:"subtitle"`                                                    // Project's subtitle
}

// swagger:model ProjectsResp
type ProjectsResp struct {
	Data []ProjectsResponse `json:"data"`
}

// swagger:model Category
type Category struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
}

package models

// Projects DB struct
type User struct {
	UUID     string `json:"id"`
	Mail     string `json:"mail"`
	Password string `json:"password"`
	Access   bool   `json:"access"`
}

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

// swagger:model ProjectsStats
type ProjectsStats struct {
	UUID  string `json:"uuid" gorm:"type:uuid;uniqueIndex:idx_uuid_date"`
	Count int    `json:"count"`
	Date  string `json:"date" gorm:"uniqueIndex:idx_uuid_date"`
}

type CountryStats struct {
	Country string `json:"country" gorm:"column:country;uniqueIndex:idx_country_date"`
	Count   int    `json:"count" gorm:"column:count"`
	Date    string `json:"date" gorm:"column:date;uniqueIndex:idx_country_date"`
}

type VisitStats struct {
	Count int    `json:"count"`
	Date  string `json:"date" gorm:"unique"`
}

type UniqueVisitStats struct {
	Count int    `json:"count"`
	Date  string `json:"date" gorm:"unique"`
}

type ClicksStat struct {
	Count int    `json:"count"`
	Date  string `json:"date" gorm:"unique"`
}

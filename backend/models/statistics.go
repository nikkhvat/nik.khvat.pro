package models

type DateInterval struct {
	Since string `json:"since"`
	To    string `json:"to"`
}

type Statistic struct {
	UserUUID   string `json:"user_uuid"`
	TimeOnSite string `json:"time_on_site"`
	StartTime  string `json:"start_time"`
	EndTime    string `json:"end_time"`
}

package models

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

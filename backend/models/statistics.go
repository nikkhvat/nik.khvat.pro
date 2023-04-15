package models

type StatUpdateParam struct {
	ID string `uri:"id" binding:"required,uuid"`
}

type StatUpdateParamButtons struct {
	ID string `uri:"id" binding:"required"`
}

package projects

import "errors"

var (
	ErrInvalidAccessToken = errors.New("invalid access token")
	DataBaseError         = errors.New("database error")

	CouldNotFindProject = errors.New("Not found project by ID")
)

package stat

import "errors"

var (
	ErrInvalidAccessToken = errors.New("invalid access token")
	DataBaseError         = errors.New("database error")
)

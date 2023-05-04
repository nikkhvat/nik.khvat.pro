package links

import "errors"

var (
	LinkCannotBeEmpty = errors.New("the link cannot be empty")
	PageCannotBeEmpty = errors.New("the page cannot be empty")
)

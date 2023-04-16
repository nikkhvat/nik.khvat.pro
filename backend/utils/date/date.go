package date

import (
	"time"
)

func GetDate() string {
	now := time.Now()
	return now.Format("2006/01/02")
}

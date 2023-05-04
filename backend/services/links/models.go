package links

import (
	"github.com/google/uuid"
	"time"
)

type Link struct {
	UID  uuid.UUID `json:"uuid"`
	Page string    `json:"page"`
	Link string    `json:"link"`
	Date time.Time `json:"date"`
}

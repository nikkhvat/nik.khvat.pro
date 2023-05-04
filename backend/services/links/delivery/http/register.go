package http

import (
	"nik19ta/backend/services/links"

	"github.com/gin-gonic/gin"
)

func RegisterHTTPEndpoints(router *gin.Engine, uc links.UseCase) {
	h := NewHandler(uc)

	authEndpoints := router.Group("/api/links")
	{
		authEndpoints.GET("/to", h.ToLink)
	}
}

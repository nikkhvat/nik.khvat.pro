package http

import (
	"nik19ta/backend/auth"

	"github.com/gin-gonic/gin"
)

func RegisterHTTPEndpoints(router *gin.Engine, uc auth.UseCase) {
	h := NewHandler(uc)

	authEndpoints := router.Group("/api/auth")
	{
		authEndpoints.POST("/sign-in", h.SignIn)
	}
}

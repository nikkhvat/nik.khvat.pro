package http

import (
	"nik19ta/backend/stat"

	"github.com/gin-gonic/gin"

	middlewareAuth "nik19ta/backend/pkg/middleware/auth"
)

func RegisterHTTPEndpoints(router *gin.Engine, uc stat.UseCase) {
	h := NewHandler(uc)

	statEndpoints := router.Group("/api/stat")
	statEndpoints.Use(middlewareAuth.JwtAuthMiddleware())
	{
		statEndpoints.GET("/visits", h.GetVisits)
		statEndpoints.GET("/visits/unique", h.GetUniqueVisits)
		statEndpoints.GET("/clicks", h.GetCliksStat)
		statEndpoints.GET("/projects", h.GetProjectStat)
	}

	statUpdateEndpoints := router.Group("/api/stat/update")
	{
		statUpdateEndpoints.PUT("/visits", h.UpdateVisits)
		statUpdateEndpoints.PUT("/visits/unique", h.UpdateUniqueVisits)
		statUpdateEndpoints.PUT("/projects/:id", h.UpdateProjectsStat)
		statUpdateEndpoints.PUT("/clicks/:id", h.UpdateCLicsStat)
	}
}

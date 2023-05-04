package http

import (
	"github.com/gin-gonic/gin"
	"nik19ta/backend/services/stat"

	middlewareAuth "nik19ta/backend/pkg/middleware/auth"
)

func RegisterHTTPEndpoints(router *gin.Engine, uc stat.UseCase) {
	h := NewHandler(uc)

	statEndpoints := router.Group("/api/stat")
	statEndpoints.Use(middlewareAuth.JwtAuthMiddleware())
	{
		statEndpoints.GET("/clicks", h.GetCliksStat)
		statEndpoints.GET("/projects", h.GetProjectStat)
		statEndpoints.GET("/visits", h.GetVisits)
	}

	statUpdateEndpoints := router.Group("/api/stat/update")
	{
		statUpdateEndpoints.PUT("/visit", h.SetVisit)
		statUpdateEndpoints.PUT("/visit/extend", h.VisitExtend)
		statUpdateEndpoints.PUT("/projects/:id", h.UpdateProjectsStat)
	}
}

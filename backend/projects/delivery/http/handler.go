package http

import (
	"net/http"
	Projects "nik19ta/backend/projects"

	gin "github.com/gin-gonic/gin"
)

type Handler struct {
	useCase Projects.UseCase
}

func NewHandler(useCase Projects.UseCase) *Handler {
	return &Handler{
		useCase: useCase,
	}
}

func (h *Handler) GetProjects(c *gin.Context) {
	lang := c.Query("lang")

	projects, err := h.useCase.GetProjects(lang)

	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": projects})
}

func (h *Handler) GetProject(c *gin.Context) {
	lang := c.Query("lang")
	id := c.Param("id")

	projects, err := h.useCase.GetProject(lang, id)

	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": projects})
}

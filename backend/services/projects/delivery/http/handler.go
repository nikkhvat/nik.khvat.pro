package http

import (
	"net/http"
	projects "nik19ta/backend/services/projects"

	gin "github.com/gin-gonic/gin"
)

type Handler struct {
	useCase projects.UseCase
}

func NewHandler(useCase projects.UseCase) *Handler {
	return &Handler{
		useCase: useCase,
	}
}

// GetProjects @Summary Get list  Projects
// @Description Get list Projects
// @Tags Projects
// @Accept json
// @Produce json
// @Success 200 {object} projects.ProjectsResp
// @Failure 400
// @Router /api/projects [get]
func (h *Handler) GetProjects(c *gin.Context) {
	lang := c.Query("lang")

	projects, err := h.useCase.GetProjects(lang)

	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": projects})
}

// GetProject @Summary Get information about the project by id
// @Description Get information about the project by its ID and language, if specified
// @Tags Projects
// @Accept  json
// @Produce  json
// @Param id path string true "project ID"
// @Param lang query string false "Project language (English by default)"
// @Success 200 {object} projects.ProjectResponse
// @Failure 400
// @Failure 404
// @Router /api/projects/{id} [get]
func (h *Handler) GetProject(c *gin.Context) {
	lang := c.Query("lang")
	id := c.Param("id")

	project, err := h.useCase.GetProject(lang, id)

	if err != nil {
		if err == projects.CouldNotFindProject {
			c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
			return
		}

		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, project)
}

// GetCategories @Summary Get all project categories
// @Description get all project categories
// @Tags Projects
// @Accept  json
// @Produce  json
// @Param lang query string false "language (English by default)"
// @Success 200 {object} []projects.Category
// @Failure 400
// @Failure 404
// @Router /api/categories [get]
func (h *Handler) GetCategories(c *gin.Context) {
	categories, err := h.useCase.GetCategories()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}

	c.JSON(http.StatusOK, categories)
}

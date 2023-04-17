package http

import (
	"net/http"
	"nik19ta/backend/models"
	stat "nik19ta/backend/stat"

	gin "github.com/gin-gonic/gin"
)

type Handler struct {
	useCase stat.UseCase
}

func NewHandler(useCase stat.UseCase) *Handler {
	return &Handler{
		useCase: useCase,
	}
}

func (h *Handler) GetVisits(c *gin.Context) {
	visits, err := h.useCase.GetVisits()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}

	c.JSON(200, gin.H{"data": visits})
}

func (h *Handler) GetUniqueVisits(c *gin.Context) {
	visits, err := h.useCase.GetUniqueVisits()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}

	c.JSON(200, gin.H{"data": visits})
}

func (h *Handler) GetCliksStat(c *gin.Context) {
	clicks, err := h.useCase.GetCliksStat()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}

	c.JSON(200, gin.H{"data": clicks})
}

func (h *Handler) GetProjectStat(c *gin.Context) {
	statsProjects, err := h.useCase.GetProjectStat()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}

	c.JSON(200, gin.H{"data": statsProjects})
}

func (h *Handler) UpdateVisits(c *gin.Context) {
	err := h.useCase.AddVisit(c.ClientIP())

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}
	c.Status(200)
}

func (h *Handler) UpdateUniqueVisits(c *gin.Context) {
	err := h.useCase.AddUniqueVisit(c.ClientIP())

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}
	c.Status(200)
}

func (h *Handler) UpdateProjectsStat(c *gin.Context) {
	var project models.StatUpdateParam
	if err := c.ShouldBindUri(&project); err != nil {
		c.JSON(400, gin.H{"message": "not uuid"})
		return
	}

	updateErr := h.useCase.AddProjectVisit(project.ID)

	if updateErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": updateErr.Error()})
	}

	c.Status(200)
}

func (h *Handler) UpdateCLicsStat(c *gin.Context) {
	var button models.StatUpdateParamButtons
	if err := c.ShouldBindUri(&button); err != nil {
		c.JSON(400, gin.H{"message": "not uuid"})
		return
	}

	updateErr := h.useCase.AddClikc(button.ID)

	if updateErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": updateErr.Error()})
	}

	c.Status(200)
}

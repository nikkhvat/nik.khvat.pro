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

func (h *Handler) GetCliksStat(c *gin.Context) {
	clicks, err := h.useCase.GetCliksStat()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(200, gin.H{"data": clicks})
}

func (h *Handler) GetProjectStat(c *gin.Context) {
	statsProjects, err := h.useCase.GetProjectStat()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(200, gin.H{"data": statsProjects})
}

func (h *Handler) VisitExtend(c *gin.Context) {
	session := c.DefaultQuery("session", "")

	err := h.useCase.VisitExtend(session)

	if err != nil {
		c.JSON(400, gin.H{"error": "something went wrong"})
		return
	}

	c.JSON(200, gin.H{"message": "successfully"})
}

func (h *Handler) GetVisits(c *gin.Context) {
	data, err := h.useCase.GetVisits()

	if err != nil {
		c.JSON(400, gin.H{"error": "something went wrong"})
		return
	}

	c.JSON(200, gin.H{"data": data})
}

func (h *Handler) SetVisit(c *gin.Context) {
	un := c.DefaultQuery("un", "0")
	utm := c.DefaultQuery("utm", "")

	unique := un == "1"

	userAgent := c.Request.Header.Get("User-Agent")
	session, err := h.useCase.AddVisit(c.ClientIP(), userAgent, utm, unique)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(200, gin.H{"session": session})
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
		return
	}

	c.Status(200)
}

func (h *Handler) UpdateCLicksStat(c *gin.Context) {
	var button models.StatUpdateParamButtons
	if err := c.ShouldBindUri(&button); err != nil {
		c.JSON(400, gin.H{"message": "not uuid"})
		return
	}

	updateErr := h.useCase.AddClikc(button.ID)

	if updateErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": updateErr.Error()})
		return
	}

	c.Status(200)
}

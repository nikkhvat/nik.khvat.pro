package http

import (
	"net/http"
	stat "nik19ta/backend/services/stat"

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

// GetProjectStat @Summary Get project statistics
// @Description Get project visits by day in 30 days
// @Tags Stat
// @Accept json
// @Produce json
// @Success 200 {object} map[string][]stat.ProjectsStats
// @Router /api/stat/projects [get]
func (h *Handler) GetProjectStat(c *gin.Context) {
	statsProjects, err := h.useCase.GetProjectStat()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(200, gin.H{"data": statsProjects})
}

// GetVisits @Summary Get session statistics
// @Description Get information about site visits, including the number of visits, unique visits, top countries, top browsers and top OS
// @Tags Stat
// @Accept json
// @Produce json
// @Success 200 {object} stat.VisitsResponse
// @Router /api/stat/visits [get]
func (h *Handler) GetVisits(c *gin.Context) {
	data, err := h.useCase.GetVisits()

	if err != nil {
		c.JSON(400, gin.H{"error": "something went wrong"})
		return
	}

	c.JSON(200, gin.H{"data": data})
}

// VisitExtend @Summary Extending the time spent on the site
// @Description Extends the time spent on the site by session ID
// @Tags Stat
// @Accept json
// @Produce json
// @Param session query string true "Session ID"
// @Success 200
// @Failure 400
// @Router /api/stat/updatevisit/extend [put]
func (h *Handler) VisitExtend(c *gin.Context) {
	session := c.DefaultQuery("session", "")

	err := h.useCase.VisitExtend(session)

	if err != nil {
		c.JSON(400, gin.H{"error": "something went wrong"})
		return
	}

	c.JSON(200, gin.H{"message": "successfully"})
}

// SetVisit @Summary add a visit
// @Description add a visit to the site, gets the IP, country, time of entry and uniqueness of the visit
// @Tags Stat
// @Accept json
// @Produce json
// @Param un query int true "Unique visit or not (0 - not unique, 1 - unique)"
// @Param utm query string false "UTM tag ID (optional parameter)"
// @Success 200 {object} stat.SessionResponse "Successful registration of the session and return of the session ID"
// @Failure 400
// @Router /api/stat/update/visit [put]
func (h *Handler) SetVisit(c *gin.Context) {
	un := c.DefaultQuery("un", "0")
	utm := c.DefaultQuery("utm", "")

	unique := un == "1"

	httpReferer := c.Request.Header.Get("Referrer")
	if httpReferer == "" {
		httpReferer = ""
	}

	userAgent := c.Request.Header.Get("User-Agent")
	session, err := h.useCase.AddVisit(c.ClientIP(), userAgent, utm, httpReferer, unique)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(200, stat.SessionResponse{Session: session})
}

// UpdateProjectsStat @Summary Updating the statistics of visits to the project
// @Description Increments the number of project visits by 1 for the current day
// @Tags Stat
// @Accept json
// @Produce json
// @Param uuid path string true "project id"
// @Success 200 "Successful statistics update"
// @Router /api/stat/update/projects/{uuid} [put]
func (h *Handler) UpdateProjectsStat(c *gin.Context) {
	var project stat.StatUpdateParam
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

// GetLinks @Summary Get links statistics
// @Description Get links statistics
// @Tags Stat
// @Accept json
// @Produce json
// @Success 200 {object} []links.Link
// @Router /api/stat/links [get]
func (h *Handler) GetLinks(c *gin.Context) {
	data, err := h.useCase.GetLinks()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(200, stat.ResponseLinks{Data: data})
}

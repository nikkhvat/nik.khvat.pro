package http

import (
	"log"
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
// @Param url query string false "URL Page"
// @Param title query string false "Title Page"
// @Param session query string false "Session (if user yet visited website)"
// @Success 200 {object} stat.SessionResponse "Successful registration of the session and return of the session ID"
// @Failure 400
// @Router /api/stat/update/visit [put]
func (h *Handler) SetVisit(c *gin.Context) {
	un := c.DefaultQuery("un", "0")
	utm := c.DefaultQuery("utm", "")
	url := c.DefaultQuery("url", "/")
	title := c.DefaultQuery("title", "untitled")
	session := c.DefaultQuery("session", "")

	unique := un == "1"

	log.Println(c.Request.Header)
	httpReferer := c.Request.Header.Get("Referer")
	if httpReferer == "" {
		httpReferer = ""
	}

	userAgent := c.Request.Header.Get("User-Agent")
	session, err := h.useCase.AddVisit(c.ClientIP(), userAgent, utm, httpReferer, url, title, session, unique)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(200, stat.SessionResponse{Session: session})
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

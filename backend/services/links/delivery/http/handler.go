package http

import (
	"github.com/gin-gonic/gin"
	"net/http"
	links "nik19ta/backend/services/links"
)

type Handler struct {
	useCase links.UseCase
}

func NewHandler(useCase links.UseCase) *Handler {
	return &Handler{
		useCase: useCase,
	}
}

// ToLink @Summary redirect
// @Description Link redirect ( for stat )
// @Tags Links
// @Param link query string true "the link to which the redirect will be made"
// @Param page query string true "the page from which the link was clicked"
// @Success 200
// @Router /api/links/to [get]
func (h *Handler) ToLink(c *gin.Context) {
	page := c.DefaultQuery("page", "")
	link := c.DefaultQuery("link", "")

	_ = h.useCase.ToLink(link, page)

	c.Redirect(http.StatusFound, link)
}

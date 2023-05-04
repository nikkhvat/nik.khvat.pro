package http

import (
	"net/http"
	auth "nik19ta/backend/auth"

	"nik19ta/backend/models"

	gin "github.com/gin-gonic/gin"
)

type Handler struct {
	useCase auth.UseCase
}

func NewHandler(useCase auth.UseCase) *Handler {
	return &Handler{
		useCase: useCase,
	}
}

// @Summary Sign Up
// @Description Log in to the admin panel, get a token
// @Tags Auth
// @Accept json
// @Produce json
// @Success 200 {object} models.SingUpResp
// @Failure 400
// @Failure 401
// @Router /api/auth/sign-in [post]
func (h *Handler) SignIn(c *gin.Context) {
	inp := new(models.SignIn)

	if err := c.BindJSON(inp); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	token, err := h.useCase.SignIn(inp.Mail, inp.Password)

	if err != nil {
		if err == auth.ErrUserNotFound {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	c.JSON(http.StatusOK, models.SingUpResp{Token: *token})
}

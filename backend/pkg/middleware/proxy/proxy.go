package proxy

import "github.com/gin-gonic/gin"

func ProxyHeaders() gin.HandlerFunc {
	return func(c *gin.Context) {
		if clientIP := c.GetHeader("X-Forwarded-For"); clientIP != "" {
			c.Request.RemoteAddr = clientIP
		} else if clientIP := c.GetHeader("X-Real-IP"); clientIP != "" {
			c.Request.RemoteAddr = clientIP
		}
		c.Next()
	}
}

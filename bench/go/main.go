package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.New()

	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Cache-Control", "no-store")
		c.Next()
	})

	hello := func(c *gin.Context) {
		c.String(http.StatusOK, "hello world")
	}
	r.GET("/", hello)
	r.GET("/go", hello)

	r.Run(":3000")
}

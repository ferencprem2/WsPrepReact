package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/lonelymous/godab"
)

var Port string = ":4000"

func Middleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Header("Access-Control-Allow-Origin", "*")
		ctx.Header("Access-Control-Allow-Credentials", "true")
		ctx.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		ctx.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

		if ctx.Request.Method == "OPTIONS" {
			ctx.AbortWithStatus(204)
			return
		}
		ctx.Next()
	}
}

func main() {
	router := gin.New()
	err := godab.OpenConnection(&godab.DatabaseConfig{Driver: "mysql", Name: "SessionOne", Username: "root", Password: "qweasd"})
	if err != nil {
		log.Fatal(err.Error())
	}
	defer godab.CloseConnection()
	// router.POST("/login", LoginHandler)
	// router.GET("/routes", RouteHandler)

	router.Use(Middleware())

	router.Handle("POST", "/login", LoginHandler)
	router.Handle("GET", "/routes", RouteHandler)

	router.Run(Port)
}

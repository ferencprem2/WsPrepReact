package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserLoginDatas struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type RunnerInfos struct {
	Id               int     `json:"id"`
	Distance         float32 `json:"distance"`
	StartingLocation string  `json:"startinglocation"`
	ArrivalLocation  string  `json:"arrivallocation"`
	RoutePartName    *string `json:"routepartname"`
}

func LoginHandler(ctx *gin.Context) {
	var requestBody UserLoginDatas

	if err := ctx.BindJSON(&requestBody); err != nil {
		fmt.Println(err.Error())
	}

	if !(requestBody.Username == "admin" && requestBody.Password == "S3cr3t") {
		ctx.String(401, "Incorrect username or password")
	}
	ctx.String(204, " ")
}

func RouteHandler(ctx *gin.Context) {
	var responseBody = []RunnerInfos{}
	responseBody = GetRunnerInfos()
	ctx.IndentedJSON(http.StatusOK, &responseBody)
}

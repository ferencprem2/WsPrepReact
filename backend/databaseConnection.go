package main

import (
	"log"

	"github.com/lonelymous/godab"
)

func GetRunnerInfos() []RunnerInfos {
	result := make([]RunnerInfos, 0)

	rows, err := godab.Query("SELECT * FROM ROUTES")
	if err != nil {
		log.Fatal(err.Error())
	}
	defer rows.Close()

	var item RunnerInfos
	for rows.Next() {
		rows.Scan(&item.Id, &item.Distance, &item.StartingLocation, &item.ArrivalLocation, &item.RoutePartName)
		result = append(result, item)
	}
	return result
}

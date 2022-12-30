package main

import (
	"log"
	"nik19ta/backend/pkg/config"
	"nik19ta/backend/server"
)

func main() {
	conf := config.GetConfig()

	app := server.NewApp()

	if err := app.Run(conf.Port); err != nil {
		log.Fatalf("%s", err.Error())
	}
}

package config

import (
	"log"

	"sync"

	"github.com/joho/godotenv"
)

var once sync.Once

type Config struct {
	Port             string `json:"PORT"`
	PostgresHost     string `json:"POSTGRES_HOST"`
	PostgresUser     string `json:"POSTGRES_USER"`
	PostgresPassword string `json:"POSTGRES_PASSWORD"`
	PostgresDbname   string `json:"POSTGRES_DBNAME"`
	PostgresPort     string `json:"POSTGRES_PORT"`
	PostgresSSLMode  string `json:"POSTGRES_SSLMODE"`
	PostgresTimezone string `json:"POSTGRES_TIMEZONE"`
	JwtSecret        string `json:"JWT_SECRET"`
	IpDataBasePath   string `json:"IP_DATABASE"`
}

var config Config

func initConfig() map[string]string {
	var err error
	envs, err := godotenv.Read(".env")

	if err != nil {
		log.Panic(err)
	}

	return envs
}

func GetConfig() Config {
	onceBody := func() {
		envs := initConfig()

		config = Config{
			Port:             envs["PORT"],
			PostgresHost:     envs["POSTGRES_HOST"],
			PostgresUser:     envs["POSTGRES_USER"],
			PostgresPassword: envs["POSTGRES_PASSWORD"],
			PostgresDbname:   envs["POSTGRES_DBNAME"],
			PostgresPort:     envs["POSTGRES_PORT"],
			PostgresSSLMode:  envs["POSTGRES_SSLMODE"],
			PostgresTimezone: envs["POSTGRES_TIMEZONE"],
			JwtSecret:        envs["JWT_SECRET"],
			IpDataBasePath:   envs["IP_DATABASE"],
		}
	}

	once.Do(onceBody)

	return config
}

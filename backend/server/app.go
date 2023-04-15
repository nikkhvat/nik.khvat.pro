package server

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	database "nik19ta/backend/pkg/database"
	middlewareCors "nik19ta/backend/pkg/middleware/cors"

	gin "github.com/gin-gonic/gin"

	stat "nik19ta/backend/stat"
	statHttp "nik19ta/backend/stat/delivery/http"
	statPostgres "nik19ta/backend/stat/repository/postgres"
	statUseCase "nik19ta/backend/stat/usecase"

	auth "nik19ta/backend/auth"
	authHttp "nik19ta/backend/auth/delivery/http"
	authPostgres "nik19ta/backend/auth/repository/postgres"
	authUseCase "nik19ta/backend/auth/usecase"

	projects "nik19ta/backend/projects"
	projectsHttp "nik19ta/backend/projects/delivery/http"
	projectsPostgres "nik19ta/backend/projects/repository/postgres"
	projectsUseCase "nik19ta/backend/projects/usecase"
)

type App struct {
	httpServer *http.Server

	statsUC    stat.UseCase
	authUC     auth.UseCase
	projectsUC projects.UseCase
}

func NewApp() *App {
	db := database.InitDB()

	statsRepo := statPostgres.NewUserRepository(db)
	authRepo := authPostgres.NewUserRepository(db)
	projectsRepo := projectsPostgres.NewUserRepository(db)

	return &App{
		statsUC:    statUseCase.NewStatUseCase(statsRepo),
		authUC:     authUseCase.NewAuthUseCase(authRepo),
		projectsUC: projectsUseCase.NewProjectsUseCase(projectsRepo),
	}
}

func (a *App) Run(port string) error {
	router := gin.Default()

	router.Static("/images", "./images/portfolio")

	router.Use(
		gin.Recovery(),
		gin.Logger(),
	)

	router.Use(middlewareCors.CORSMiddleware())

	statHttp.RegisterHTTPEndpoints(router, a.statsUC)
	authHttp.RegisterHTTPEndpoints(router, a.authUC)
	projectsHttp.RegisterHTTPEndpoints(router, a.projectsUC)

	a.httpServer = &http.Server{
		Addr:           ":" + port,
		Handler:        router,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	go func() {
		if err := a.httpServer.ListenAndServe(); err != nil {
			log.Fatalf("Failed to listen and serve: %+v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, os.Interrupt)

	<-quit

	ctx, shutdown := context.WithTimeout(context.Background(), 5*time.Second)
	defer shutdown()

	return a.httpServer.Shutdown(ctx)
}

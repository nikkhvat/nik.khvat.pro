package server

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	database "nik19ta/backend/pkg/database"
	middleware "nik19ta/backend/pkg/middleware"

	gin "github.com/gin-gonic/gin"

	statistics "nik19ta/backend/statistics"
	statisticshttp "nik19ta/backend/statistics/delivery/http"
	statisticspostgres "nik19ta/backend/statistics/repository/postgres"
	statisticsusecase "nik19ta/backend/statistics/usecase"

	auth "nik19ta/backend/auth"
	authhttp "nik19ta/backend/auth/delivery/http"
	authpostgres "nik19ta/backend/auth/repository/postgres"
	authusecase "nik19ta/backend/auth/usecase"

	projects "nik19ta/backend/projects"
	projectshttp "nik19ta/backend/projects/delivery/http"
	projectspostgres "nik19ta/backend/projects/repository/postgres"
	projectsusecase "nik19ta/backend/projects/usecase"
)

type App struct {
	httpServer *http.Server

	statisticsUC statistics.UseCase
	authUC       auth.UseCase
	projectsUC   projects.UseCase
}

func NewApp() *App {
	db := database.InitDB()

	statisticsRepo := statisticspostgres.NewUserRepository(db)
	authRepo := authpostgres.NewUserRepository(db)
	projectsRepo := projectspostgres.NewUserRepository(db)

	return &App{
		statisticsUC: statisticsusecase.NewAuthUseCase(statisticsRepo),
		authUC:       authusecase.NewAuthUseCase(authRepo),
		projectsUC:   projectsusecase.NewProjectsUseCase(projectsRepo),
	}
}

func (a *App) Run(port string) error {
	router := gin.Default()

	router.Static("/images", "./images")

	router.Use(
		gin.Recovery(),
		gin.Logger(),
	)

	router.Use(middleware.CORSMiddleware())

	statisticshttp.RegisterHTTPEndpoints(router, a.statisticsUC)
	authhttp.RegisterHTTPEndpoints(router, a.authUC)
	projectshttp.RegisterHTTPEndpoints(router, a.projectsUC)

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

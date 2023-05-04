package server

import (
	"context"
	"log"
	"net/http"
	middlewareCors "nik19ta/backend/pkg/middleware/cors"
	"nik19ta/backend/services/auth"
	authHttp "nik19ta/backend/services/auth/delivery/http"
	authPostgres "nik19ta/backend/services/auth/repository/postgres"
	authUseCase "nik19ta/backend/services/auth/usecase"
	"nik19ta/backend/services/links"
	linksHttp "nik19ta/backend/services/links/delivery/http"
	linksPostgres "nik19ta/backend/services/links/repository/postgres"
	linksUseCase "nik19ta/backend/services/links/usecase"
	"nik19ta/backend/services/projects"
	projectsHttp "nik19ta/backend/services/projects/delivery/http"
	projectsPostgres "nik19ta/backend/services/projects/repository/postgres"
	projectsUseCase "nik19ta/backend/services/projects/usecase"
	"nik19ta/backend/services/stat"
	statHttp "nik19ta/backend/services/stat/delivery/http"
	statPostgres "nik19ta/backend/services/stat/repository/postgres"
	statUseCase "nik19ta/backend/services/stat/usecase"

	"os"
	"os/signal"
	"time"

	gin "github.com/gin-gonic/gin"
	database "nik19ta/backend/pkg/database"

	docs "nik19ta/backend/docs"

	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type App struct {
	httpServer *http.Server

	statsUC    stat.UseCase
	authUC     auth.UseCase
	projectsUC projects.UseCase
	linksUC    links.UseCase
}

func NewApp() *App {
	db := database.InitDB()

	statsRepo := statPostgres.NewUserRepository(db)
	authRepo := authPostgres.NewUserRepository(db)
	projectsRepo := projectsPostgres.NewUserRepository(db)
	linksRepo := linksPostgres.NewLinksRepository(db)

	return &App{
		statsUC:    statUseCase.NewStatUseCase(statsRepo),
		authUC:     authUseCase.NewAuthUseCase(authRepo),
		projectsUC: projectsUseCase.NewProjectsUseCase(projectsRepo),
		linksUC:    linksUseCase.NewLinkUseCase(linksRepo),
	}
}

func (a *App) Run(port string) error {
	router := gin.Default()

	router.Static("/images", "./images/portfolio")
	router.Static("/icons", "./images/icons")
	router.Static("/files", "./images/files")

	router.Use(
		gin.Recovery(),
		gin.Logger(),
		middlewareCors.CORSMiddleware(),
	)

	statHttp.RegisterHTTPEndpoints(router, a.statsUC)
	authHttp.RegisterHTTPEndpoints(router, a.authUC)
	projectsHttp.RegisterHTTPEndpoints(router, a.projectsUC)
	linksHttp.RegisterHTTPEndpoints(router, a.linksUC)

	// * Swagger
	docs.SwaggerInfo.BasePath = "/"

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

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

# Makefile

build: # build server
	go build -o ./backend/.bin/app ./backend/cmd/api/main.go

start: # start server
	./backend/.bin/app

dev: # build and start server
	go build -o ./backend/.bin/app ./backend/cmd/api/main.go
	./backend/.bin/app

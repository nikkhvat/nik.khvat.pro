# Makefile

prepare_env:
	cp -r .env.dev .env

build: # build server
	go build -o ./backend/.bin/app ./backend/cmd/api/main.go

start: # start server
	./backend/.bin/app

dev: # build and start server
	go build -o ./backend/.bin/app ./backend/cmd/api/main.go
	./backend/.bin/app

image:
	rm -rf ./scripts/out
	python3.11 ./scripts/image.py
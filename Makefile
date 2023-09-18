start:
	docker-compose up --build -d

stop:
	docker-compose stop nikkhvat_front
	docker-compose rm -f nikkhvat_front



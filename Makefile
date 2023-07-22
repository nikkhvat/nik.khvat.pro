start:
	docker-compose up --build -d

stop:
	docker-compose stop nik19ta_front
	docker-compose rm -f nik19ta_front



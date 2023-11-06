.PHONY: app-reservation app-auth app-payment app-notification

app-reservation:	
	docker build -t sleeper:reservation -f ./apps/reservations/Dockerfile .

app-auth:
	docker build -t sleeper:auth ./apps/auth

app-payment:
	docker build -t sleeper:payment ./apps/payment

app-notification:
	docker build -t sleeper:notification ./apps/notification

FROM golang:1.25-alpine AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY main.go ./
RUN CGO_ENABLED=0 go build -o bench-go .

FROM alpine:3.20
WORKDIR /app
COPY --from=build /app/bench-go ./
RUN adduser -D -H app
USER app
EXPOSE 3000
CMD ["./bench-go"]

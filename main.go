package main

import (
	"github.com/pgrunde/gsap-talk/server"
	"log"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	environment := os.Getenv("ENVIRONMENT")

	if port == "" {
		log.Fatal("$PORT must be set")
	}
	config := server.Config{
		Port:           port,
		AssetDirectory: "dist",
		Environment:    environment,
	}
	log.Panic(server.New(config).ListenAndServe())
}

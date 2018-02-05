package server

import (
	"fmt"
	"log"
	"net/http"
)

type Server struct {
	Config Config
}

func New(c Config) *Server {
	s := &Server{Config: c}
	// File Server
	fileDirectory := fmt.Sprintf("./%s", c.AssetDirectory)
	fileHandlePath := fmt.Sprintf("/%s/", c.AssetDirectory)
	fs := http.FileServer(http.Dir(fileDirectory))
	http.Handle(
		fileHandlePath, http.StripPrefix(fileHandlePath, fs),
	)

	// Routes
	http.HandleFunc("/", s.root)
	http.HandleFunc("/favicon.ico", favicon)
	// http.HandleFunc("/favicon.ico", favicon)

	return s
}

func (s *Server) ListenAndServe() error {
	log.Printf(
		"Starting server on port (%s)",
		s.Config.Port,
	)
	return http.ListenAndServe(
		fmt.Sprintf(":%s", s.Config.Port),
		nil,
	)
}

func (s *Server) Environment() string {
	return s.Config.Environment
}

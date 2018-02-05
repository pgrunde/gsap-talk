package server

import (
	"html/template"
	"net/http"
)

func (s *Server) root(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "text/html; charset=utf-8")
	t, _ := template.ParseFiles("templates/root.html")
	attrs := struct {
		Production bool
	}{
		Production: s.Environment() == "production",
	}
	t.Execute(w, attrs)
	return
}

func favicon(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./favicon.ico")
}

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Article struct {
	Title   string `json:"Title"`
	Desc    string `json:"desc"`
	Content string `json:"content"`
}

type Articles []Article

func allArticles(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit: All Articles Endpoint")
	articles := Articles{
		Article{Title: "Test title", Desc: "Test Desc", Content: "Hello World"},
	}

	json.NewEncoder(w).Encode(articles)
}

func testPostArticles(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit: Post Article Endpoint.")
	fmt.Fprintf(w, "Post articles Endpoint Hit")
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit: Home Endpoint.")
	http.ServeFile(w, r, "./templates/index.html")
}

func handleRequests() {

	myRouter := mux.NewRouter()

	myRouter.HandleFunc("/articles", allArticles).Methods("GET")
	myRouter.HandleFunc("/articles", testPostArticles).Methods("POST")
	myRouter.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))

	fmt.Println("Serving home page. 8081")
	log.Fatal(http.ListenAndServe(":8081", myRouter))
}

func main() {
	handleRequests()
}

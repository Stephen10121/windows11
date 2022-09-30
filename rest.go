package main

import (
	"fmt"
	"log"
	"net/http"

	socketio "github.com/googollee/go-socket.io"
	"github.com/googollee/go-socket.io/engineio"
	"github.com/googollee/go-socket.io/engineio/transport"
	"github.com/googollee/go-socket.io/engineio/transport/polling"
	"github.com/googollee/go-socket.io/engineio/transport/websocket"
	"github.com/gorilla/mux"
)

func test(w http.ResponseWriter, r *http.Request) {
	fmt.Println("hello")
	fmt.Fprint(w, "hello there")
}

var allowOriginFunc = func(r *http.Request) bool {
	return true
}

func handleRequests() {
	myRouter := mux.NewRouter()
	server := socketio.NewServer(&engineio.Options{
		Transports: []transport.Transport{
			&polling.Transport{
				CheckOrigin: allowOriginFunc,
			},
			&websocket.Transport{
				CheckOrigin: allowOriginFunc,
			},
		},
	})

	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		fmt.Println("connected:", s.ID())
		return nil
	})

	server.OnEvent("/", "test", func(s socketio.Conn, msg string) {
		log.Println("test:", msg)
		s.Emit("test", "test "+msg)
	})

	server.OnError("/", func(s socketio.Conn, e error) {
		log.Println("meet error:", e)
	})

	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		log.Println("closed", reason)
	})

	// go func() {
	// 	fmt.Println("Attempting to run socket server.")
	// 	if err := server.Serve(); err != nil {
	// 		fmt.Println("Something wrong.")
	// 		log.Fatalf("socketio listen error: %s\n", err)
	// 	} else {
	// 		fmt.Println("Socket Server running.")
	// 	}
	// }()
	// defer server.Close()

	myRouter.HandleFunc("/test", test).Methods("GET")
	myRouter.Handle("/socket.io/", server)
	myRouter.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))

	fmt.Println("Serving home page. 8081")
	log.Fatal(http.ListenAndServe(":8081", myRouter))
}

func main() {
	handleRequests()
}

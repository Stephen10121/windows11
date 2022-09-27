package main

import "fmt"

func main() {
	looper := 0
	for looper != 1000 {
		looper += 1
		fmt.Print("Hi Mom! ")
		fmt.Println(looper)
	}
}

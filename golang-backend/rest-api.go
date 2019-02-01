package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"

	handlers "simple-rest-api/handlers"
	models "simple-rest-api/models"
)

func loggerMw(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.Method + " " + r.RequestURI)
		next.ServeHTTP(w, r)
	})
}
func jsonEncodeMw(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}

func main() {
	models.InitData()

	// log.Println(models.OrderList)
	// models.OrderList[0].Items = append(models.OrderList[0].Items, models.OrderItemMap{ID: 1, ItemID: 1, Quantity: 20})

	// log.Println(models.OrderList)
	// models.OrderList[0].Items[1].Quantity = 10000
	// log.Println(models.OrderList)

	r := mux.NewRouter()
	r.Use(loggerMw)
	r.Use(jsonEncodeMw)

	r.HandleFunc("/items", handlers.GetItems).Methods("GET")
	r.HandleFunc("/items/{id}", handlers.GetItem).Methods("GET")
	r.HandleFunc("/items", handlers.CreateItem).Methods("POST")

	r.HandleFunc("/orders", handlers.GetAllOrders).Methods("GET")
	r.HandleFunc("/orders/{id}", handlers.GetOrder).Methods("GET")
	r.HandleFunc("/orders", handlers.CreateOrder).Methods("POST")

	r.HandleFunc("/orders/add-item/{orderId}", handlers.AddItemToOrder).Methods("PUT")
	r.HandleFunc("/orders/change-status/{orderId}", handlers.ChangeOrderStatus).Methods("PUT")
	r.HandleFunc("/orders/{orderId}/delete-item/{itemId}", handlers.DeleteItemFromOrder).Methods("DELETE")

	r.HandleFunc("/users/login", handlers.MockLogin).Methods("POST")
	r.HandleFunc("/users/check-token", handlers.CheckAuth).Methods("GET")

	log.Fatal(http.ListenAndServe(":4000", r))
}

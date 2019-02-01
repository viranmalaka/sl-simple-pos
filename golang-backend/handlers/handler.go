package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"

	models "simple-rest-api/models"
)

func errorResponse(msg string, w http.ResponseWriter, code int) {
	type error struct {
		Message string `json:"message"`
	}
	type body struct {
		Error error `json:"error"`
	}

	res := body{Error: error{Message: msg}}

	w.WriteHeader(code)
	json.NewEncoder(w).Encode(res)

}

// GetItems will send all the items in the data set
func GetItems(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(models.ItemList)
}

// GetItem will send one object that having the id
func GetItem(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, err := strconv.ParseInt(params["id"], 10, 64)

	if err != nil {
		errorResponse("Id parse failed", w, 500)
		return
	}
	for _, item := range models.ItemList {
		if int64(item.ItemID) == id {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	errorResponse("Invalid ID", w, 500)
}

// CreateItem will create and item
func CreateItem(w http.ResponseWriter, r *http.Request) {
	var newItem models.Item
	_ = json.NewDecoder(r.Body).Decode(&newItem)
	newItem.ItemID = models.GetNewObjectId("item")
	newItem.ID = newItem.ItemID
	models.ItemList = append(models.ItemList, newItem)
	json.NewEncoder(w).Encode(newItem)
}

// GetAllOrders will return all the orders
func GetAllOrders(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(models.OrderList)
}

// GetOrder will return one order that has the given id
func GetOrder(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, err := strconv.ParseInt(params["id"], 10, 64)
	if err != nil {
		errorResponse("Id parse failed", w, 500)
		return
	}
	for _, order := range models.OrderList {
		if int64(order.OrderID) == id {
			json.NewEncoder(w).Encode(order)
			return
		}
	}
	errorResponse("Invalid Id", w, 500)
}

// CreateOrder will create an order
func CreateOrder(w http.ResponseWriter, r *http.Request) {
	var newOrder models.Order
	_ = json.NewDecoder(r.Body).Decode(&newOrder)
	newOrder.OrderID = models.GetNewObjectId("order")
	newOrder.ID = newOrder.OrderID
	newOrder.Items = []models.OrderItemMap{}
	models.OrderList = append(models.OrderList, newOrder)
	json.NewEncoder(w).Encode(newOrder)
}

// AddItemToOrder will add new item to the given order
func AddItemToOrder(w http.ResponseWriter, r *http.Request) {
	type requestBodyStruct struct {
		ItemID   int     `json:"itemId"`
		Quantity float64 `json:"quantity"`
	}

	params := mux.Vars(r)
	id, err := strconv.ParseInt(params["orderId"], 10, 64)
	if err != nil {
		errorResponse("Id parse failed", w, 500)
		return
	}
	for odrID, order := range models.OrderList {
		if int64(order.OrderID) == id {
			// order found
			decoder := json.NewDecoder(r.Body)
			var t requestBodyStruct
			err := decoder.Decode(&t)
			if err != nil {
				panic(err)
			}

			for itmID, item := range order.Items { // check the item is already in the order
				if item.ItemID == t.ItemID {
					models.OrderList[odrID].Items[itmID].Quantity = t.Quantity
					json.NewEncoder(w).Encode(models.OrderList[odrID]) // update the qty
					return
				}
			}

			// item is not in the order
			models.OrderList[odrID].Items = append(order.Items, models.OrderItemMap{ItemID: t.ItemID, Quantity: t.Quantity})
			json.NewEncoder(w).Encode(models.OrderList[odrID]) // update the qty
		}
	}
	// order not found
	errorResponse("Invalid Id", w, 500)
}

// ChangeOrderStatus will change the status
func ChangeOrderStatus(w http.ResponseWriter, r *http.Request) {
	type requestBodyStruct struct {
		Status string `json:"status"`
	}
	decoder := json.NewDecoder(r.Body)
	var t requestBodyStruct
	err := decoder.Decode(&t)
	if err != nil {
		panic(err)
	}

	params := mux.Vars(r)
	id, err := strconv.ParseInt(params["orderId"], 10, 64)
	if err != nil {
		errorResponse("Id parse failed", w, 500)
		return
	}
	for odrID, order := range models.OrderList {
		if int64(order.OrderID) == id {
			// order found
			models.OrderList[odrID].Status = t.Status
			json.NewEncoder(w).Encode(models.OrderList[odrID]) // update the qty
		}
	}
	// order not found
	errorResponse("Invalid Id", w, 500)
}

// DeleteItemFromOrder delete an item from order
func DeleteItemFromOrder(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	odrID, err1 := strconv.ParseInt(params["orderId"], 10, 64)
	itemID, err2 := strconv.ParseInt(params["itemId"], 10, 64)
	if err1 != nil && err2 != nil {
		errorResponse("Id parse failed", w, 500)
		return
	}
	for oIdx, order := range models.OrderList {
		if int64(order.OrderID) == odrID {
			// order found
			for iIdx, item := range order.Items {
				if int64(item.ItemID) == itemID {
					models.OrderList[oIdx].Items = append(order.Items[:iIdx], order.Items[iIdx+1:]...)
					json.NewEncoder(w).Encode(models.OrderList[oIdx])
					return
				}
			}
			errorResponse("No Item Found", w, 404)
			return
		}
	}
	errorResponse("No Order Found", w, 404)

}

// MockLogin create a token for you
func MockLogin(w http.ResponseWriter, r *http.Request) {
	type requestBodyStruct struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	type responseBodyStruct struct {
		Success bool   `json:"success"`
		Token   string `json:"token"`
	}

	var body requestBodyStruct
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		panic(err)
	}

	if body.Password == "test" && body.Username == "viranmalaka" {
		res := responseBodyStruct{
			Success: true,
			Token:   "this-is-secrete-token-from-go-lang",
		}
		json.NewEncoder(w).Encode(res)
	} else {
		errorResponse("Unauthorized", w, 401)
	}
}

// CheckAuth will return mock verification
func CheckAuth(w http.ResponseWriter, r *http.Request) {
	type responseBodyStruct struct {
		Test bool   `json:"test"`
		User string `json:"user"`
	}

	token := r.Header.Get("token")
	if token == "this-is-secrete-token-from-go-lang" {
		res := responseBodyStruct{
			Test: true,
			User: "Viran Malaka",
		}
		json.NewEncoder(w).Encode(res)
	} else {
		res := responseBodyStruct{
			Test: false,
			User: "",
		}
		json.NewEncoder(w).Encode(res)
	}
}

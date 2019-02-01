package models

var ItemList []Item
var OrderList []Order

var autoId = map[string]int{
	"item": 4,
	"order": 3,
}

func InitData() {
	ItemList = append(ItemList, Item{ID: 1, ItemID: 1, Name: "Mango", UnitPrice: 1.5, Description: "this is fruit"})
	ItemList = append(ItemList, Item{ID: 2, ItemID: 2, Name: "Banana", UnitPrice: 2, Description: "this is fruit"})
	ItemList = append(ItemList, Item{ID: 3, ItemID: 3, Name: "Apple", UnitPrice: 3.5, Description: "this is fruit"})
	ItemList = append(ItemList, Item{ID: 4, ItemID: 4, Name: "Orange", UnitPrice: 1, Description: "this is fruit"})

	OrderList = append(OrderList, Order{ID: 1, OrderID: 1, Status: "pending",
		Items: []OrderItemMap{
			OrderItemMap{ID: 1, ItemID: 1, Quantity: 3},
			OrderItemMap{ID: 2, ItemID: 2, Quantity: 1},
			OrderItemMap{ID: 3, ItemID: 4, Quantity: 2},
		}})
	OrderList = append(OrderList, Order{ID: 2, OrderID: 2, Status: "pending",
		Items: []OrderItemMap{
			OrderItemMap{ID: 1, ItemID: 4, Quantity: 3},
			OrderItemMap{ID: 2, ItemID: 2, Quantity: 1},
		}})
	OrderList = append(OrderList, Order{ID: 3, OrderID: 3, Status: "pending",
		Items: []OrderItemMap{
			OrderItemMap{ID: 1, ItemID: 4, Quantity: 10},
		}})
}

func GetNewObjectId(key string) int {
	x := autoId[key]
	autoId[key]++
	return x
}

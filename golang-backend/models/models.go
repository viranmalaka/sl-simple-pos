package models

type Item struct {
	ID          int     `json:"_id"`
	ItemID      int     `json:"itemId"`
	Name        string  `json:"name"`
	UnitPrice   float64 `json:"unitPrice"`
	Description string  `json:"description"`
}

type OrderItemMap struct {
	ID       int     `json:"_id"`
	ItemID   int     `json:"item"`
	Quantity float64 `json:"quantity"`
}

type Order struct {
	ID      int            `json:"_id"`
	OrderID int            `json:"orderId"`
	Items   []OrderItemMap `json:"items"`
	Status  string         `json:"status"`
}

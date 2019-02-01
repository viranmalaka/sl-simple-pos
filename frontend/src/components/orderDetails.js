import React from 'react';
import { getAllItems } from '../actions/itemAction'
import { getAllOrders, addItemToOrder, setCurrentOrder, deleteItemFromOrder, setOrderStatus } from '../actions/orderAction'

import { connect } from 'react-redux';
import { Button, Card, Header, Modal, Grid, Input, Segment, Divider } from 'semantic-ui-react'
import { toast } from 'react-toastify';

class OrderDetails extends React.Component {

  state = {
    forceDelete: {},
    addItemModal: false,
    modalOpen: false,
    quantityModal: false,
    selectedItem: '',
    selectedQty: 0
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleOpenQuantity = () => this.setState({ quantityModal: true })

  handleCloseQuantity = () => this.setState({ quantityModal: false })

  handleSelectItem = (id) => this.setState({ selectedItem: id })
  handleSelectQty = (qty) => this.setState({ selectedQty: qty })

  onRemoveItem(id) {
    this.props.deleteItemFromOrder(this.props.order.currentOrder._id, id, this.props.item.itemsById);
  }

  addItemToOrder(qty) {
    if (this.props.order.currentOrder.items.filter(x => x.item === this.state.selectedItem).length === 0) {  // if that items already not in the order     
      this.props.addItemToOrder(this.props.order.currentOrder._id, this.state.selectedItem, qty, this.props.item.itemsById).then(result => {
        this.handleCloseQuantity();
      });
    } else {  // if the item already exist then do nothing. close the modal
      this.handleCloseQuantity();
    }
  }

  onChangeQuantity(data, itemId) {
    if (data.value < 0) {
      this.setState({
        forceDelete: {
          [itemId]: true,
        }
      })
      toast.warn('Delete this item');
    } else {
      this.props.addItemToOrder(this.props.order.currentOrder._id, itemId, data.value === '' ? 0 : data.value, this.props.item.itemsById);
      this.setState({
        forceDelete: {
          [itemId]: false,
        }
      })
    }
  }

  componentWillMount() {
    this.props.getAllItems().then(() => {
      this.props.getAllOrders().then(() => {
        this.props.setCurrentOrder(this.props.match.params.id, this.props.item.itemsById);
      });
    });
  }

  setOrderStatus = () => {
    this.props.setOrderStatus(this.props.order.currentOrder._id, this.props.order.currentOrder.status === 'pending' ? 'success' : 'pending');
  }

  render() {
    let cOrder = this.props.order.currentOrder;
    const itemsHtml = () => {
      if (cOrder && cOrder.items) {
        return (
          cOrder.items.map((i, index) => {
            let item = this.props.item.itemsById[i.item];

            return (
              <Card fluid raised key={i._id}>
                <Card.Content >
                  <Grid>

                    <Grid.Column width="1">
                      <Button basic={!this.state.forceDelete[i.item]} size='mini' color='red' icon='remove'
                        onClick={(() => { this.onRemoveItem(i.item) })}></Button>
                    </Grid.Column>
                    <Grid.Column width="6">
                      <Card.Header><h3>{item.name}</h3></Card.Header>
                      <Card.Meta>
                        {item.description}
                      </Card.Meta>
                    </Grid.Column>
                    <Grid.Column width="5">
                      <Input label="Qty: " type="number" style={{ width: '100%' }} value={i.quantity}
                        onChange={((e, d) => { this.onChangeQuantity(d, i.item) })}></Input>
                      <br />
                      <span>Unit Price: ${item.unitPrice}</span>
                    </Grid.Column>
                    <Grid.Column width="4">
                      <h2 className="summery-number">{i.quantity ? '$' + i.quantity * item.unitPrice : ' - '}</h2>
                    </Grid.Column>
                  </Grid>

                </Card.Content>
              </Card>
            )
          })
        )
      }
    }

    return (
      <div>
        <Grid className="order-details-content">
          <Grid.Column width="10">
            <Segment>
              <Modal open={this.state.modalOpen} onClose={this.handleClose}
                trigger={<Button fluid color="green" onClick={this.handleOpen}>Add Item</Button>} basic size='large'>
                <Header icon='hand point up outline' content='Select An Item' />
                <Modal.Content>
                  <Card.Group itemsPerRow="4">
                    {
                      this.props.item.allItems.map(itm => {
                        return (
                          <Card key={itm._id} onClick={() => { this.handleSelectItem(itm._id); this.handleClose(); this.handleOpenQuantity() }}>
                            <Card.Content>
                              <Card.Header>{itm.name}</Card.Header>
                              <Card.Meta>Unit Price: ${itm.unitPrice}</Card.Meta>
                              <Card.Description>{itm.description}</Card.Description>
                            </Card.Content>
                          </Card>
                        )
                      })
                    }

                  </Card.Group>
                </Modal.Content>
              </Modal>

              <Modal open={this.state.quantityModal} onClose={this.handleCloseQuantity} basic size='large'>
                <Header icon='hand point up outline' content='Select the Quantity' />
                <Modal.Content>
                  <Card.Group itemsPerRow="3">
                    {
                      [1, 2, 3, 4, 5, 6, 8, 9, 10].map(qty => {
                        return (
                          <Card key={qty} onClick={() => { this.addItemToOrder(qty) }}>
                            <Card.Content>
                              <Card.Header className="qty-headers">{qty}</Card.Header>
                            </Card.Content>
                          </Card>
                        )
                      })
                    }
                    <Card>
                      <Card.Content>
                        {/* <Card.Header className="qty-headers">{qty}</Card.Header> */}
                        <Input action={{content:'OK', color: 'green', onClick: () => {this.addItemToOrder(this.state.selectedQty)} }} placeholder='Quantity' 
                        onChange={(e) => this.handleSelectQty(e.target.value)}></Input>
                      </Card.Content>
                    </Card>
                  </Card.Group>
                </Modal.Content>
              </Modal>

              {itemsHtml()}

            </Segment>
          </Grid.Column>
          <Grid.Column width="6">
            <Segment>
              <h3>Item Count: <span className="summery-number">{cOrder && cOrder.items.length}</span></h3>
              <h4>Total Quantity: <span className="summery-number">{cOrder && cOrder.totQty}</span></h4>
              <Divider />
              <h2>Total:<span className="summery-number">${cOrder && cOrder.totCost}</span></h2>
              <Button color={cOrder && cOrder.status === 'pending' ? 'blue' : 'green'}
                fluid onClick={this.setOrderStatus}>{cOrder && cOrder.status === 'pending' ? 'Pay' : 'Payed'}</Button>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.item,
    order: state.order
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllItems: () => dispatch(getAllItems()),
    getAllOrders: () => dispatch(getAllOrders()),
    addItemToOrder: (oId, iId, qty, allItems) => dispatch(addItemToOrder(oId, iId, qty, allItems)),
    setCurrentOrder: (id, allItems) => dispatch(setCurrentOrder(id, allItems)),
    deleteItemFromOrder: (orderId, itemId, allItems) => dispatch(deleteItemFromOrder(orderId, itemId, allItems)),
    setOrderStatus: (id, status) => dispatch(setOrderStatus(id, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
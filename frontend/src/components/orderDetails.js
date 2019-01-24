import React from 'react';
import { getAllItems } from '../actions/itemAction'
import { getAllOrders, addItemToOrder, setCurrentOrder, deleteItemFromOrder, setOrderStatus } from '../actions/orderAction'

import { connect } from 'react-redux';
import { Button, Card, Header, Modal, Grid, Input, Segment, Divider } from 'semantic-ui-react'

class OrderDetails extends React.Component {

  state = {
    forceDelete: {},
    addItemModal: false,
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  onRemoveItem(id) {
    this.props.deleteItemFromOrder(this.props.order.currentOrder._id, id, this.props.item.itemsById);
  }

  addItemToOrder(itemId) {
    if (this.props.order.currentOrder.items.filter(x => x.item === itemId).length === 0) {  // if that items already not in the order     
      this.props.addItemToOrder(this.props.order.currentOrder._id, itemId, 0, this.props.item.itemsById).then(result => {
        this.handleClose();
      });
    } else {  // if the item already exist then do nothing. close the modal
      this.handleClose();
    }
  }

  onChangeQuantity(data, itemId) {
    if (data.value < 0) {
      this.setState({
        forceDelete: {
          [itemId]: true,
        }
      })
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
                <Modal.Content image>
                  <Card.Group itemsPerRow="4">

                    {
                      this.props.item.allItems.map(itm => {
                        return (
                          <Card key={itm._id} onClick={() => { this.addItemToOrder(itm._id) }}>
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
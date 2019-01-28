import React from 'react';
import { getAllOrders, createOrder } from '../actions/orderAction'
import { getAllItems } from '../actions/itemAction'
import { connect } from 'react-redux';
import { Button, Card, Icon, Message, Grid, Segment } from 'semantic-ui-react'

class OrderList extends React.Component {

  componentWillMount() {
    this.props.getAllOrders();
    this.props.getAllItems();
  }

  onAddNewOrder = () => {
    this.props.addNewOrder().then(result => {
      this.props.history.push('/user/order/' + result.value._id);
    });
  }

  render() {
    const orderListHTML = () => {
      if (!this.props.order.allOrders) {
        return (
          <Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
              <Message.Header>Just one second</Message.Header>
              We are fetching your orders.
            </Message.Content>
          </Message>)
      } else if (this.props.order.allOrders.length === 0) {
        return (
          <Message icon>
            <Icon name='arrow alternate circle up outline' />
            <Message.Content>
              <Message.Header>No Orders</Message.Header>
              Use above button to add new orders.
            </Message.Content>
          </Message>
        )
      } else {
        let array = this.props.order.allOrders;
        if(!this.props.ui.showAllOrders) {
          array = array.filter(x => x.status === 'pending');
        }
        return array.map((odr, index) => {
          let totAmount = 0;
          return (
            <Card fluid raised color={odr.status === 'pending' ? 'green' : 'blue'} key={odr._id} onClick={() => { this.props.history.push('/user/order/' + odr._id) }}>
              <Card.Content >
                <Grid>
                  <Grid.Column width="10" >
                    <Card.Header><h3># {index + 1}</h3></Card.Header>
                    <Card.Meta>{odr.items && odr.items.length} items</Card.Meta>
                    <Card.Description>
                      <span style={{ color: 'black' }}>
                        {
                          this.props.item.allItems.length > 0 ?
                            odr.items && odr.items.map(i => {
                              totAmount += this.props.item.itemsById[i.item].unitPrice * i.quantity;
                              return this.props.item.itemsById[i.item].name + " " + this.props.item.itemsById[i.item].unitPrice
                            }).join(' | ')
                            : ''
                        }
                      </span>
                    </Card.Description>
                  </Grid.Column>
                  <Grid.Column width="6">
                    <h1 className="ui right aligned">${totAmount}</h1>
                  </Grid.Column>
                </Grid>
              </Card.Content>
            </Card>
          )
        });
      }
    }

    return (
      <div className="order-list">
        <Segment>
          <Button color="green" fluid icon onClick={this.onAddNewOrder}> <Icon name='add' /> Add Order</Button>
        </Segment>
        {orderListHTML()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order,
    item: state.item,
    ui: state.ui
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrders: () => {
      dispatch(getAllOrders());
    },
    getAllItems: () => {
      dispatch(getAllItems())
    },
    addNewOrder: () => dispatch(createOrder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
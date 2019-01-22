import React from 'react';
import { getAllOrders } from '../actions/orderAction'
import { connect } from 'react-redux';
import { Button, Card, Icon, Message, Grid } from 'semantic-ui-react'

class OrderList extends React.Component {

  componentWillMount() {
    this.props.getAllOrders();
  }

  render() {

    const orderListHTML = () => {
      if (!this.props.order.allOrders || this.props.order.allOrders.length === 0) {
        return (
          <Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
              <Message.Header>Just one second</Message.Header>
              We are fetching your orders.
            </Message.Content>
          </Message>)
      } else {
        return this.props.order.allOrders.map((odr, index) => {
          return (
            <Card fluid raised color="green" key={odr._id}>
              <Card.Content>
                <Grid>
                  <Grid.Column width="10">
                    <Card.Header><h3># {index + 1}</h3></Card.Header>
                    <Card.Meta>{odr.items && odr.items.length} items</Card.Meta>
                    <Card.Description>
                      Banana | Orange | Mango
                </Card.Description>
                  </Grid.Column>
                  <Grid.Column width="6">
                    <h1 className="ui right aligned">${odr.items && odr.items.length}</h1>
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
        {orderListHTML()}
        {JSON.stringify(this.props.order.allOrders)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrders: () => {
      dispatch(getAllOrders());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
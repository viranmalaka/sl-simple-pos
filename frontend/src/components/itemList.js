import React from 'react';
import { getAllItems, createItem } from '../actions/itemAction'
import { connect } from 'react-redux';
import { Button, Card, Icon, Message, Modal, Input, Label, Menu, Form } from 'semantic-ui-react'

class ItemList extends React.Component {

  state = {
    name: '',
    unitPrice: '',
    description: '',
    modalOpen: false,
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleInputs = (e, key) => {
    let s = {}
    s[key] = e.target.value;
    this.setState(s);
  }

  componentWillMount() {
    this.props.getAllItems();
  }

  submitNewItem = () => {
    this.props.createItem((({ name, unitPrice, description }) => ({ name, unitPrice, description }))(this.state)).then((result) => {
      this.handleClose();
    });
  }

  render() {
    const itemsHTML = () => {
      if (!this.props.item.allItems || this.props.item.allItems.length === 0) {
        return (
          <Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
              <Message.Header>Just one second</Message.Header>
              We are fetching your items.
            </Message.Content>
          </Message>
        )
      } else {
        return (
          this.props.item.allItems.map(itm => {
            return (
              <Card key={itm._id}>
                <Card.Content>
                  <Card.Header>{itm.name}</Card.Header>
                  <Card.Meta>Unit Price: ${itm.unitPrice}</Card.Meta>
                  <Card.Description>{itm.description}</Card.Description>
                </Card.Content>
              </Card>
            )
          })
        )
      }
    }

    return (
      <div>
        <Menu className="item-list-menu">
          <Menu.Item position="right">

            <Modal trigger={<Button animated="fade" onClick={this.handleOpen}>
              <Button.Content visible>Add New</Button.Content>
              <Button.Content hidden>
                <Icon name='add' />
              </Button.Content>
            </Button>}
              open={this.state.modalOpen}
              onClose={this.handleClose}
            >
              <Modal.Header>Add New Item</Modal.Header>
              <Modal.Content>

                <Form onSubmit={this.submitNewItem}>
                  <Form.Group>
                    <Form.Input width="10" fluid label='Item Name' placeholder='Item name' onChange={(e) => { this.handleInputs(e, 'name') }} />
                    <Form.Input width="6" fluid label='Unit Price' placeholder='Unit price' onChange={(e) => { this.handleInputs(e, 'unitPrice') }} />
                  </Form.Group>
                  <Form.TextArea label='Description' placeholder='Small description about the item' onChange={(e) => { this.handleInputs(e, 'description') }} />

                  {/* {TODO: Show and error message on failures} */}
                  
                  <Form.Button position="right">Submit</Form.Button>
                </Form>

              </Modal.Content>
            </Modal>


          </Menu.Item>
        </Menu>
        <div>
          <Card.Group itemsPerRow="3">
            {itemsHTML()}
          </Card.Group>
        </div>
        {JSON.stringify(this.props.item)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.item
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllItems: () => {
      dispatch(getAllItems());
    },
    createItem: (data) => {
      dispatch(createItem(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
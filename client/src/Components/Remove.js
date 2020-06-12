import React from 'react';
import { Modal, Button, Icon } from 'rsuite';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import '../App.css';
class Remove extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
      };
      this.close = this.close.bind(this);
      this.open = this.open.bind(this);
      this.updateData = this.updateData.bind(this);
    }
    close() {
      this.setState({ show: false });
    }
    open() {
      this.setState({ show: true });
    }
    updateData() { 
      var handleToUpdate = this.props.handleToUpdate;
      for( var i =0; i < this.props.data.length; i++) { 
        if( this.props.data[i].JMBG === this.props.details.JMBG) { 
          this.props.data.splice(i,1);
          break;
        }
      }  
      console.log(this.state.data);
      handleToUpdate(this.props.data);
      
  }
    handleSubmit = (event) => {
      this.updateData();
      this.close();
      fetch('http://localhost:9000/delete', {
          method: 'DELETE',
          // We convert the React state to JSON and send it as the POST body
          body: JSON.stringify(this.props.details),
          headers: {
            "Content-Type": "application/json"
        }
        }).then(function(response) {
          console.log(response)
          return response.json();
        });
        event.preventDefault();  
    }
    render() {
      return (
        <React.Fragment>
          <DeleteOutlineIcon className='hvr-grow' onClick={this.open}></DeleteOutlineIcon> 
          <Modal backdrop="static" show={this.state.show} onHide={this.close} size="xs">
            <Modal.Body>
              <Icon
                icon="remind"
                style={{
                  color: '#ffb300',
                  fontSize: 24
                }}
              />
              {'  '}
              Jeste li sigurni da zelite da izbrisete korisnika?
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleSubmit} appearance="primary">
                Da
              </Button>
              <Button onClick={this.close} appearance="subtle">
                Ne
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      );
    }
  }
  
  export default Remove;
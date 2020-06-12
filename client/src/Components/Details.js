import React from 'react';
import { Drawer, Button, Divider } from 'rsuite';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import '../App.css';
class Details extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        show: false
      };
      this.close = this.close.bind(this);
      this.toggleDrawer = this.toggleDrawer.bind(this);
    }
    close() {
      this.setState({
        show: false
      });
    }
    toggleDrawer() {
      this.setState({ show: true });
    }
    render() {
      return (
        <React.Fragment>
          <MoreHorizOutlinedIcon className='hvr-grow' onClick={this.toggleDrawer} />
          <Drawer
            show={this.state.show}
            onHide={this.close}
          >
            <Drawer.Header>
              <Drawer.Title>Description</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <p><b>Ime:</b> {this.props.details.Ime}</p>
              <Divider className="divider-margin"/>
              <p><b>Prezime:</b> {this.props.details.Prezime}</p>
              <Divider className="divider-margin"/>
              <p><b>Email:</b> {this.props.details.Email}</p>
              <Divider className="divider-margin"/>
              <p><b>Telefon:</b> {this.props.details.Telefon}</p>
              <Divider className="divider-margin"/>
              <p><b>Adresa:</b> {this.props.details.Adresa}</p>
              <Divider className="divider-margin"/>
              <p><b>Linkedin:</b> {this.props.details.Linkedin}</p>
              <Divider className="divider-margin"/>
              <p><b>Skype:</b> {this.props.details.Skype}</p>
              <Divider className="divider-margin"/>
              <p><b>Instagram:</b> {this.props.details.Instagram}</p>
              <Divider className="divider-margin"/>
              <p><b>Datum rodjenja:</b> {this.props.details.Datum_rodjenja}</p>
              <Divider className="divider-margin"/>
              <p><b>JMBG:</b> {this.props.details.JMBG}</p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={this.close} appearance="primary" color="green">OK</Button>
            </Drawer.Footer>
          </Drawer>
        </React.Fragment>
      );
    }
  
  }
  
export default Details;
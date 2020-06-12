import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Modal, Button } from 'rsuite';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import '../App.css';
class Edit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data:  this.props.data,
        formValue: { 
          ime: this.props.details.Ime,
          prezime: this.props.details.Prezime,
          adresa: this.props.details.Adresa,
          email: this.props.details.Email,
          telefon: this.props.details.Telefon, 
          linkedin: this.props.details.Linkedin,
          skype: this.props.details.Skype,
          instagram: this.props.details.Instagram,
          datumRodjenja: this.props.details.Datum_rodjenja,
          jmbg: this.props.details.JMBG
        },
        show: false,
      };
      this.close = this.close.bind(this);
      this.open = this.open.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.updateData = this.updateData.bind(this);
    }
    close() {
      this.setState({ show: false });
    }
    open() {
      this.setState({ show: true });
    }
    handleChange(value) {
      console.log(value);
      this.setState({
        formValue: value
      });
    }
    updateData() { 
      var handleToUpdate = this.props.handleToUpdate;
      for( var i =0; i < this.props.data.length; i++) { 
        if( this.props.data[i].JMBG === this.state.formValue.jmbg) { 
          this.props.data[i].Ime = this.state.formValue.ime;
          this.props.data[i].Prezime = this.state.formValue.prezime;
          this.props.data[i].Adresa = this.state.formValue.adresa;
          this.props.data[i].Email = this.state.formValue.email;
          this.props.data[i].Telefon = this.state.formValue.telefon; 
          this.props.data[i].Linkedin = this.state.formValue.linkedin;
          this.props.data[i].Skype = this.state.formValue.skype;
          this.props.data[i].Instagram = this.state.formValue.instagram;
          this.props.data[i].Datum_rodjenja = this.state.formValue.datumRodjenja;
          this.props.data[i].JMBG = this.state.formValue.jmbg;
        }
      }
      this.setState({data: this.props.data});
      console.log(this.state.data);
      console.log(this.props.data);
      handleToUpdate(this.props.data);
  }
    
    handleSubmit = (event) => {
      this.updateData();
      fetch('http://localhost:9000/put', {
          method: 'PUT',
          // We convert the React state to JSON and send it as the POST body
          body: JSON.stringify(this.state.formValue),
          headers: {"Content-Type": "application/json"}
        })
        .then(function(response) {
          console.log(response)
          return response.json();
        }).then(function(body){
          console.log(body);
        });
        this.close();
        event.preventDefault();  
    }
    
    render() {
      const disabled = true;
      return (
        <React.Fragment>
          <Modal show={this.state.show} onHide={this.close} size="md">
            <Modal.Header>
              <Modal.Title>Edituj korisnika</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                fluid
                onChange={this.handleChange}
                formValue={this.state.formValue}
              >
                <FormGroup>
                  <ControlLabel>Ime</ControlLabel>
                  <FormControl name="ime" />
                  <HelpBlock>Required</HelpBlock>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Prezime</ControlLabel>
                  <FormControl name="prezime"/>
                  <HelpBlock>Required</HelpBlock>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl name="email" type="email"/>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Telefon</ControlLabel>
                  <FormControl name="telefon" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Adresa</ControlLabel>
                  <FormControl name="adresa" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Linkedin</ControlLabel>
                  <FormControl name="linkedin" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Skype</ControlLabel>
                  <FormControl name="skype" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Instagram</ControlLabel>
                  <FormControl name="instagram" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Datum rodjenja</ControlLabel>
                  <FormControl name="datumRodjenja" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>JMBG</ControlLabel>
                  <FormControl name="jmbg" disabled={disabled} />
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick= {this.handleSubmit} appearance="primary" color="green">
                Snimi
              </Button>
              <Button onClick={this.close} appearance="subtle">
                Otkazi
              </Button>
            </Modal.Footer>
          </Modal>
          <EditOutlinedIcon className="hvr-grow" onClick={this.open}/>
        </React.Fragment>
      );
    }
  }
export default Edit;
import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Modal, Button } from 'rsuite';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

class Create extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        formValue: {
          ime: '',
          prezime: '',
          email: '',
          telefon: '',
          adresa: '',
          linkedin: '',
          skype: '',
          instagram: '',
          datumRodjenja: '',
          jmbg: ''
        },
        show: false
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
      this.setState({
        formValue: value
      });
    }
    
    updateData() { 
      var handleToUpdate = this.props.handleToUpdate;
      this.props.data.push({
        "Ime" : this.state.formValue.ime,
        "Prezime" : this.state.formValue.prezime,
        "Email" : this.state.formValue.email,
        "Telefon" : this.state.formValue.telefon,
        "Adresa" : this.state.formValue.adresa,
        "Linkedin" : this.state.formValue.linkedin,
        "Skype" : this.state.formValue.skype,
        "Instagram" : this.state.formValue.instagram,
        "Datum_rodjenja" : this.state.formValue.datumRodjenja,
        "JMBG" : this.state.formValue.jmbg
      });  
      console.log(this.props.data);
      handleToUpdate(this.props.data);
    }
    resetForm() {
      this.setState({
        formValue: {
          ime: '',
          prezime: '',
          email: '',
          telefon: '',
          adresa: '',
          linkedin: '',
          skype: '',
          instagram: '',
          datumRodjenja: '',
          jmbg: ''
        }
      });
    }
    handleSubmit = (event) => {
      this.updateData();
      this.resetForm();
      this.close();
      fetch('http://localhost:9000/post', {
          method: 'POST',
          // We convert the React state to JSON and send it as the POST body
          body: JSON.stringify(this.state.formValue),
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
          <Modal show={this.state.show} onHide={this.close} size="md">
            <Modal.Header>
              <Modal.Title>Novi korisnik</Modal.Title>
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
                  <FormControl name="jmbg"/>
                  <HelpBlock>Required</HelpBlock>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleSubmit} appearance="primary" color="green">
                Snimi
              </Button>
              <Button onClick={this.close} appearance="subtle">
                Otkazi
              </Button>
            </Modal.Footer>
          </Modal>
          <PersonAddIcon className="hvr-grow" onClick={this.open} />
        </React.Fragment>
      );
    }
  }
  
  export default Create;
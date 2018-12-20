import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Configuration from '../Configuration';
import { Redirect } from 'react-router-dom';
import '../index.css';


class Login extends Component {
  constructor() {
    super()
    this.state = { username: '', password: '', access: false };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit() {

    const validation = this.validate(this.state);

    if (validation) {
      axios.post(`${Configuration.apiServer}/api/v1/login`, { email: this.state.username, password: this.state.password }).then(response => {
        if (response.data.status === 'error')
          return alert('Usuario o contraseña incorrecta');
        localStorage.setItem('macrofoto:email', response.data.email)
        localStorage.setItem('macrofoto:user', response.data.profile.name)
        localStorage.setItem('macrofoto:userRol', response.data.profile.rol.name);
        localStorage.setItem('macrofoto:token', response.data.token);
        this.setState({ access: true });
      });
    } else {
      alert('Todos los campos requeridos');
    }
  }

  validate(state) {
    let valid = 0;

    if (state.username && state.username !== '' && state.username !== undefined)
      valid += 1;

    if (state.password && state.password !== '' && state.password !== undefined)
      valid += 1;

    if (valid === 2) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    if (this.state.access) {
      return (
        <Redirect to="/administrador/sucursales" />
      );
    }

    return (
      <div className="bg">
        <br />
        <br />
        <div className="d-flex justify-content-center">
          <Card style={{ width: '40%', height: '100%' }}>
            <div className="justify-content-center" style={{ marginLeft: "35%", marginTop: '10%' }} >

              <img src={require('../images/macrofoto logo .jpeg')} alt="Foto" style={{ width: '50%', height: '50%' }} />
            </div>
            <div className="d-flex justify-content-center flex-wrap">
              <CardContent >
                <TextField
                  id="outlined-name"
                  label="Usuario"
                  value={this.state.name}
                  onChange={this.handleUsername}
                  margin="normal"
                  fullWidth

                />
                <br />
                <TextField
                  id="standard-password-input"
                  type="password"
                  label="Contraseña"
                  value={this.state.name}
                  onChange={this.handlePassword}
                  margin="normal"
                  fullWidth

                />
              </CardContent>
            </div  >
            <br />
            <br />

            <div className="d-flex justify-content-center flex-wrap">
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                Acceder
              </Button>
            </div>

            <br />
          </Card>
        </div  >
      </div>
    );
  }
}
export default Login;
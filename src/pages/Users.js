import React, { Component } from 'react';
import '../styles/BranchOffice.css'
import axios from 'axios';
import IntegratedCard from '../components/IntegratedCard';
import Configuration from '../Configuration';
import ModalUsers from '../components/ModalUsers';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class BrachOffices extends Component {
  constructor() {
    super();
    this.state = { users: [], open: false }
    this.headers = { 'Authorization': `JWT ${localStorage.getItem('macrofoto:token')}` };
    this.getUsers = this.getUsers.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  getUsers() {
    axios.get(`${Configuration.apiServer}/api/v1/admin/users`, { headers: this.headers })
      .then(response => {
        this.setState({ users: response.data.users })
      }).catch(error => {
        console.log(error)
      })
  }

  handleClose() {
    this.setState({ open: false });
  };

  render() {
    const users = this.state.users.map(user => {
      return (
        <IntegratedCard
          key={user.id}
          avatar={user.profile.name.charAt(0)}
          cardHeader={true}
          cardImage={true}
          title={user.profile.name}
          subheader={user.profile.rol.name}
          image={user.profile.avatar}
          cardfooter={true}
        />

      );
    })

    return (
      <div>
        <div className="container">
          <br />
          <div className="justify-content-between">
            {users}
          </div>
          <div className="d-flex justify-content-end flex-wrap">
          <Fab color="secondary" aria-label="Add" onClick={this.handleClickOpen} data-spy="affix" data-offset-top="205" >
            <AddIcon />
          </Fab>
          </div>
        </div>
        <ModalUsers open={this.state.open} close={this.state.close} />
      </div>
    );
  }
}

export default BrachOffices;
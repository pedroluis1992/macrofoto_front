import React, { Component } from 'react';
import axios from 'axios';
import IntegratedCard from '../components/IntegratedCard';
import Configuration from '../Configuration';
import ModalUsers from '../components/ModalUsers';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MiniDrawer from '../components/MiniDrawer';


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
      <MiniDrawer
      title={<img style={{ height: '60px' }} src={require('../images/macrofoto logo .jpeg')} alt={"Logo"} />}
      icon={<img style={{ height: '50px', marginRight: '32px', borderRadius: '50%' }} src={require('../images/descarga.jpeg')} alt={"Imagen usuario"} />}
      main={
        <div style={{ marginTop: "15%" }} className="d-flex justify-content-between flex-wrap">
        <br />
          <div className="justify-content-between">
            {users}
          </div>
          <div className="d-flex justify-content-end flex-wrap">
          <Fab color="secondary" aria-label="Add" onClick={this.handleClickOpen} data-spy="affix" data-offset-top="205" >
            <AddIcon />
          </Fab>
          </div>
          <ModalUsers open={this.state.open} close={this.state.close} />
        </div>
        }
      />
    );
  }
}

export default BrachOffices;
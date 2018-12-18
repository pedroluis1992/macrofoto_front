import React, { Component } from 'react';
import axios from 'axios';
import Configuration from '../Configuration';
import BasicCard from '../components/BasicCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ModalBranchOffices from '../components/branchOffices/ModalBranchOffices';
import ModalBranchOfficesUpdated from '../components/branchOffices/ModalBranchOfficesUpdated';

import '../styles/BranchOffice.css';



class BranchOffices extends Component {
  constructor() {
    super();
    this.state = { branchOffices: [], open: false, openUpdated: false, currentBranch:'' };
    this.headers = { 'Authorization': `JWT ${localStorage.getItem('macrofoto:token')}` };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCloseUpdated = this.handleCloseUpdated.bind(this);
  }

  componentDidMount() {
    this.getBranchOffices();
  }

  handleSubmit() {
    this.setState({ open: true })
  }

  getBranchOffices() {    
    axios.get(`${Configuration.apiServer}/api/v1/admin/branches`, { headers: this.headers })
      .then(response => {
        if ('branches' in response.data) {
          this.setState({ branchOffices: response.data.branches })
        }
      }).catch(error => {
        console.log(error)
      })
  }

  handleClose() {
    this.setState({ open: false });
  };

  handleCloseUpdated() {
    this.setState({ openUpdated: false });
  };

  handleOpenEditModal(params){
    this.setState({ openUpdated: true, currentBranch: params})
  }


  handleSave(params) {
    axios.post(`${Configuration.apiServer}/api/v1/admin/branches`, params, { headers: this.headers })
      .then(response => {
        if (response.data.status === 'ok') {
          this.setState({ open: false })
          this.getBranchOffices();
          alert("Sea creado una sucursal con exito")
        }
      }).catch(error => {
        console.log(error)
      })
  }

  handleUpdate(params) {

    axios.put(`${Configuration.apiServer}/api/v1/admin/branches/${this.state.currentBranch.id}`, params, { headers: this.headers })
      .then(response => {
        console.log(response)
        if (response.data.status === 'ok') {
          this.setState({ openUpdated: false })
          this.getBranchOffices();
          alert("Sea modificado una sucursal con exito")
        }
      }).catch(error => {
        console.log(error)
      })
  }

    handleStatus(params){
    axios.put(`${Configuration.apiServer}/api/v1/admin/branches/${params.id}/status`, !params.status, { headers: this.headers })
      .then(response => {
        if (response.data.status === 'ok') {
          this.setState({ open: false })
          this.getBranchOffices();
          alert("Sea status una sucursal con exito")
        }
      }).catch(error => {
        console.log(error)
      })
  }

  render() {

    const BranchOffices = this.state.branchOffices.map(branchOffice => {
      return (
        <BasicCard
          key={branchOffice.id}
          title={branchOffice.name}
          description={branchOffice.address}
          image={"/src/images/descarga.jpeg"}
          button={
            <div class="dropdown">
              <button class="btn btn-danger" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Opciones
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item" onClick={ () => { this.handleOpenEditModal(branchOffice) } } style={{ marginRight: '5px' }}>Editar</button>
                <button className="dropdown-item" onClick={ () => { this.handleStatus(branchOffice) } } style={{ marginRight: '5px' }}>Estatus</button>
                <button class="dropdown-item" href="#">Eliminar</button>
              </div>
            </div>
          }
        />
      );
    })
    return (
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap">
          {BranchOffices}
        </div>
        <br/>
        <br/>
        <div className="d-flex justify-content-end flex-wrap">
          <Fab color="secondary" aria-label="Add" onClick={this.handleSubmit} data-spy="affix" data-offset-top="205" >
            <AddIcon />
          </Fab>
        </div>
        <ModalBranchOffices save={this.handleSave} open={this.state.open} close={this.state.close} handleClose={this.handleClose} />
        <ModalBranchOfficesUpdated save={this.handleUpdate} record={this.state.currentBranch} open={this.state.openUpdated} close={this.state.closeUpdated} handleClose={this.handleCloseUpdated} />
      </div>
    );
  }
}



export default BranchOffices;
import React, { Component } from 'react';
import axios from 'axios';
import Configuration from '../Configuration';
import BasicCard from '../components/BasicCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ModalMeasures from '../components/measures/ModalMeasures';
import ModalMeasuresUpdated from '../components/measures/ModalMeasuresUpdated';


class Measures extends Component {
  constructor() {
    super();
    this.state = { measures: [], open: false, openUpdated: false, currentMeasure:'' }
    this.headers = { 'Authorization': `JWT ${localStorage.getItem('macrofoto:token')}` };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleUpdated = this.handleUpdated.bind(this);
  }

  componentDidMount() {
    this.getMeasures();
  }

  getMeasures() {
    axios.get(`${Configuration.apiServer}/api/v1/admin/measures`, { headers: this.headers })
      .then(response => {
        if ('measures' in response.data) {
          this.setState({ measures: response.data.measures })
        }
      }).catch(error => {
        console.log(error)
      })
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose() {
    this.setState({ open: false });
  };

  handleOpenEditModal(params){
    this.setState({ openUpdated: true, currentMeasure: params})
  }


  handleSave(params) {
    axios.post(`${Configuration.apiServer}/api/v1/admin/measures`, params, { headers: this.headers })
      .then(response => {
        if (response.data.status === 'ok') {
          this.getMeasures();
          this.setState({ open: false })
          alert("Sea creado una medida con exito")
        }
      }).catch(error => {
        console.log(error)
      })
  }

  handleUpdated(params){
    console.log()
    axios.put(`${Configuration.apiServer}/api/v1/admin/measures/${this.state.currentMeasure.id}`, params, { headers: this.headers })
    .then(response => {
      console.log(response)
      if (response.data.status === 'ok') {
        this.setState({ openUpdated: false })
        this.getMeasures();
        alert("Sea modificado una sucursal con exito")
      }
    }).catch(error => {
      console.log(error)
    })
  }



  render() {

    const measures = this.state.measures.map(measure => {
      return (
        <BasicCard
          key={measure.id}
          title={`${measure.width} X ${measure.height}`}
          button={
            <div className="dropdown">
              <button className="btn btn-danger" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Opciones
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item" onClick={() => { this.handleOpenEditModal(measure) }} style={{ marginRight: '5px' }}>Editar</button>
                <button className="dropdown-item" onClick={() => { this.handleStatus(measure) }} style={{ marginRight: '5px' }}>Estatus</button>
                <button className="dropdown-item" href="#">Eliminar</button>
              </div>
            </div>
          }
        >

        </BasicCard>
      );
    })
    return (
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap">
          {measures}
        </div>
          <br />
          <br />

          <div className="d-flex justify-content-end flex-wrap">
            <Fab color="secondary" aria-label="Add" onClick={this.handleClickOpen} >
              <AddIcon />
            </Fab>
          
        </div>
        <ModalMeasures save={this.handleSave} open={this.state.open} close={this.state.close} handleClose={this.handleClose} />
        <ModalMeasuresUpdated save={this.handleUpdated} record={this.state.currentMeasure} open={this.state.openUpdated} close={this.state.close} handleClose={this.handleClose} />

      </div>
    );
  }
}

export default Measures;
import React,{Component } from 'react';
import axios from 'axios';
import Configuration from '../Configuration';
import BasicCard from '../components/BasicCard';
import Icon from '@material-ui/core/Icon';
import ModalPrintingOptions from '../components/printingOptions/ModalPrintingOptions';


class PrintingOptions extends Component {
  constructor(){
    super();
    this.state = {printingOptions: [], open: false};
    this.headers = { 'Authorization': `JWT ${localStorage.getItem('macrofoto:token')}` };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount(){
    this.getPrintOptions();
  }

  getPrintOptions(){
    axios.get(`${Configuration.apiServer}/api/v1/admin/printing-options`,{headers: this.headers})
      .then(response => {
        if('printingOptions' in response.data){
          this.setState({printingOptions: response.data.printingOptions})
        }
      }).catch(error =>{
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

  handleSave(params) {
    axios.post(`${Configuration.apiServer}/api/v1/admin/printing-options`, params, { headers: this.headers })
      .then(response => {
        if (response.data.status === 'ok') {
          this.setState({ open: false })
          alert("Sea creado una opcion de impresion con exito")
        }
      }).catch(error => {
        console.log(error)
      })
  }


  render(){
    const printingOptions = this.state.printingOptions.map(printing => {
      return(
        <BasicCard
          key={printing.id}
          title={printing.name}
        />
      );
    })
    return(
      <div>
        {printingOptions}
        <button onClick={() => { this.handleClickOpen() }} className="btn btn-danger fav-button">
          <Icon color="secondary">
            +
          </Icon>
        </button>
        <ModalPrintingOptions save={this.handleSave} open={this.state.open} close={this.state.close} handleClose={this.handleClose} />
      </div>
    );
  }
}

export default PrintingOptions;
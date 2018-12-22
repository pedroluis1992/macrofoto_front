import React, { Component } from 'react';
import MiniDrawer from '../components/MiniDrawer';
import ButtonAdd from '../components/ButtonAdd';
import IntegratedCard from '../components/IntegratedCard';
import Configuration from '../Configuration';
import axios from 'axios';
import ProductModal from '../components/products/ProductModal';

class Categories extends Component {
  constructor() {
    super();
    this.state = { categories: [], open: false };
    this.headers = { 'Authorization': `JWT ${localStorage.getItem('macrofoto:token')}` };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  componentDidMount() {
    this.getCategories();
  }

  handleOpenEditModal(params) {
    this.setState({ openUpdated: true, currentBranch: params })
  }

  handleClose() {
    this.setState({ open: false });
  };

  handleSubmit() {
    this.setState({ open: true })
  }

  getCategories() {
    axios.get(`${Configuration.apiServer}/api/v1/admin/categories`, { headers: this.headers })
      .then(response => {
        if ('categories' in response.data) {
          this.setState({ categories: response.data.categories })
        }
      }).catch(error => {
        console.log(error)
      })
  }

  handleSave(params) {
    console.log(params)
    axios.post(`${Configuration.apiServer}/api/v1/admin/categories`, params, { headers: this.headers })
      .then(response => {
        console.log(response)
        if (response.data.status === 'ok') {
          this.setState({ open: false })
          this.getBranchOffices();
          alert("Sea creado una categorias con exito")
        }
      }).catch(error => {
        console.log(error)
      })
  }


  render() {
    const categories = this.state.categories.map(categoria => {
      return (
        <IntegratedCard

        />
      );
    })
    return (
      <MiniDrawer
        title={<img style={{ height: '60px' }} src={require('../images/macrofoto logo .jpeg')} alt={"Logo"} />}
        icon={<img style={{ height: '50px', marginRight: '32px', borderRadius: '50%' }} src={require('../images/descarga.jpeg')} alt={"Imagen usuario"} />}
        main={
          <div style={{ marginTop: "5%" }} className="d-flex justify-content-between flex-wrap">
            {categories}
            <br />
            <br />
            <div className="d-flex justify-content-end flex-wrap">
              <ButtonAdd submit={this.handleSubmit} />
            </div>
            <ProductModal save={this.handleSave} open={this.state.open}  handleClose={this.handleClose} />
          </div>
        }
      />
    );
  }
}
export default Categories;
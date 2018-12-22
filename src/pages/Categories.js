import React, { Component } from 'react';
import CategoryCard from '../components/CategoryCard';
import MiniDrawer from '../components/MiniDrawer';
import ButtonAdd from '../components/ButtonAdd';
import CategoriesModal from '../components/categories/CategoriesModal';
import axios from 'axios';
import Configuration from '../Configuration';

class Products extends Component {
  constructor() {
    super();
    this.state = { open: false, categories: [] }
    this.headers = { 'Authorization': `JWT ${localStorage.getItem('macrofoto:token')}` };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.getCategories();
  }

  handleSubmit() {
    this.setState({ open: true })
  }

  getCategories() {
    axios.get(`${Configuration.apiServer}/api/v1/admin/product-categories`, { headers: this.headers })
      .then(response => {
        console.log(response)
        if ('productCategories' in response.data) {
          this.setState({ categories: response.data.productCategories })
        }
      }).catch(error => {
        console.log(error)
      })
  }

  handleSave(params) {
    console.log(params)
    axios.post(`${Configuration.apiServer}/api/v1/admin/product-categories`, params, { headers: this.headers })
      .then(response => {
        console.log(response)
        if (response.data.status === 'ok') {
          this.setState({ open: false })
          this.getCategories();
          alert("Sea creado una categoria con exito")
        }
      }).catch(error => {
        console.log(error)
      })
  }

  handleClose() {
    this.setState({ open: false });
  };


  render() {
    const categories = this.state.categories.map(category => {
      return (
        <CategoryCard
          key={category.id}
          title={category.name}
          description={category.description}
          img={require('../images/regalo.jpeg')}
        />
      );
    })
    return (
      <MiniDrawer
        title={<img style={{ height: '60px' }} src={require('../images/macrofoto logo .jpeg')} alt={"Logo"} />}
        icon={<img style={{ height: '50px', marginRight: '32px', borderRadius: '50%' }} src={require('../images/descarga.jpeg')} alt={"Imagen usuario"} />}
        main={
          <div style={{ marginTop: "15%"}} className="d-flex justify-content-between flex-wrap">
            {categories}
            <div className="d-flex justify-content-end flex-wrap">
              <ButtonAdd submit={this.handleSubmit} />
            </div>
            <CategoriesModal save={this.handleSave} open={this.state.open} close={this.state.close} handleClose={this.handleClose} />

          </div>

        }
      />
    );
  }
}
export default Products;
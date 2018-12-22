import React, { Component } from 'react';
import IntegratedCard from '../components/IntegratedCard';
import MiniDrawer from '../components/MiniDrawer';
import ButtonAdd from '../components/ButtonAdd';
import CategoriesModal from '../components/categories/CategoriesModal';
import CategoriesUpdateModal from '../components/categories/CategoriesUpdateModal';
import axios from 'axios';
import Configuration from '../Configuration';
import AlertDialog from '../components/AlertDialog';

class Products extends Component {
  constructor() {
    super();
    this.state = { open: false, categories: [], openUpdated: false, currentCategory: ''}
    this.headers = { 'Authorization': `JWT ${localStorage.getItem('macrofoto:token')}` };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCloseUpdated = this.handleCloseUpdated.bind(this);
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

  handleCloseUpdated() {
    this.setState({ openUpdated: false });
  };

  handleUpdate(params) {
    console.log(params, "params")
    axios.put(`${Configuration.apiServer}/api/v1/admin/product-categories/${this.state.currentCategory.id}`, params, { headers: this.headers })
        .then(response => {
            console.log(response)
            if (response.data.status === 'ok') {
                this.setState({ openUpdated: false })
                this.getCategories();
            }
        }).catch(error => {
            console.log(error)
        })
  }

  openConfirmDialog(data) {
    if (this.dialog) {
      this.dialog.handleClickOpen();
      this.dialog.data = data;
    }
  }

  handleOpenEditModal(params) {
    this.setState({ openUpdated: true, currentBranch: params })
  }

  openConfirmDialog(data) {
    if (this.dialog) {
      this.dialog.handleClickOpen();
      this.dialog.data = data;
    }
  }

  handleStatus(params) {
    axios.put(`${Configuration.apiServer}/api/v1/admin/product-categories/${params.id}/status`, !params.status, { headers: this.headers })
      .then(response => {
        if (response.data.status === 'ok') {
          this.setState({ open: false })
          this.getCategories();
        }
      }).catch(error => {
        console.log(error)
      })
  }

  render() {
    const categories = this.state.categories.map(category => {
      const options = [
        { title: "Editar", onClick: () => this.handleOpenEditModal(category) },
        { title: `${category.status ? "Desactivar" : "Activar"} categoria`, onClick: () => this.openConfirmDialog(category) },
      ]
      return (
        <IntegratedCard
          cardHeader={true}
          cardfooter={true}
          cardImage={true}
          avatar={category.name.charAt(0)}
          key={category.id}
          title={category.name}
          content={category.description}
          image={require('../images/regalo.jpeg')}
          options={options}
        />
      );
    })
    return (
      <MiniDrawer
        title={<img style={{ height: '60px' }} src={require('../images/macrofoto logo .jpeg')} alt={"Logo"} />}
        icon={<img style={{ height: '50px', marginRight: '32px', borderRadius: '50%' }} src={require('../images/descarga.jpeg')} alt={"Imagen usuario"} />}
        main={
          <div style={{ marginTop: "15%" }} className="d-flex justify-content-between flex-wrap">
            {categories}
            <div className="d-flex justify-content-end flex-wrap">
              <ButtonAdd submit={this.handleSubmit} />
            </div>
            <CategoriesModal save={this.handleSave} open={this.state.open} close={this.state.close} handleClose={this.handleClose} />
            <CategoriesUpdateModal save={this.handleSave} record={this.state.currentCategory} open={this.state.openUpdated} close={this.state.closeUpdated} handleClose={this.handleCloseUpdated}/>
            <AlertDialog
              ref={ref => this.dialog = ref}
              title="¿Estás seguro?"
              text="Vas a cambiar el status de esta categoria, una vez desactivada, los usuarios no podrán verla"
              buttons={[
                { title: "Aceptar", onPress: () => this.handleStatus(this.dialog.data) },
                { title: "Cancelar", onPress: () => this.dialog.handleClose() }
              ]}
            />
            <AlertDialog
              ref={ref => this.notification = ref}
              title="¡Listo!"
              text="Actualizaste la información de la sucursal"
              buttons={[
                { title: "Ok", onPress: () => this.dialog.handleClose() },
              ]}
            />
          </div>
        }
      />
    );
  }
}
export default Products;
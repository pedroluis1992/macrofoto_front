import React, { Component } from 'react';
import axios from 'axios';
import Configuration from '../Configuration';
import BasicCard from '../components/BasicCard';
import ModalBranchOffices from '../components/branchOffices/ModalBranchOffices';
import ModalBranchOfficesUpdated from '../components/branchOffices/ModalBranchOfficesUpdated';
import Home from '@material-ui/icons/Home';
import MiniDrawer from '../components/MiniDrawer';
import ButtonAdd from '../components/ButtonAdd';
import AlertDialog from '../components/AlertDialog';

class BranchOffices extends Component {
    constructor() {
        super();
        this.state = { branchOffices: [], open: false, openUpdated: false, currentBranch: '' };
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

    handleOpenEditModal(params) {
        this.setState({ openUpdated: true, currentBranch: params })
    }


    handleSave(params) {
        axios.post(`${Configuration.apiServer}/api/v1/admin/branches`, params, { headers: this.headers })
            .then(response => {
                console.log(response)
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
        console.log(params, "params")
        axios.put(`${Configuration.apiServer}/api/v1/admin/branches/${this.state.currentBranch.id}`, params, { headers: this.headers })
            .then(response => {
                console.log(response)
                if (response.data.status === 'ok') {
                    this.setState({ openUpdated: false })
                    this.getBranchOffices();
                }
            }).catch(error => {
                console.log(error)
            })
    }

    handleStatus(params) {
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

    openConfirmDialog(data) {
        if (this.dialog) {
            this.dialog.handleClickOpen();
            this.dialog.data = data;
        }
    }

    render() {

        const BranchOffices = this.state.branchOffices.map(branchOffice => {
            const options = [
                { title: "Editar", onClick: () => this.handleOpenEditModal(branchOffice) },
                { title: `${branchOffice.status ? "Desactivar" : "Activar"} sucursal`, onClick: () => this.openConfirmDialog(branchOffice) },
            ]
            return (
                <BasicCard
                    key={branchOffice.id}
                    title={branchOffice.name}
                    description={branchOffice.address}
                    icon={<Home style={{ height: '55%', width: '55%', color: 'white' }} />}
                    options={options}
                />
            );
        })
        return (
            <MiniDrawer
                title={<img style={{ height: '60px' }} src={require('../images/macrofoto logo .jpeg')} alt={"Logo"} />}
                icon={<img style={{ height: '50px', marginRight: '32px', borderRadius: '50%' }} src={require('../images/descarga.jpeg')} alt={"Imagen usuario"} />}
                main={
                    <div style={{ marginTop: "5%" }} className="d-flex justify-content-between flex-wrap">
                        {BranchOffices}
                        <br />
                        <br />
                        <div className="d-flex justify-content-end flex-wrap">
                            <ButtonAdd submit={this.handleSubmit} />
                        </div>
                        <ModalBranchOffices save={this.handleSave} open={this.state.open} close={this.state.close} handleClose={this.handleClose} />
                        <ModalBranchOfficesUpdated save={this.handleUpdate} record={this.state.currentBranch} open={this.state.openUpdated} close={this.state.closeUpdated} handleClose={this.handleCloseUpdated} />
                        <AlertDialog
                            ref={ ref => this.dialog = ref }
                            title="¿Estás seguro?"
                            text="Vas a cambiar el status de esta sucursal, una vez desactivada, los usuarios no podrán verla"
                            buttons={[
                                { title: "Aceptar", onPress: () => this.handleStatus(this.dialog.data) },
                                { title: "Cancelar", onPress: () => this.dialog.handleClose() }
                            ]}
                        />
                        <AlertDialog
                            ref={ ref => this.notification = ref }
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



export default BranchOffices;
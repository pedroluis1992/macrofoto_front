import React, { Component } from 'react';
import axios from 'axios';
import Configuration from '../Configuration';
import BasicCard from '../components/BasicCard';
import { Straighten } from '@material-ui/icons';
import ModalMeasures from '../components/measures/ModalMeasures';
import ModalMeasuresUpdated from '../components/measures/ModalMeasuresUpdated';
import MiniDrawer from '../components/MiniDrawer';
import ButtonAdd from '../components/ButtonAdd'


class Measures extends Component {
    constructor() {
        super();
        this.state = { measures: [], open: false, openUpdated: false, currentMeasure: '' }
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
        this.setState({ open: false, openUpdated: false });
    };

    handleOpenEditModal(params) {
        this.setState({ openUpdated: true, currentMeasure: params })
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

    handleUpdated(params) {
        console.log()
        axios.put(`${Configuration.apiServer}/api/v1/admin/measures/${this.state.currentMeasure.id}`, params, { headers: this.headers })
            .then(response => {
                if (response.data.status === 'ok') {
                    this.setState({ openUpdated: false })
                    this.getMeasures();
                    alert("Sea modificado una sucursal con exito")
                }
            }).catch(error => {
                console.log(error)
            })
    }

    handleStatus = async (measure) => {
        try {
            const { data } = await axios.put(`${Configuration.apiServer}/api/v1/admin/measures/${measure.id}/status`, {}, { headers: this.headers } );
            if (data.status === "ok") {
                this.getMeasures()
            }
        } catch (error) {
            console.log(error)
        }
    }


    handleDelete = async measure => {
        try {
            const { data } = await axios.delete(`${Configuration.apiServer}/api/v1/admin/measures/${measure.id}`, { headers: this.headers } );
            if (data.status === "ok") {
                this.getMeasures()
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {

        const measures = this.state.measures.map(measure => {
            const options = [
                { title: "Editar", onClick: () => this.handleOpenEditModal(measure) },
                { title: `${measure.status ? "Desactivar" : "Activar"} medida`, onClick: () => this.handleStatus(measure) },
                { title: "Eliminar", onClick: () => this.handleDelete(measure) }
            ]
            return (
                <BasicCard
                    key={measure.id}
                    title={`Medida`}
                    description={`${measure.width} W X ${measure.height} H`}
                    options={options}
                    icon={<Straighten style={{ height: '55%', width: '55%', color: 'white' }} />}
                />
            );
        })
        return (
            <MiniDrawer
                title={<img style={{ height: '60px' }} src={require('../images/macrofoto logo .jpeg')} alt={"Logo"} />}
                icon={<img style={{ height: '50px', marginRight: '32px', borderRadius: '50%' }} src={require('../images/descarga.jpeg')} alt={"Imagen usuario"} />}
                main={
                    <div style={{ marginTop: "120px" }} className="d-flex justify-content-between flex-wrap">
                        <br />
                        <div style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', }} >
                            {measures}
                        </div>
                        <ButtonAdd submit={this.handleClickOpen} />
                        <ButtonAdd submit={this.handleClickOpen} />

                        <ModalMeasures save={this.handleSave} open={this.state.open} close={this.state.close} handleClose={this.handleClose} />
                        <ModalMeasuresUpdated
                            save={this.handleUpdated}
                            record={this.state.currentMeasure}
                            open={this.state.openUpdated}
                            handleClose={this.handleClose}
                        />
                    </div>
                }
            />
        );
    }
}

export default Measures;
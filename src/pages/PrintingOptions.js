import React, { Component } from 'react';
import axios from 'axios';
import Configuration from '../Configuration';
import BasicCard from '../components/BasicCard';
import Icon from '@material-ui/core/Icon';
import ModalPrintingOptions from '../components/printingOptions/ModalPrintingOptions';
import ButtonAdd from '../components/ButtonAdd';
import MiniDrawer from '../components/MiniDrawer';
import { Print } from '@material-ui/icons'


class PrintingOptions extends Component {
    
    constructor() {
        super();
        this.state = { printingOptions: [], open: false, edit: false, currentOption: {} };
        this.headers = { 'Authorization': `JWT ${localStorage.getItem('macrofoto:token')}` };
    }

    componentDidMount() {
        this.getPrintOptions();
    }

    async getPrintOptions() {
        try {
            const response = await axios.get(`${Configuration.apiServer}/api/v1/admin/printing-options`, { headers: this.headers });
            if ('printingOptions' in response.data) {
                this.setState({ printingOptions: response.data.printingOptions })
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleAdd = () => this.setState({ open: true })

    handleClose = () => this.setState({ open: false, edit: false })

    handleSave = async (option) => {
        try {
            const { data } = await axios.post(`${Configuration.apiServer}/api/v1/admin/printing-options`, option, { headers: this.headers});
            if (data.status === 'ok') {
                this.setState({ open: false })
                this.getPrintOptions();
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleUpdate = async (option) => {
        try {
            const { data } = await axios.put(`${Configuration.apiServer}/api/v1/admin/printing-options/${option.id}`, option, { headers: this.headers });
            if (data.status = 'ok') {
                this.setState({ open: false, edit: false })
                this.getPrintOptions();
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleStatus = async (option) => {
        try {
            const { data } = await axios.put(`${Configuration.apiServer}/api/v1/admin/printing-options/${option.id}/status`, null, { headers: this.headers });
            if (data.status = 'ok') {
                this.getPrintOptions();
            }
        } catch (error) {
            console.log(error)
        }
    }

    createPrintingOption = (option) => {
        const options = [
            { title: "Editar", onClick: () => this.setState({ open: true, edit: true, currentOption: option }) },
            { title: `${option.status ? "Desactivar" : "Activar"} opción de impresión`, onClick: () => this.handleStatus(option) },
        ]
        return (
            <BasicCard
                    key={option.id}
                    title={option.name}
                    icon={<Print style={{ height: '55%', width: '55%', color: 'white' }} />}
                    options={options}
            />
        )
    }

    render() {
        const printingOptions = this.state.printingOptions.map(this.createPrintingOption)
        return(
            <MiniDrawer
                title={<img style={{ height: '60px' }} src={require('../images/macrofoto logo .jpeg')} alt={"Logo"} />}
                icon={<img style={{ height: '50px', marginRight: '32px', borderRadius: '50%' }} src={require('../images/descarga.jpeg')} alt={"Imagen usuario"} />}
                main={
                    <div style={{ marginTop: "5%" }} className="d-flex justify-content-between flex-wrap">
                        {printingOptions}
                        <br />
                        <br />
                        <ButtonAdd submit={this.handleAdd} />
                        <ModalPrintingOptions
                            edit={this.state.edit}
                            open={this.state.open}
                            save={this.handleSave}
                            update={this.handleUpdate}
                            currentOption={this.state.currentOption}
                            handleClose={this.handleClose}
                        />
                        {/* <ModalBranchOffices save={this.handleSave} open={this.state.open} close={this.state.close} handleClose={this.handleClose} /> */}
                        {/* <AlertDialog
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
                        /> */}
                    </div>
                }
            />
        )
    }
}

export default PrintingOptions;
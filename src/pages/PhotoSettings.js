import React, { Component } from 'react';
import axios from 'axios';
import Configuration from '../Configuration';
import BasicCard from '../components/BasicCard';
import Icon from '@material-ui/core/Icon';
import ModalPhotoSettings from '../components/photoSettings/ModalPhotoSettings';
import ButtonAdd from '../components/ButtonAdd';
import MiniDrawer from '../components/MiniDrawer';
import { SettingsBrightness } from '@material-ui/icons'


class PhotoSettings extends Component {
    
    constructor() {
        super();
        this.state = { photoSettings: [], open: false, edit: false, currentPhotoSetting: {} };
        this.headers = { 'Authorization': `JWT ${localStorage.getItem('macrofoto:token')}` };
    }

    componentDidMount() {
        this.getPhotoSettings();
    }

    async getPhotoSettings() {
        try {
            const { data } = await axios.get(`${Configuration.apiServer}/api/v1/admin/photo-settings`, { headers: this.headers });
            if ('settings' in data) {
                this.setState({ photoSettings: data.settings })
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleAdd = () => this.setState({ open: true })

    handleClose = () => this.setState({ open: false, edit: false })

    handleSave = async (option) => {
        try {
            const { data } = await axios.post(`${Configuration.apiServer}/api/v1/admin/photo-settings`, option, { headers: this.headers});
            if (data.status === 'ok') {
                this.setState({ open: false })
                this.getPhotoSettings();
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleUpdate = async (option) => {
        try {
            const { data } = await axios.put(`${Configuration.apiServer}/api/v1/admin/photo-settings/${option.id}`, option, { headers: this.headers });
            if (data.status = 'ok') {
                this.setState({ open: false, edit: false })
                this.getPhotoSettings();
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleStatus = async (option) => {
        try {
            const { data } = await axios.put(`${Configuration.apiServer}/api/v1/admin/photo-settings/${option.id}/status`, null, { headers: this.headers });
            if (data.status = 'ok') {
                this.getPhotoSettings();
            }
        } catch (error) {
            console.log(error)
        }
    }

    createPhotoSettings = (option) => {
        const options = [
            { title: "Editar", onClick: () => this.setState({ open: true, edit: true, currentPhotoSetting: option }) },
            { title: `${option.status ? "Desactivar" : "Activar"} opción de impresión`, onClick: () => this.handleStatus(option) },
        ]
        return (
            <BasicCard
                    key={option.id}
                    title={option.name}
                    icon={<SettingsBrightness style={{ height: '55%', width: '55%', color: 'white' }} />}
                    options={options}
            />
        )
    }

    render() {
        const settings = this.state.photoSettings.map(this.createPhotoSettings)
        return(
            <MiniDrawer
                title={<img style={{ height: '60px' }} src={require('../images/macrofoto logo .jpeg')} alt={"Logo"} />}
                icon={<img style={{ height: '50px', marginRight: '32px', borderRadius: '50%' }} src={require('../images/descarga.jpeg')} alt={"Imagen usuario"} />}
                main={
                    <div style={{ marginTop: "5%" }} className="d-flex justify-content-between flex-wrap">
                        {settings}
                        <br />
                        <br />
                        <ButtonAdd submit={this.handleAdd} />
                        <ModalPhotoSettings
                            edit={this.state.edit}
                            open={this.state.open}
                            save={this.handleSave}
                            update={this.handleUpdate}
                            currentPhotoSetting={this.state.currentPhotoSetting}
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

export default PhotoSettings;
import React, { Component } from 'react';
import axios from 'axios';
import IntegratedCard from '../components/IntegratedCard';
import Configuration from '../Configuration';
import ModalUsers from '../components/ModalUsers';
import MiniDrawer from '../components/MiniDrawer';
import ButtonAdd from '../components/ButtonAdd'


class Users extends Component {
    constructor() {
        super();
        this.state = { users: [], open: false, edit: false, currentUser: {}, rols: [] }
        this.headers = { 'Authorization': `JWT ${localStorage.getItem('macrofoto:token')}` };
    }

    componentDidMount() {
        this.getUsers();
        this.getRols();
    }


    getUsers = async () => {
        try {
            const { data } = await axios.get(`${Configuration.apiServer}/api/v1/admin/users`, { headers: this.headers })
            if ("users" in data) {
                this.setState({ users: data.users })
            }
        } catch (error) {
            console.log(error)
        }
    }

    getRols = async () => {
        try {
            const { data } = await axios.get(`${Configuration.apiServer}/api/v1/admin/rols`, { headers: this.headers });
            if ("rols" in data) {
                this.setState({ rols: data.rols })
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleClickOpen = () => this.setState({ open: true })

    handleClose = () => this.setState({ open: false })

    handleSave = async (user, file) => {
        try {
            const { data } = await axios.post(`${Configuration.apiServer}/api/v1/admin/users`, user, { headers: this.headers })
            if (data.status === "ok") {
                if (file) await this.uploadAvatar(data.user, file);
                this.setState({ open: false })
                this.getUsers()
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleDelete = async user => {
        try {
            const { data } = await axios.delete(`${Configuration.apiServer}/api/v1/admin/users/${user.id}`, { headers: this.headers });
            if (data.status == "ok") {
                return this.getUsers()
            }
        } catch (error) {
            console.log(error)
        }
    }

    createUserCard = user => {
        const options = [
            { title: "Editar", onClick: () => this.setState({ open: true, edit: true, currentUser: user }) },
            { title: `${user.status ? "Desactivar" : "Activar"} opción de impresión`, onClick: () => this.handleStatus(user) },
            { title: "Eliminar", onClick: () => this.handleDelete(user) }
        ]
        return (
            <IntegratedCard
                key={user.id}
                avatar={user.profile.name.charAt(0)}
                cardHeader={true}
                cardImage={true}
                title={user.profile.name}
                subheader={user.profile.rol.name}
                image={user.profile.avatar}
                options={options}
                cardfooter={true}
            />
        )
    }


    uploadAvatar = async (user, file) => {
        try {
            let formData = new FormData();
            formData.append('avatar', file)
            const { data } = await axios.put(`${Configuration.apiServer}/api/v1/admin/users/${user.id}/avatar`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `JWT ${localStorage.getItem('macrofoto:token')}`},
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const users = this.state.users.map(this.createUserCard)

        return (
            <MiniDrawer
                title={<img style={{ height: '60px' }} src={require('../images/macrofoto logo .jpeg')} alt={"Logo"} />}
                icon={<img style={{ height: '50px', marginRight: '32px', borderRadius: '50%' }} src={require('../images/descarga.jpeg')} alt={"Imagen usuario"} />}
                main={
                    <div style={{ marginTop: "120px" }} className="d-flex justify-content-between flex-wrap">
                        <br />
                        <div style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', }} >
                            {users}
                        </div>
                        <ButtonAdd submit={this.handleClickOpen} />
                        <ModalUsers
                            open={this.state.open}
                            handleClose={this.handleClose}
                            handleSave={this.handleSave}
                            rols={this.state.rols}
                        />
                    </div>
                }
            />
        );
    }
}

export default Users;
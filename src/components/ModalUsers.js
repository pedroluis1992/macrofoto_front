import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SimpleSelect from '../components/SimpleSelect'
import { withStyles } from '@material-ui/core/styles';

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);
const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});


const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);


class ModalUsers extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        image: null,
        file: null,
        rol: null
    }

    validate = () => {
        const { name, email, password, rol, file } = this.state;
        if ( name === "" || email === "" || password === "" || rol === null ) {
            return alert("Todos los campos son necesarios")
        }
        return this.props.handleSave({ name, email, password, rolId: rol.id }, file)
    }

    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            console.log(URL.createObjectURL(event.target.files[0]))
            this.setState({ image: URL.createObjectURL(event.target.files[0]), file: event.target.files[0] });
        }
    }

    render() {
        return (
            <div>
                <Dialog
                    onClose={this.props.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.props.open}
                    fullWidth
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.props.handleClose}>
                        Nuevo Usuario
                    </DialogTitle>
                    <DialogContent>
                        <div className="d-flex justify-content-between">
                            <div style={{ flex: 2, }}>
                                <label for="file-input"
                                    style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <img
                                        style={{ height: '80%', width: '80%', borderRadius: "50%"}}
                                        src={ this.state.image ? this.state.image : require('../images/descarga.jpeg')}
                                        alt={"Imagen usuario"}
                                    />
                                </label>
                                <input
                                    onChange={this.onImageChange}
                                    id="file-input"
                                    style={{ display: 'none' }}
                                    type="file"
                                />
                            </div>
                            <div style={{ flex: 3 }}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Nombre"
                                    fullWidth
                                    onChange={({ target }) => this.setState({ name: target.value })}
                                />
                                <br />
                                <TextField
                                    margin="dense"
                                    id="email"
                                    label="Correo"
                                    type="email"
                                    fullWidth
                                    onChange={({ target }) => this.setState({ email: target.value })}
                                />
                                <br />
                                <TextField
                                    id="password"
                                    label="Contraseña"
                                    value={this.props.name}
                                    type="password"
                                    margin="normal"
                                    fullWidth
                                    onChange={({ target }) => this.setState({ password: target.value })}
                                />
                                <SimpleSelect
                                    title={"Permisos del usuario"}
                                    selectedValue={this.state.rol ? this.state.rol : "Selecciona un rol" }
                                    values={this.props.rols}
                                    onChange={ rol => this.setState({ rol }) }
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cerrar
                        </Button>
                        <Button onClick={this.validate} color="primary">
                            Guardar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default ModalUsers;
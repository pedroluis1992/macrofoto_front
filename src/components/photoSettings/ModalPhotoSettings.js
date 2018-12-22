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


class ModalPhotoSettings extends Component {

    state = {
        name: "",
        status: true,
        frame: false,
        id: null
    }

    componentWillReceiveProps({ edit, currentPhotoSetting }) {
        if (edit) {
            const { id, name, status } = currentPhotoSetting;
            return this.setState({ name, id, status })
        }   
        this.setState({ name: "" })
    }

    onHandleSave = () => {
        if (this.props.edit) {
            return this.props.update(this.state)
        }
        this.props.save(this.state)
    }

    onChangeName = event => this.setState({ name: event.target.value })

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
                        Nueva opción de foto
                    </DialogTitle>
                    <DialogContent>

                        <div style={{ display: 'flex',  flexDirection: 'column', alignItems: "flex-end" }} >
                            <div style={{ width: '80%',}}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Nombre"
                                    type="email"
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    fullWidth
                                />
                                <br />
                            </div>
                        </div>
                        <br />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cerrar
                        </Button>
                        <Button onClick={this.onHandleSave} calor="primary">
                            Guardar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default ModalPhotoSettings;
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


class ModalBranchOfficesUpdated extends Component {

  constructor() {
    super()
    this.state = { branches: {}, name:'', address: '' }
    this.onChangeName = this.onChangeName.bind(this);
    this.OnChangeAddress = this.OnChangeAddress.bind(this);
    this.setProp = this.setProp.bind(this);
    this.onChangeSave = this.onChangeSave.bind(this);
  }
 
  onChangeSave() {
    console.log(this.props)
    this.setProp('status', this.props.record.status)
    this.setProp('name', this.state.name === '' ? this.props.record.name  : this.state.name)
    this.setProp('address', this.state.address === '' ? this.props.record.address  : this.state.address)

    this.props.save(this.state.branches)
    this.setState({branches: {}})
  }

  onChangeName(event) {
    this.setState({address: event.target.value})
  }

  OnChangeAddress(event) {
   this.setState({name: event.target.value})
  }

  setProp(prop, value) {
    let req = this.state.branches;
    req[prop] = value;
    this.setState({ branches: req });
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
            Editar Sucursal
          </DialogTitle>
          <DialogContent>
            <div className="d-flex justify-content-center">
              <div style={{ width: '50%' }}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Direccion"
                  type="email"
                  defaultValue={this.props.record ? this.props.record.name : ""}
                  onChange={this.onChangeName}
                  fullWidth
                />
                <br />
                <TextField
                  id="outlined-name"
                  label="Nombre"
                  defaultValue={this.props.record ? this.props.record.address : ""}
                  onChange={this.OnChangeAddress}
                  margin="normal"
                  fullWidth
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cerrar
            </Button>
            <Button onClick={this.onChangeSave} calor="primary">
              Guardar
              </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default ModalBranchOfficesUpdated;
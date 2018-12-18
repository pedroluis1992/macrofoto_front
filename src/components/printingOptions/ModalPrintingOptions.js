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


class ModalPrintingOptions extends Component {
  constructor(){
    super()
    this.state = {width:0, height:0, measures:{}};
    this.setProp = this.setProp.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSave = this.onChangeSave.bind(this);
  }

  onChangeSave(){
    this.props.save(this.state.measures)
  }

  onChangeName(event){
    this.setProp('name', event.target.value)
  }

  setProp(prop, value) {
    let req = this.state.measures;
    req[prop] = value;
    this.setState({request: req});
  }
  
  render() {

    console.log(this.state.measures)
    return (
      <div>
        <Dialog
          onClose={this.props.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
          fullWidth
        >
          <DialogTitle id="customized-dialog-title" onClose={this.props.handleClose}>
            Crear Opcion de Impresion
          </DialogTitle>
          <DialogContent>
              <div style={{ width: '50%' }}>
                <TextField
                  autoFocus
                  type="text"
                  margin="dense"
                  id="name"
                  onChange={this.onChangeName}
                  label="Nombre "
                  fullWidth
                />
                <br />
            </div>
          </DialogContent>
          <DialogActions>
            <div>
            <Button onClick={this.props.handleClose} color="secondary">
              Cerrar
            </Button>
            
              <Button onClick={this.onChangeSave} calor="primary">
                Guardar
              </Button>
              
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default ModalPrintingOptions;
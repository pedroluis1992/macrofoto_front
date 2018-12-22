import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {

    data = null

    state = {
        open: false,
        data: null
    };

    setData = data => this.data = data

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onClick = (onPress) => {
        this.handleClose();
        onPress()
    }

    render() {
        const { buttons, title, text } = this.props
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        { buttons.map(button => (
                            <Button onClick={() => this.onClick(button.onPress)} color="primary">
                                {button.title}
                            </Button>
                        )) }
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialog;
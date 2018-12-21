import React from 'react';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import { MoreVert } from '@material-ui/icons/';

class FadeMenu extends React.Component {

    state = {
        anchorEl: null,
    };

    handleClick = event => this.setState({ anchorEl: event.currentTarget })

    handleClose = () =>  this.setState({ anchorEl: null })

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVert/>
                </IconButton>
                <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    TransitionComponent={Fade}
                >
                    {this.props.children}
                </Menu>
            </div>
        );
    }
}

export default FadeMenu;
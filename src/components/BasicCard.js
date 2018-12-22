import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MenuTest from './FadeMenu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    card: {
        width: '320px',
        height: '155px',
        margin: '32px',
    },
    content: {
        width: '60%',
        height: '100%'
    },
    details: {
        height: '30%'
    },
    cover: {
        width: '151',
    },
    icon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


class BasicCard extends Component {
    
    onMenuClick = onClick => {
        if (this.menu) {
            this.menu.handleClose();
            onClick();
        }
    }
    
    render() {
        const { classes, options } = this.props;
        return (
            <div>
                <Card className={classes.card} >
                    <div className="d-flex justify-content-between">
                        <div className={classes.content} >
                            <div className="d-flex justify-content-between">

                                <CardContent style={{padding: '15px'}}>
                                    <h6  >
                                        {this.props.title}
                                    </h6>
                                
                                    <Typography  class="d-flex align-items-stretch"  variant="subtitle1" color="textSecondary">
                                        {this.props.description}
                                    </Typography>
                            
                                </CardContent>
                                <MenuTest ref={ref => this.menu = ref} >
                                    {
                                        options.map(option => (
                                            <MenuItem onClick={ () => this.onMenuClick(option.onClick)}>{option.title}</MenuItem>
                                            ))
                                    }
                                </MenuTest>
                            </div>
                        </div>
                        <div style={{ width: '40%', height: '155px', backgroundColor: '#E0E0E0' }} className={classes.icon}>
                            {this.props.icon}
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}
BasicCard.PropTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicCard);
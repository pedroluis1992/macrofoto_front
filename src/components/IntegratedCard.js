import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import MenuTest from './FadeMenu';
import MenuItem from '@material-ui/core/MenuItem';



const styles = theme => ({
    card: {
        width: '380px',
        margin: '32px',
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class IntegratedCard extends Component {

    onMenuClick = onClick => {
        if (this.menu) {
            this.menu.handleClose();
            onClick();
        }
    }

    constructor() {
        super()

        this.state = { expanded: false }
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes, options } = this.props;
        return (
            <Card className={classes.card}>
                {
                    this.props.cardHeader === true ?
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                    {this.props.avatar}
                                </Avatar>
                            }
                            action={
                                <MenuTest ref={ref => this.menu = ref} >
                                    {
                                        options && options.map(option => (
                                            <MenuItem onClick={() => this.onMenuClick(option.onClick)}>{option.title}</MenuItem>
                                        ))
                                    }
                                </MenuTest>
                            }
                            title={this.props.title}
                            subheader={this.props.subheader}
                        />
                        : null
                }
                {
                    this.props.cardImage === true ?
                        <CardMedia
                            className={classes.media}
                            image={this.props.image}
                            title={this.props.name}
                        />
                        : null
                }
                {
                    this.props.cardfooter === true ?
                        <div>
                            <CardContent>
                                <Typography component="p">
                                    {this.props.content}
                                </Typography>
                            </CardContent>
                            <CardActions className={classes.actions} style={{ marginBottom: '10%' }} >
                                {/* <div style={{ marginLeft: '30%' }}>
                  <Button variant="contained" color="secondary" className={classes.button}>
                    Opciones
                    </Button>
                </div> */}
                            </CardActions>
                        </div>
                        : null
                }
            </Card>
        );
    }
}

IntegratedCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegratedCard);
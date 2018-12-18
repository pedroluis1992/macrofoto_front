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



const styles = theme => ({
  card: {
    maxWidth: 350,
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

  constructor() {
    super()

    this.state = { expanded: false }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="container">
        <Card className={classes.card}>
          {
            this.props.cardHeader === true ?
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    {this.props.avatar}  
                  </Avatar>
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
                  <div style={{ marginLeft: '30%' }}>
                    <Button variant="contained" color="secondary" className={classes.button}>
                      Opciones
                    </Button>
                  </div>
                </CardActions>
              </div>
            : null
          }
        </Card>
      </div>
    );
  }
}

IntegratedCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegratedCard);
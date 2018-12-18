import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';


const styles = theme => ({
  card: {
    width: '300px',
    height: '90%',
    margin: '5%'
  },
  content: {
    width: '90%',
    height: '100%'
  },
  details: {
    height: '60%'
  },
  cover: {
    width: 151,
  },
});

class BasicCard extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card} >
          <div className={classes.details}>
        
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {this.props.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {this.props.description}
                </Typography>
              </CardContent>
              <CardMedia
                className={classes.cover}
                image={this.props.image}
              />
            </div>
       
          <div className={{ marginBottom: '1px' }}>
            <CardActions className={classes.cardOptions}>
              {this.props.button}
            </CardActions>
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
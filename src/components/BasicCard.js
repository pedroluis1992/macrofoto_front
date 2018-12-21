import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    width: '320px',
    height: '120px',
    margin: '32px',
    overflow: 'visible'

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
  }
});

class BasicCard extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card} >
          <div className="d-flex justify-content-between">
            <div className={classes.content} >
              <div className="d-flex justify-content-between">
                <CardContent>
                  <h6>
                    {this.props.title}
                  </h6>
                  <Typography variant="subtitle1" color="textSecondary">
                    {this.props.description}
                  </Typography>
                </CardContent>
                <div >
                  {this.props.button}
                </div>
              </div>
            </div>
            <div style={{ width: '40%', height: '120px', backgroundColor: '#E0E0E0' }} className={classes.icon}>
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
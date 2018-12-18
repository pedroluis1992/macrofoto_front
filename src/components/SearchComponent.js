import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';



const styles = ({
  container: {
    border: '2px',
    background: '#E4DDDD',
    padding: '10px',
    paddingLeft: '20px',
    borderRadius: '25px',
    width: '100%'
  }
});


class SearchComponent extends Component {
  render() {

    return (
      <div>
        <input style={styles.container} placeholder={this.props.placeholder} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
      </div>
    );
  }
}




export default withStyles(styles)(SearchComponent);
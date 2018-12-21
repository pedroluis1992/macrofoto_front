import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  add: {
    width: '60px',
    height: '60px',
    position: 'fixed',
    bottom: '20px',
    right: '30px',
    Zindex: '99',
    fonTsize: '18px',
    border: 'none',
    outline: 'none',
    backgroundColor: '#ff1744',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '50%'
  }
}

class ButtonAdd extends Component {
  render() {
    return (
      <div>
        <button className="d-flex align-items-center justify-content-center" style={styles.add} onClick={this.props.submit} >
          <AddIcon />
        </button>
      </div>
    );
  }
}

export default ButtonAdd;
import React,{Component} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import MenuTest from './FadeMenu';
import MenuItem from '@material-ui/core/MenuItem';



const styles = ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    
  },
  gridList: {
    width: 300,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class CategoryCard extends Component{
  onMenuClick = onClick => {
    if (this.menu) {
        this.menu.handleClose();
        onClick();
    }
}
render(){
  const { classes, options } = this.props;
  return (
    <div styles={styles.root}>
      <GridList spacing={40} cellHeight={180} >
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
        </GridListTile>     
          <GridListTile key={this.props.img} style={{margin: '1%', width: '300px'}}>
            <img src={this.props.img} alt={"Categoria"} />
            <GridListTileBar
              title={this.props.title}
              subtitle={<span>descripcion: {this.props.description}</span>}
              actionIcon={
                <MenuTest ref={ref => this.menu = ref} >
                  {
                      options.map(option => (
                          <MenuItem onClick={ () => this.onMenuClick(option.onClick)}>{option.title}</MenuItem>
                          ))
                  }
                </MenuTest>
              }
            />
          </GridListTile>
      </GridList>
    </div>
  );
}


}
export default CategoryCard;
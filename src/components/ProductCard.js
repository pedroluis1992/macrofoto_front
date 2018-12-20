import React,{Component} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import regalo from '../images/regalo.jpeg'
import marcos from '../images/marcos.jpeg'
import regalos from '../images/regalos.jpeg'



const styles = ({
  root: {
    margin: '5%',
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



 
  const tileData = [
    {
      img: marcos,
      title: 'Marco',
      author: 'Marco para tu foto',
    },
    {
      img: regalo,
      title: 'Cajita',
      author: 'Cajita de regalo', 
    },
    {
      img: regalos  ,
      title: 'Regalos',
      author: 'Regalos divversos', 
    },
  ];
 
class ProductCard extends Component{
render(){

  return (
    <div styles={styles.root}>
      <GridList cellHeight={180} >
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        {tileData.map(tile => (
          <GridListTile key={tile.img} style={{margin: '1%', width: '300px'}}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>descripcion: {tile.author}</span>}
              actionIcon={
                <IconButton >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}


}
export default ProductCard;
import "../../App.css";
import Item from '../Item/Item';


const ItemList = ({items1}) => {
    return (
        <div className='ListGroup'>
            {items1.map(prod => <Item key={prod.id}{...prod}/>)}
        </div>
    );
};

export default ItemList;
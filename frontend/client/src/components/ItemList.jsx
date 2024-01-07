import Item from "./Item";

const ItemList = ({ products }) => {
  return (
    <>
      {products.map(product => (
        <Item key={product._id} product={product} />
      ))}
    </>
  );
}

export default ItemList;
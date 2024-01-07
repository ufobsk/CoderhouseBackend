const Item = ({ product }) => {
    return (
      <div className="col-md-4 my-4">
        <div className="card border border-0">
          <div className="card" style={{ width: '18rem', margin: '5px' }}>
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">{product.category}</p>
              <p className="card-text">${product.price}</p>
              <p className="card-text">{product.stock} Unidades</p>
              <button className="btn btn-secondary">Ver Producto</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Item;
  
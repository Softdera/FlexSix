import React from 'react';

const Product = ({ product, addToCart }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <span>{product.name} - ${product.price}</span>
      <button
        onClick={() => addToCart(product)}
        style={{ marginLeft: '10px', padding: '5px 10px' }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
import React from 'react';

const CartItem = ({ item, removeFromCart }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <span>{item.name} - ${item.price}</span>
      <button
        onClick={() => removeFromCart(item.id)}
        style={{ marginLeft: '10px', padding: '5px 10px' }}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;

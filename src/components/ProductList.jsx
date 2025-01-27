import React, { useState } from 'react';
import Product from './Product';
import CartItem from './CartItem';

const ProductList = () => {
  const [products] = useState([
    { id: 1, name: 'Product A', price: 50 },
    { id: 2, name: 'Product B', price: 100 },
    { id: 3, name: 'Product C', price: 150 },
  ]);

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');

  // Add to Cart Function
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Remove from Cart Function
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Filter Products by Search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Product List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
      />

      {/* Product List */}
      <div>
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {/* Cart */}
      <h2>Shopping Cart</h2>
      <div>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
        ))}
        {cart.length === 0 && <p>Your cart is empty.</p>}
      </div>
    </div>
  );
};

export default ProductList;
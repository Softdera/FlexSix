import React, { useState, useEffect } from 'react';
import './App.css';

// Virtual DOM Example
const VirtualDOMExample = () => (
  <div>
    <h1>Virtual DOM</h1>
    <p>The Virtual DOM allows React to efficiently update the UI by comparing changes in memory before applying them to the actual DOM.</p>
  </div>
);

// Product Component (Props Example)
const Product = ({ product, addToCart }) => (
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

// CartItem Component
const CartItem = ({ item, removeFromCart }) => (
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

// Lifecycle Component Example
class LifecycleExample extends React.Component {
  state = { data: null };

  componentDidMount() {
    console.log('Component mounted!');
    // Simulating data fetch
    setTimeout(() => this.setState({ data: 'Hello, World!' }), 1000);
  }

  componentDidUpdate() {
    console.log('Component updated!');
  }

  componentWillUnmount() {
    console.log('Component will unmount!');
  }

  render() {
    return <h1>{this.state.data || 'Loading...'}</h1>;
  }
}

// Fragment Example
const FragmentExample = () => (
  <>
    <h1>Fragment Example</h1>
    <p>Fragments help avoid adding extra nodes to the DOM.</p>
  </>
);

// Event Handlers Example
const EventHandlerExample = () => {
  const handleClick = () => alert('Button clicked!');

  return (
    <div>
      <h1>Event Handlers Example</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

// Product List Component
const ProductList = () => {
  const [products, setProducts] = useState([
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

// Main Component to Render All Examples
const App = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <VirtualDOMExample />
      <ProductList />
      <LifecycleExample />
      <FragmentExample />
      <EventHandlerExample />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';

// Virtual DOM Example
const VirtualDOMExample = () => (
  <div>
    <h1>Virtual DOM</h1>
    <p>
      The Virtual DOM allows React to efficiently update the UI by comparing
      changes in memory before applying them to the actual DOM.
    </p>
  </div>
);

// Product Component (Props Example)
const Product = ({ product, addToCart, updateProductPrice }) => (
  <div style={{ marginBottom: '10px' }}>
    <span>
      {product.name} - ${product.price}
    </span>
    <button
      onClick={() => addToCart(product)}
      style={{ marginLeft: '10px', padding: '5px 10px' }}
    >
      Add to Cart
    </button>
    {/* Example button to update product price using a PUT call */}
    <button
      onClick={() => updateProductPrice(product.id)}
      style={{ marginLeft: '10px', padding: '5px 10px' }}
    >
      Update Price
    </button>
  </div>
);

// CartItem Component
const CartItem = ({ item, removeFromCart }) => (
  <div style={{ marginBottom: '10px' }}>
    <span>
      {item.name} - ${item.price}
    </span>
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

// Product List Component with API calls
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');

  // GET: Fetch products when the component mounts
  useEffect(() => {
    fetch('https://api.example.com/products') // Replace with your GET endpoint
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // POST: Add to Cart Function
  const addToCart = (product) => {
    // Simulate POST to add the product to a remote cart
    fetch('https://api.example.com/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns the added item
        setCart([...cart, data]);
      })
      .catch((error) => console.error('Error adding to cart:', error));
  };

  // DELETE: Remove from Cart Function
  const removeFromCart = (id) => {
    // Simulate DELETE request to remove the product from a remote cart
    fetch(`https://api.example.com/cart/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setCart(cart.filter((item) => item.id !== id));
        } else {
          console.error('Error deleting from cart');
        }
      })
      .catch((error) => console.error('Error removing from cart:', error));
  };

  // PUT: Update a product's price (example function)
  const updateProductPrice = (id) => {
    // For demonstration, we'll increase the price by 10
    const productToUpdate = products.find((p) => p.id === id);
    if (!productToUpdate) return;

    const updatedProduct = { ...productToUpdate, price: productToUpdate.price + 10 };

    // Simulate PUT request to update the product
    fetch(`https://api.example.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the product in the local state after successful PUT
        setProducts(
          products.map((product) =>
            product.id === id ? { ...product, price: data.price } : product
          )
        );
      })
      .catch((error) => console.error('Error updating product:', error));
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
          <Product
            key={product.id}
            product={product}
            addToCart={addToCart}
            updateProductPrice={updateProductPrice}
          />
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

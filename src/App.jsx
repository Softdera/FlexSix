import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Custom Hook: useFetch (uses async/await)
function useFetch(url) {
  // useState: Manage data and loading state.
  const [data, setData] = useState([]);       // <-- data state
  const [loading, setLoading] = useState(true); // <-- loading state

  // useEffect: Fetch data when the URL changes.
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, setData, loading };
}

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
    <span>{product.name} - ${product.price}</span>
    <button
      onClick={() => addToCart(product)}
      style={{ marginLeft: '10px', padding: '5px 10px' }}
    >
      Add to Cart
    </button>
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
    <span>{item.name} - ${item.price}</span>
    <button
      onClick={() => removeFromCart(item.id)}
      style={{ marginLeft: '10px', padding: '5px 10px' }}
    >
      Remove
    </button>
  </div>
);

// Lifecycle Component Example (Class Component)

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

// ProductList Component (uses custom hook, useState, useEffect, useRef, async/await)
const ProductList = () => {
  // Custom Hook: useFetch returns products, setData (as setProducts), and loading state.
  const { data: products, setData: setProducts, loading } = useFetch(
    'https://api.example.com/products'
  );
  // useState: Manage cart and search query.
  const [cart, setCart] = useState([]);   // <-- cart state
  const [search, setSearch] = useState(''); // <-- search state
  // useRef: Reference for the search input.
  const searchInputRef = useRef(null);     // <-- useRef for input

  // useEffect: Focus the search input on mount.
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Async function using async/await: Add product to cart.
  const addToCart = async (product) => {
    try {
      const response = await fetch('https://api.example.com/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      setCart([...cart, data]);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Async function: Remove product from cart.
  const removeFromCart = async (id) => {
    try {
      const response = await fetch(`https://api.example.com/cart/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCart(cart.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  // Async function: Update product price.
  const updateProductPrice = async (id) => {
    const productToUpdate = products.find((p) => p.id === id);
    if (!productToUpdate) return;
    const updatedProduct = { ...productToUpdate, price: productToUpdate.price + 10 };

    try {
      const response = await fetch(`https://api.example.com/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      const data = await response.json();
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, price: data.price } : product
        )
      );
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Product List</h1>
      {/* Search Bar (uses useState and useRef) */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ref={searchInputRef} // <-- useRef attached here
        style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
      />
      {/* Display Products */}
      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product
              key={product.id}
              product={product}
              addToCart={addToCart}
              updateProductPrice={updateProductPrice}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      {/* Shopping Cart */}
      <h2>Shopping Cart</h2>
      <div>
        {cart.length > 0 ? (
          cart.map((item) => (
            <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

// New Component: AddProductForm (uses FormData, async/await, and useState)
const AddProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create FormData to send as multipart/form-data.
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);

    try {
      const response = await fetch('https://api.example.com/add-product', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setMessage('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Error adding product');
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

// New Function: simulateDelay (returns a promise)
const simulateDelay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};


// New Component: PromiseExample (demonstrates a promise and async/await)
const PromiseExample = () => {
  const [status, setStatus] = useState('Waiting...');

  useEffect(() => {
    async function waitForDelay() {
      setStatus('Waiting for 2 seconds...');
      await simulateDelay(2000); // wait for 2 seconds
      setStatus('2 seconds passed!');
    }
    waitForDelay();
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Promise & Async/Await Example</h2>
      <p>{status}</p>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <VirtualDOMExample />
      <ProductList />
      <LifecycleExample />
      <FragmentExample />
      <EventHandlerExample />
      {/* New Components */}
      <JsonDisplay />
      <AddProductForm />
      <PromiseExample />
    </div>
  );
};

// New Component: JsonDisplay (displays a JSON object)
const JsonDisplay = () => {
  // A sample JSON object.
  const sampleJson = {
    name: 'React',
    version: '18',
    description: 'A JavaScript library for building user interfaces',
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>JSON Data</h2>
      <pre>{JSON.stringify(sampleJson, null, 2)}</pre>
    </div>
  );
};

export default App;

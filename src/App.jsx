import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function useFetch(url) {
  // useState: Managing data state and loading state.
  const [data, setData] = useState([]);      
  const [loading, setLoading] = useState(true);

  // useEffect: Fetching data when the URL changes.
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [url]); 

  // Return data, a setter for data, and the loading state.
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
    <span>
      {product.name} - ${product.price}
    </span>
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

// Lifecycle Component Example (Class Component)
class LifecycleExample extends React.Component {
  state = { data: null };

  componentDidMount() {
    console.log('Component mounted!');
    // Simulate a data fetch after 1 second.
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


const FragmentExample = () => (
  <>
    <h1>Fragment Example</h1>
    <p>Fragments help avoid adding extra nodes to the DOM.</p>
  </>
);


const EventHandlerExample = () => {
  const handleClick = () => alert('Button clicked!');
  return (
    <div>
      <h1>Event Handlers Example</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};


const ProductList = () => {
  // Custom Hook: useFetch returns products data and a setter (setData) for products.
  const { data: products, setData: setProducts, loading } = useFetch(
    'https://api.example.com/products'
  );

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');     

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []); 

  // Function to add a product to the cart.
  const addToCart = (product) => {
    fetch('https://api.example.com/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => setCart([...cart, data]))
      .catch((error) => console.error('Error adding to cart:', error));
  };

  // Function to remove a product from the cart.
  const removeFromCart = (id) => {
    fetch(`https://api.example.com/cart/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setCart(cart.filter((item) => item.id !== id));
        }
      })
      .catch((error) => console.error('Error removing from cart:', error));
  };

  // Function to update a product's price.
  const updateProductPrice = (id) => {
    const productToUpdate = products.find((p) => p.id === id);
    if (!productToUpdate) return;
    const updatedProduct = { ...productToUpdate, price: productToUpdate.price + 10 };

    fetch(`https://api.example.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(
          products.map((product) =>
            product.id === id ? { ...product, price: data.price } : product
          )
        );
      })
      .catch((error) => console.error('Error updating product:', error));
  };

  // Filtering products based on search input.
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ref={searchInputRef}  
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


// Main App Component
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

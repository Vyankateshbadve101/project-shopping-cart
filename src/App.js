import react , { useState } from 'react';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 1
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      quantity: 1
    },
    {
      id: 3,
      name: "Product 3",
      price: 500,
      quantity: 1
    }
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const newCart = [...cart];
    const itemIndex = newCart.findIndex((i) => i.id === item.id);
    if (itemIndex < 0) {
      newCart.push({
        ...item,
        quantity: 1
      });
    } else {
      newCart[itemIndex].quantity += 1;
    }
    setCart(newCart);
  };

  const removeFromCart = (item) => {
    const newCart = [...cart];
    const itemIndex = newCart.findIndex((i) => i.id === item.id);
    if (itemIndex >= 0) {
      newCart[itemIndex].quantity -= 1;
      if (newCart[itemIndex].quantity === 0) {
        newCart.splice(itemIndex, 1);
      }
      setCart(newCart);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <div className="card d-flex p-3 bg-info flex-fill">
      <h1 className='d-flex justify-content-center'>Shopping Cart</h1>
      <div className="card d-grid gap-100">
        {items.map((item) => (
          <div className="fs-2 d-flex justify-content-between bg-denger" key={item.id}>
            <h3 className='d-flex justify-content-start'>{item.name}</h3>
            <p className='fs-2 d-flex justify-content-end'>${item.price}</p>
            <button className=" w-20 p-3 f-2 d-flex flex-col justify-content-start bg-secondary" onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        {cart.map((item) => (
          <div className="card" key={item.id}>
            <h3 className='d-flex justify-content-center'>{item.name}</h3>
            <p className='fs-3 d-flex justify-content-center'>${item.price} x {item.quantity}</p>
            <button className="fs-2 w-10 p-3 d-flex-col" onClick={() => removeFromCart(item)}>Remove</button>
          </div>
        ))}
        <h3>Total: ${getTotalPrice()}</h3>
      </div>
    </div>
  );
}

export default App;

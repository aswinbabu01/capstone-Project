import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../Redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cart = useSelector(state => state.cart.cart);
  const total = useSelector(state => state.cart.total);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('Cart items:', cart);
  console.log('Cart total:', total);

  const formattedTotal = Number.isFinite(total) ? total.toFixed(2) : '0.00';

  const MakePayment = async () => {
    navigate(`/payment?total=${formattedTotal}`);     
  }

  return (
    <div>
      <div className="container-md mt-5">
        <div className="d-flex justify-content-center mt-5 text-bg-secondary rounded-4">
          <h1>Your cart</h1>
        </div>
        <div className="cart mt-4">
          {cart.length === 0 ? (
            <div className="d-flex justify-content-center fs-5" style={{ marginTop: "100px" }}>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="container mt-5">
              {cart.map(item => {
                const itemPrice = typeof item.price === 'number' ? item.price : 0;
                const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 1;
                const itemTotal = itemPrice * itemQuantity;

                return (
                  <div key={item.id} className="row mb-3">
                    <div className="col-md-4">
                      <img
                        src={item.image}
                        className="img-fluid rounded-start"
                        alt={item.head}
                      />
                    </div>
                    <div className="col-md-6">
                      <h5>{item.head}</h5>
                      <p>{item.Type}</p>
                      <div className="d-flex align-items-center">
                        <label htmlFor={`quantity-${item.id}`} className="me-2">Quantity:</label>
                        <select
                          id={`quantity-${item.id}`}
                          value={item.quantity}
                          onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) }))}
                          className="form-select w-auto"
                        >
                          {[...Array(10).keys()].map(n => (
                            <option key={n + 1} value={n + 1}>{n + 1}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2 d-flex flex-column align-items-end">
                      <div className="fs-5">Price: ${itemTotal.toFixed(2)}</div>
                      <button
                        type="button"
                        className="btn btn-danger mt-2"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        Remove from cart
                      </button>
                    </div>
                  </div>
                );
              })}
             
              <div className="pay m-5 d-grid gap-2">
                <button type="button" className="btn btn-primary btn-lg" onClick={MakePayment}>Pay now</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

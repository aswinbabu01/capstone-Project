import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../Redux/cartSlice';
import axios from 'axios';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const isInCart = cart.some(item => item.id === product.id);
  const handleAddToCart = async() => {
    dispatch(addToCart(product));
    const cartItems = {
      userid:localStorage.getItem('userid'),
      Email:localStorage.getItem('email'),
      ProductDetails:{
            head:product.head,
            id:product.id,
            image:product.image,
            Type:product.Type,
            price:product.price,
            quantity:product.quantity
      }
    }
    const res = await axios.post('/api/AddToCart',cartItems,{
      headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    });
    console.log(res.data)
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
      <div className="card h-100">
        <img src={product.image} className="card-img-top" alt={product.head} />
        <div className="card-body">
          <h5 className="card-title">{product.head}</h5>
          <p className="card-text">{product.Type}</p>
          <div className="fs-4">Price:$ {product.price}</div>
          {isInCart ? (
            <button
              type="button"
              className="btn btn-danger mt-2"
              onClick={handleRemoveFromCart}
            >
              Remove from cart
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
  ProductCard.propTypes = {
    head: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
  };
};

export default ProductCard;

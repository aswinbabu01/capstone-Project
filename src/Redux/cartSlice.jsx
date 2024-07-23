import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
      console.log('Added to cart:', action.payload);
      console.log('New total:', state.total);
    },
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.total -= state.cart[index].price * state.cart[index].quantity;
        state.cart.splice(index, 1);
        console.log('Removed from cart:', action.payload);
        console.log('New total:', state.total);
      }
    },
    updateQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        state.total -= item.price * item.quantity;
        item.quantity = action.payload.quantity;
        state.total += item.price * item.quantity;
        console.log('Updated quantity for item:', action.payload);
        console.log('New total:', state.total);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

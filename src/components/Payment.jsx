import React, {useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading,setloading]=useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await axios.get('/api/create-intent', {      
      headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    });
    
    const {client_secret: clientSecret} = res.data;
    console.log(clientSecret);

    setloading(true);
    const {error} = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setloading(false);
    } else {
      setloading(false);
    }
  };
  
  
  return (
    
    <form onSubmit={handleSubmit}>      
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const stripePromise = loadStripe('pk_test_51PeAQV2NInAxFuBu9IsEGR3cCJtRJZcppP2TBMHA8QgYtANeCWRsT8JK0fSLCgpbyTbWvFRsLaMFpykYoD5GAQ5200g7ruBFBG');
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    appearance: {
      colorPrimary: '#000000',
      colorBackground: '#ffffff', 
      colorText: '#000000', 
      colorDanger: '#ff0000', 
      fontFamily: 'Arial, sans-serif', 
      spacingUnit: '4px', 
      borderRadius: '4px', 
    },
  };

 
const Payment=()=>{
  console.log(stripePromise.then((data)=>console.log(data)));
    return <Elements stripe={stripePromise} options={options}>
        <CheckoutForm/>
    </Elements>
}
export default Payment

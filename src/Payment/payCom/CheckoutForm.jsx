import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const { user, cardDetails, price } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [cardError, setCardError] = useState("");

  useEffect(() => {
    if (price > 0) {
      axios
        .post("https://eduvi-server.vercel.app/create-payment-intent", {
          price,
        })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast(error.message);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("payment method", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }
    console.log(transactionId);
    console.log("payment intent", paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      // save payment information to the server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        quantity: cardDetails.length,
        cartItems: cardDetails.map((item) => item._id),
        menuItems: cardDetails.map((item) => item.courseID),
        status: "service pending",
        payment: "succeeded",
        itemNames: cardDetails.map((item) => item.coursename),
      };
      axios
        .post("https://eduvi-server.vercel.app/payments", payment)
        .then((res) => {
          console.log(res.data);
          if (res.data.result?.insertedId) {
            console.log(res.data.result.insertedId);
          }
        });
    }
  };

  return (
    <div>
      <div className='flex justify-center flex-col mt-10'>
        <form onSubmit={handleSubmit} className='w-10/12 '>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type='submit'
            className='px-10 py-2 bg-indigo-600 text-white hover:bg-indigo-500   border my-5 rounded-lg font-bold cursor-pointer '
            disabled={!stripe || !elements || !clientSecret || processing}>
            Pay
          </button>
        </form>
        {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
        {transactionId && (
          <p className='text-green-500'>
            Transaction complete with transactionId: {transactionId}
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;

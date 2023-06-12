import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./payCom/CheckoutForm";
import BG from "../assets/Homepage/BG.png";

const stripePromise = loadStripe(
  "pk_test_51NFpaeJ7FWG6xHBAYg1TJf0STZAwkRyfmueLaqGxbAVcY1LyPVSVJPstEnVuJNThfUlgVQMOCbimbjm6Y54ISgBI004Mfx7Zbf",
);
const Payment = () => {
  return (
    <div>
      <div
        className='relative '
        data-aos='flip-right'
        data-aos-easing='ease-out-cubic'
        data-aos-duration='900'>
        <img src={BG} alt='Your Image' className='w-full' />
        <div className='absolute inset-0 bg-black/10 opacity-10 rounded-2xl'></div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='text-2xl md:text-4xl lg:text-6xl font-bold text-indigo-500'>
            Pay Now
          </span>
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;

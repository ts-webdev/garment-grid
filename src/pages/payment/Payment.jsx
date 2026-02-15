// pages/payment/Payment.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCreditCard, 
  FaLock, 
  FaCheckCircle,
  FaArrowLeft,
  FaShoppingBag
} from 'react-icons/fa';
import { 
  Elements, 
  CardElement, 
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';
import { stripePromise } from '../../lib/stripe';
import Container from '../../components/shared/Container';
import useAxios from '../../hooks/useAxios';
import toast from 'react-hot-toast';

const PaymentForm = ({ bookingData, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { postData } = useAxios();
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setCardError('');

    try {
      // 1. Create payment intent on server
      const { clientSecret } = await postData('/create-payment-intent', {
        amount: bookingData.totalPrice * 100, // Convert to cents
        currency: 'usd',
        bookingData
      });

      // 2. Confirm payment with Stripe
      const cardElement = elements.getElement(CardElement);
      
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${bookingData.firstName} ${bookingData.lastName}`,
            email: bookingData.email,
            phone: bookingData.contactNumber
          }
        }
      });

      if (error) {
        setCardError(error.message);
        toast.error(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        // 3. Save booking to database
        await postData('/bookings', {
          ...bookingData,
          paymentStatus: 'paid',
          paymentIntentId: paymentIntent.id,
          status: 'confirmed'
        });
        
        toast.success('Payment successful! Order confirmed.');
        onSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error?.response?.data?.message || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Element */}
      <div className="bg-[#e8e0d4]/20 p-4 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="bg-white p-4 rounded-lg border border-[#e8e0d4]">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Error Message */}
      {cardError && (
        <p className="text-red-500 text-sm">{cardError}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-gradient-to-r from-[#4d3d30] to-[#703B3B] text-white py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {processing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </>
        ) : (
          <>
            <FaLock />
            Pay ${bookingData?.totalPrice?.toFixed(2)}
          </>
        )}
      </button>

      {/* Security Note */}
      <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
        <FaLock className="text-green-600" />
        Your payment information is secure and encrypted
      </p>
    </form>
  );
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;

  useEffect(() => {
    // Redirect if no booking data
    if (!bookingData) {
      toast.error('No booking information found');
      navigate('/all-products');
    }
  }, [bookingData, navigate]);

  const handleSuccess = () => {
    // Redirect to My Orders page after successful payment
    setTimeout(() => {
      navigate('/dashboard/my-orders');
    }, 2000);
  };

  if (!bookingData) return null;

  return (
    <div className="bg-white min-h-screen mt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#4d3d30] to-[#703B3B] text-white py-12 overflow-hidden">
        <Container>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <FaArrowLeft /> Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold racing-sans">
            Complete <span className="text-[#e8e0d4]">Payment</span>
          </h1>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Order Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl border border-[#e8e0d4] overflow-hidden mb-8"
            >
              <div className="bg-gradient-to-r from-[#4d3d30] to-[#703B3B] p-4">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <FaShoppingBag />
                  Order Summary
                </h2>
              </div>

              <div className="p-6">
                {/* Product Info (Read-only) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-xs text-gray-500">Product</p>
                    <p className="font-medium text-[#4d3d30]">{bookingData.productName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Quantity</p>
                    <p className="font-medium text-[#4d3d30]">{bookingData.quantity} pieces</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Price per piece</p>
                    <p className="font-medium text-[#4d3d30]">${bookingData.pricePerPiece?.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-2xl font-bold text-[#703B3B]">
                      ${bookingData.totalPrice?.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Customer Info (Read-only) */}
                <div className="border-t border-[#e8e0d4] pt-6">
                  <h3 className="font-medium text-[#4d3d30] mb-3">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="text-sm">{bookingData.firstName} {bookingData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm">{bookingData.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm">{bookingData.contactNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Delivery Address</p>
                      <p className="text-sm">{bookingData.deliveryAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="border-t border-[#e8e0d4] pt-6 mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FaCreditCard className="text-[#703B3B]" />
                    <h3 className="font-medium text-[#4d3d30]">Payment Method: {bookingData.paymentMethod}</h3>
                  </div>

                  {/* Payment Form - Only for online payments */}
                  {bookingData.paymentMethod !== 'Cash on Delivery' && (
                    <Elements stripe={stripePromise}>
                      <PaymentForm bookingData={bookingData} onSuccess={handleSuccess} />
                    </Elements>
                  )}

                  {/* Cash on Delivery Option */}
                  {bookingData.paymentMethod === 'Cash on Delivery' && (
                    <div className="text-center py-8">
                      <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-[#4d3d30] mb-2">
                        Order Placed Successfully!
                      </h3>
                      <p className="text-gray-600 mb-6">
                        You'll pay ${bookingData.totalPrice?.toFixed(2)} upon delivery
                      </p>
                      <button
                        onClick={() => navigate('/dashboard/my-orders')}
                        className="bg-[#703B3B] text-white px-8 py-3 rounded-lg hover:bg-[#4d3d30] transition-colors"
                      >
                        View My Orders
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <FaLock className="text-[#703B3B] text-xl mx-auto mb-2" />
                <p className="text-xs text-gray-600">Secure Payment</p>
              </div>
              <div className="p-4">
                <FaCheckCircle className="text-[#703B3B] text-xl mx-auto mb-2" />
                <p className="text-xs text-gray-600">Money-back Guarantee</p>
              </div>
              <div className="p-4">
                <FaCreditCard className="text-[#703B3B] text-xl mx-auto mb-2" />
                <p className="text-xs text-gray-600">Multiple Payment Options</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Payment;
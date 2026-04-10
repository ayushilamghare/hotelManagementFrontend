import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function StripePayment({ amount, roomName, bookingDetails, onPaymentSuccess, onPaymentFail }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Call backend to create payment intent
            const response = await fetch('http://localhost:5000/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: Math.round(amount * 100), // Convert to paise
                    roomName,
                    bookingDetails,
                }),
            });

            const data = await response.json();

            if (!data.clientSecret) {
                setError('Failed to create payment intent');
                setLoading(false);
                return;
            }

            // Confirm payment
            const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: bookingDetails.guestName || 'Guest',
                        email: bookingDetails.email || '',
                    },
                },
            });

            if (paymentResult.error) {
                setError(paymentResult.error.message);
                onPaymentFail(paymentResult.error.message);
            } else {
                onPaymentSuccess(paymentResult.paymentIntent);
            }
        } catch (err) {
            setError(err.message);
            onPaymentFail(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-indigo-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">💳 Payment Details</h3>

            <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700 mb-2">
                    <span className="font-bold">Room:</span> {roomName}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-bold">Amount to Pay:</span> <span className="text-xl font-bold text-indigo-600">₹{amount.toFixed(2)}</span>
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-6 p-4 border-2 border-gray-300 rounded-lg">
                    <CardElement
                        options={{
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
                        }}
                    />
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-shadow disabled:opacity-50"
                >
                    {loading ? 'Processing Payment...' : `Pay ₹${amount.toFixed(2)}`}
                </button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
                🔒 Your payment is secure and encrypted
            </p>
        </div>
    );
}

export default StripePayment;

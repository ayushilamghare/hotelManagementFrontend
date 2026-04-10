import { useState } from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import UPIPayment from "../components/UPIPayment";
import NetBankingPayment from "../components/NetBankingPayment";
import CashPayment from "../components/CashPayment";

function RoomDetails({ room, setScreen, bookings, setBookings }) {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [error, setError] = useState("");
    const [bookingStarted, setBookingStarted] = useState(false);
    const [paymentMethodSelected, setPaymentMethodSelected] = useState(null);
    const [guestName, setGuestName] = useState("");
    const [guestEmail, setGuestEmail] = useState("");
    const [loading, setLoading] = useState(false);
    
    const stripe = useStripe();
    const elements = useElements();

    const getTotalPrice = () => {
        if (!checkIn || !checkOut) return 0;
        const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
        return days * room.price;
    };

    const getTotalDays = () => {
        if (!checkIn || !checkOut) return 0;
        return Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    };

    const handleBooking = () => {
        if (!checkIn || !checkOut) {
            setError("Please select check-in and check-out dates");
            return;
        }

        if (new Date(checkOut) <= new Date(checkIn)) {
            setError("Check-out date must be after check-in date");
            return;
        }

        if (!guestName || !guestEmail) {
            setError("Please enter your name and email");
            return;
        }

        setBookingStarted(true);
        setError("");
    };

    const handlePaymentMethodSelect = (method) => {
        setPaymentMethodSelected(method);
        setError("");
    };

    const createBooking = (paymentIntentId, method) => {
        const totalPrice = getTotalPrice();
        const days = getTotalDays();

        const booking = {
            id: bookings.length + 1,
            roomName: room.name,
            roomId: room.id,
            checkIn,
            checkOut,
            guests,
            guestName,
            guestEmail,
            totalDays: days,
            totalPrice,
            paymentIntentId,
            paymentMethod: method,
            bookingDate: new Date().toLocaleDateString(),
            status: method === 'cash' ? "Confirmed (Pending Payment)" : "Confirmed"
        };

        setBookings([...bookings, booking]);
        setError("");
        alert(`✅ Booking confirmed! Your booking ID is: ${booking.id}`);
        setScreen("bookings");
    };

    const handlePaymentSuccess = (paymentData) => {
        createBooking(paymentData.id, paymentData.method);
    };

    const handlePaymentFail = (errorMessage) => {
        setError(errorMessage);
    };

    const handleStripePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setError("");

        try {
            const totalPrice = getTotalPrice();

            // Create payment intent
            const response = await fetch('http://localhost:5000/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: Math.round(totalPrice * 100),
                    roomName: room.name,
                    guestName,
                    guestEmail,
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
                        name: guestName,
                        email: guestEmail,
                    },
                },
            });

            if (paymentResult.error) {
                setError(paymentResult.error.message);
                handlePaymentFail(paymentResult.error.message);
            } else {
                handlePaymentSuccess({
                    id: paymentResult.paymentIntent.id,
                    status: paymentResult.paymentIntent.status,
                    method: 'card',
                });
            }
        } catch (err) {
            setError(err.message);
            handlePaymentFail(err.message);
        }

        setLoading(false);
    };

    if (!room) {
        return <div>No room selected</div>;
    }

    return (
        <>
            {/* Navigation Bar */}
            <nav className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 p-6 flex justify-between items-center shadow-lg sticky top-0 z-50">
                <div className="text-3xl font-bold text-white tracking-tight">🏨 Hotel Management</div>
                <button onClick={() => setScreen("home")} className="bg-white text-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-indigo-100 transition-colors">
                    Back to Home
                </button>
            </nav>

            {/* Room Details Section */}
            <div className="w-full bg-gradient-to-b from-gray-50 to-white min-h-screen px-6 sm:px-12 lg:px-20 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        
                        {/* Image Section */}
                        <div className="flex flex-col gap-4">
                            <img 
                                src={room.image} 
                                alt={room.name}
                                className="w-full h-96 object-cover rounded-xl shadow-lg"
                            />
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                                    <div className="text-3xl mb-2">🛏️</div>
                                    <p className="text-sm text-gray-600">Bed</p>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                                    <div className="text-3xl mb-2">🚿</div>
                                    <p className="text-sm text-gray-600">Bathrooms</p>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                                    <div className="text-3xl mb-2">📺</div>
                                    <p className="text-sm text-gray-600">TV</p>
                                </div>
                            </div>
                        </div>

                        {/* Booking Section */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-5xl font-bold text-gray-900 mb-2">{room.name}</h1>
                                <p className="text-2xl text-indigo-600 font-bold">₹{room.price} <span className="text-gray-600 text-lg">/night</span></p>
                            </div>

                            <p className="text-gray-700 text-lg leading-relaxed">{room.description}</p>

                            {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 mb-4">{error}</div>}

                            {!bookingStarted ? (
                                <div className="space-y-4 bg-white p-8 rounded-xl shadow-lg border-2 border-indigo-100">
                                    <h3 className="text-2xl font-bold text-gray-900">Book Your Stay</h3>

                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">Guest Name</label>
                                        <input
                                            type="text"
                                            value={guestName}
                                            onChange={(e) => setGuestName(e.target.value)}
                                            placeholder="Enter your full name"
                                            className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-600"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={guestEmail}
                                            onChange={(e) => setGuestEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-600"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">Check-In Date</label>
                                        <input
                                            type="date"
                                            value={checkIn}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                            className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-600"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">Check-Out Date</label>
                                        <input
                                            type="date"
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-600"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">Number of Guests</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={guests}
                                            onChange={(e) => setGuests(e.target.value)}
                                            className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-600"
                                        />
                                    </div>

                                    {checkIn && checkOut && new Date(checkOut) > new Date(checkIn) && (
                                        <div className="bg-indigo-50 p-4 rounded-lg">
                                            <p className="text-gray-700 mb-2">
                                                <span className="font-bold">Total Days:</span> {getTotalDays()}
                                            </p>
                                            <p className="text-2xl font-bold text-indigo-600">
                                                Total: ₹{getTotalPrice().toFixed(2)}
                                            </p>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleBooking}
                                        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-shadow"
                                    >
                                        Proceed to Payment
                                    </button>
                                </div>
                            ) : !paymentMethodSelected ? (
                                <>
                                    <PaymentMethodSelector 
                                        onMethodSelect={handlePaymentMethodSelect}
                                        amount={getTotalPrice()}
                                        roomName={room.name}
                                    />
                                    <button
                                        onClick={() => setBookingStarted(false)}
                                        className="w-full text-indigo-600 hover:text-indigo-800 font-bold py-2"
                                    >
                                        ← Back to Booking
                                    </button>
                                </>
                            ) : (
                                <div className="space-y-4">
                                    {paymentMethodSelected === 'stripe' && (
                                        <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-100">
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-2xl font-bold text-gray-900">💳 Card Payment</h3>
                                                <button 
                                                    onClick={() => setPaymentMethodSelected(null)}
                                                    className="text-indigo-600 hover:text-indigo-800 font-bold"
                                                >
                                                    ← Back
                                                </button>
                                            </div>

                                            <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                                                <p className="text-gray-700 mb-2">
                                                    <span className="font-bold">Guest:</span> {guestName}
                                                </p>
                                                <p className="text-gray-700 mb-2">
                                                    <span className="font-bold">Room:</span> {room.name}
                                                </p>
                                                <p className="text-gray-700 mb-2">
                                                    <span className="font-bold">Duration:</span> {getTotalDays()} nights
                                                </p>
                                                <p className="text-gray-700 mb-2">
                                                    <span className="font-bold">Amount to Pay:</span> <span className="text-xl font-bold text-indigo-600">₹{getTotalPrice().toFixed(2)}</span>
                                                </p>
                                            </div>

                                            <form onSubmit={handleStripePayment}>
                                                <div className="mb-6 p-4 border-2 border-gray-300 rounded-lg">
                                                    <label className="block text-gray-700 font-bold mb-3">Card Details</label>
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
                                                    <div className="mb-4 p-4 bg-red-100 border-2 border-red-400 rounded-lg">
                                                        <p className="text-red-700 font-bold">❌ {error}</p>
                                                    </div>
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={!stripe || loading}
                                                    className={`w-full py-3 rounded-lg font-bold text-white text-lg transition-all duration-200 ${
                                                        loading || !stripe
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:scale-105'
                                                    }`}
                                                >
                                                    {loading ? '🔄 Processing...' : `Pay ₹${getTotalPrice().toFixed(2)}`}
                                                </button>
                                            </form>

                                            <p className="text-xs text-gray-500 mt-4 text-center">
                                                🔒 Your payment is secure and encrypted
                                            </p>
                                        </div>
                                    )}

                                    {paymentMethodSelected === 'upi' && (
                                        <>
                                            <button 
                                                onClick={() => setPaymentMethodSelected(null)}
                                                className="text-indigo-600 hover:text-indigo-800 font-bold mb-4"
                                            >
                                                ← Back to Payment Methods
                                            </button>
                                            <UPIPayment 
                                                amount={getTotalPrice()}
                                                roomName={room.name}
                                                guestName={guestName}
                                                guestEmail={guestEmail}
                                                onPaymentSuccess={handlePaymentSuccess}
                                                onPaymentFail={handlePaymentFail}
                                            />
                                        </>
                                    )}

                                    {paymentMethodSelected === 'netbanking' && (
                                        <>
                                            <button 
                                                onClick={() => setPaymentMethodSelected(null)}
                                                className="text-indigo-600 hover:text-indigo-800 font-bold mb-4"
                                            >
                                                ← Back to Payment Methods
                                            </button>
                                            <NetBankingPayment 
                                                amount={getTotalPrice()}
                                                roomName={room.name}
                                                guestName={guestName}
                                                guestEmail={guestEmail}
                                                onPaymentSuccess={handlePaymentSuccess}
                                                onPaymentFail={handlePaymentFail}
                                            />
                                        </>
                                    )}

                                    {paymentMethodSelected === 'cash' && (
                                        <>
                                            <button 
                                                onClick={() => setPaymentMethodSelected(null)}
                                                className="text-indigo-600 hover:text-indigo-800 font-bold mb-4"
                                            >
                                                ← Back to Payment Methods
                                            </button>
                                            <CashPayment 
                                                amount={getTotalPrice()}
                                                roomName={room.name}
                                                guestName={guestName}
                                                guestEmail={guestEmail}
                                                onPaymentSuccess={handlePaymentSuccess}
                                                onPaymentFail={handlePaymentFail}
                                            />
                                        </>
                                    )}
                                </div>
                            )}

                            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                                <h4 className="font-bold text-gray-900 mb-3">Room Amenities:</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center gap-2">✓ Free WiFi</li>
                                    <li className="flex items-center gap-2">✓ Air Conditioning</li>
                                    <li className="flex items-center gap-2">✓ Premium Bedding</li>
                                    <li className="flex items-center gap-2">✓ 24/7 Room Service</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomDetails;

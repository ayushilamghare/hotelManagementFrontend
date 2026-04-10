import React, { useState } from 'react';

function CashPayment({ amount, roomName, guestName, guestEmail, onPaymentSuccess, onPaymentFail }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [confirmed, setConfirmed] = useState(false);

    const handleConfirm = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/create-cash-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: Math.round(amount * 100),
                    roomName,
                    guestName,
                    guestEmail,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setConfirmed(true);
                onPaymentSuccess({
                    id: data.transactionId,
                    status: 'pending',
                    method: 'cash',
                });
            } else {
                setError(data.error || 'Failed to process payment');
                onPaymentFail(data.error || 'Failed to process payment');
            }
        } catch (err) {
            setError(err.message);
            onPaymentFail(err.message);
        }

        setLoading(false);
    };

    if (confirmed) {
        return (
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-orange-100">
                <div className="text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h3>
                    
                    <div className="mb-6 p-4 bg-orange-50 rounded-lg text-left">
                        <p className="text-gray-700 mb-3">
                            <span className="font-bold">Room:</span> {roomName}
                        </p>
                        <p className="text-gray-700 mb-3">
                            <span className="font-bold">Amount to Pay:</span> <span className="text-xl font-bold text-orange-600">₹{amount.toFixed(2)}</span>
                        </p>
                        <p className="text-gray-700">
                            <span className="font-bold">Guest Name:</span> {guestName}
                        </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <p className="text-gray-700">
                            <span className="font-bold text-blue-600">💬 Payment Instructions:</span>
                        </p>
                        <ul className="text-left text-gray-600 mt-3 space-y-2">
                            <li>✓ Your booking has been confirmed</li>
                            <li>✓ A confirmation email has been sent to {guestEmail}</li>
                            <li>✓ Please pay the amount (₹{amount.toFixed(2)}) at the reception when you arrive</li>
                            <li>✓ Please bring a valid ID for check-in</li>
                        </ul>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">
                            <span className="font-bold">📞 Contact:</span> If you have any questions, please call us at +91-1234567890
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-orange-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">💰 Cash on Arrival</h3>

            <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                <p className="text-gray-700 mb-2">
                    <span className="font-bold">Room:</span> {roomName}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-bold">Amount to Pay:</span> <span className="text-xl font-bold text-orange-600">₹{amount.toFixed(2)}</span>
                </p>
                <p className="text-gray-700">
                    <span className="font-bold">Guest Name:</span> {guestName}
                </p>
            </div>

            <form onSubmit={handleConfirm}>
                <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                    <p className="text-gray-700">
                        <span className="font-bold">⚠️ Important:</span> By selecting this option, you confirm that you will pay the full amount in cash upon arrival at the hotel.
                    </p>
                    <ul className="text-gray-600 mt-3 space-y-2 ml-4">
                        <li>• Please keep this booking confirmation for reference</li>
                        <li>• Payment is due at check-in</li>
                        <li>• A valid ID is required for check-in</li>
                        <li>• Please contact us if you need to modify the booking</li>
                    </ul>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-100 border-2 border-red-400 rounded-lg">
                        <p className="text-red-700 font-bold">❌ {error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg font-bold text-white text-lg transition-all duration-200 ${
                        loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:shadow-lg hover:scale-105'
                    }`}
                >
                    {loading ? 'Processing...' : '✅ Confirm Booking (Pay at Hotel)'}
                </button>
            </form>
        </div>
    );
}

export default CashPayment;

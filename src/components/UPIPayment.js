import React, { useState } from 'react';

function UPIPayment({ amount, roomName, guestName, guestEmail, onPaymentSuccess, onPaymentFail }) {
    const [upiId, setUpiId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!upiId.trim()) {
            setError('Please enter a valid UPI ID');
            return;
        }

        // Validate UPI ID format
        const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
        if (!upiRegex.test(upiId)) {
            setError('Please enter a valid UPI ID (e.g., yourname@upi)');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/create-upi-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: Math.round(amount * 100),
                    roomName,
                    guestName,
                    guestEmail,
                    upiId,
                }),
            });

            const data = await response.json();

            if (data.success) {
                onPaymentSuccess({
                    id: data.transactionId,
                    status: 'succeeded',
                    method: 'upi',
                    upiId,
                });
            } else {
                setError(data.error || 'Payment failed');
                onPaymentFail(data.error || 'Payment failed');
            }
        } catch (err) {
            setError(err.message);
            onPaymentFail(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📱 UPI Payment</h3>

            <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                <p className="text-gray-700 mb-2">
                    <span className="font-bold">Room:</span> {roomName}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-bold">Amount to Pay:</span> <span className="text-xl font-bold text-purple-600">₹{amount.toFixed(2)}</span>
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">UPI ID</label>
                    <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                        disabled={loading}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                        Supported UPI providers: Google Pay, PhonePe, Paytm, WhatsApp Pay, etc.
                    </p>
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
                            : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:shadow-lg hover:scale-105'
                    }`}
                >
                    {loading ? 'Processing...' : '💸 Pay with UPI'}
                </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600"><span className="font-bold">ℹ️ Note:</span> A verification popup will appear on your registered device.</p>
            </div>
        </div>
    );
}

export default UPIPayment;

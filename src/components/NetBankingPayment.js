import React, { useState } from 'react';

function NetBankingPayment({ amount, roomName, guestName, guestEmail, onPaymentSuccess, onPaymentFail }) {
    const [selectedBank, setSelectedBank] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const banks = [
        { code: 'hdfc', name: 'HDFC Bank' },
        { code: 'icici', name: 'ICICI Bank' },
        { code: 'sbi', name: 'State Bank of India' },
        { code: 'axis', name: 'Axis Bank' },
        { code: 'kotak', name: 'Kotak Mahindra Bank' },
        { code: 'yes', name: 'YES Bank' },
        { code: 'boi', name: 'Bank of India' },
        { code: 'idbi', name: 'IDBI Bank' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedBank) {
            setError('Please select a bank');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/create-netbanking-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: Math.round(amount * 100),
                    roomName,
                    guestName,
                    guestEmail,
                    bankCode: selectedBank,
                }),
            });

            const data = await response.json();

            if (data.success) {
                onPaymentSuccess({
                    id: data.transactionId,
                    status: 'succeeded',
                    method: 'netbanking',
                    bank: selectedBank,
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
        <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-green-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">🏦 Net Banking Payment</h3>

            <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <p className="text-gray-700 mb-2">
                    <span className="font-bold">Room:</span> {roomName}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-bold">Amount to Pay:</span> <span className="text-xl font-bold text-green-600">₹{amount.toFixed(2)}</span>
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-3">Select Your Bank</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {banks.map((bank) => (
                            <button
                                key={bank.code}
                                type="button"
                                onClick={() => setSelectedBank(bank.code)}
                                className={`p-4 rounded-lg border-2 font-medium transition-all duration-200 text-left ${
                                    selectedBank === bank.code
                                        ? 'border-green-600 bg-green-50 text-green-700'
                                        : 'border-gray-300 text-gray-700 hover:border-green-300'
                                }`}
                            >
                                {bank.name}
                            </button>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-100 border-2 border-red-400 rounded-lg">
                        <p className="text-red-700 font-bold">❌ {error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || !selectedBank}
                    className={`w-full py-3 px-4 rounded-lg font-bold text-white text-lg transition-all duration-200 ${
                        loading || !selectedBank
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-600 to-green-700 hover:shadow-lg hover:scale-105'
                    }`}
                >
                    {loading ? 'Processing...' : '💰 Pay via Net Banking'}
                </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600"><span className="font-bold">ℹ️ Note:</span> You will be redirected to your bank's secure login page.</p>
            </div>
        </div>
    );
}

export default NetBankingPayment;

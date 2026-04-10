import React, { useState } from 'react';

function PaymentMethodSelector({ onMethodSelect, amount, roomName }) {
    const [selectedMethod, setSelectedMethod] = useState(null);

    const paymentMethods = [
        {
            id: 'stripe',
            name: 'Card Payment',
            icon: '💳',
            description: 'Pay using Credit/Debit Card',
            color: 'from-blue-500 to-blue-600'
        },
        {
            id: 'upi',
            name: 'UPI',
            icon: '📱',
            description: 'Pay using UPI (Google Pay, PhonePe, Paytm)',
            color: 'from-purple-500 to-purple-600'
        },
        {
            id: 'netbanking',
            name: 'Net Banking',
            icon: '🏦',
            description: 'Online banking transfer',
            color: 'from-green-500 to-green-600'
        },
        {
            id: 'cash',
            name: 'Cash on Arrival',
            icon: '💰',
            description: 'Pay cash at the hotel',
            color: 'from-orange-500 to-orange-600'
        }
    ];

    const handleSelectMethod = (method) => {
        setSelectedMethod(method.id);
    };

    const handleConfirm = () => {
        if (selectedMethod) {
            onMethodSelect(selectedMethod);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">💳 Select Payment Method</h2>
                
                <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                    <p className="text-gray-700 mb-2">
                        <span className="font-bold">Room:</span> {roomName}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-bold">Amount:</span> <span className="text-2xl font-bold text-indigo-600">₹{amount.toFixed(2)}</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {paymentMethods.map((method) => (
                        <button
                            key={method.id}
                            onClick={() => handleSelectMethod(method)}
                            className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                                selectedMethod === method.id
                                    ? 'border-indigo-600 bg-indigo-50 shadow-lg'
                                    : 'border-gray-200 hover:border-indigo-300'
                            }`}
                        >
                            <div className="text-5xl mb-3">{method.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.description}</p>
                        </button>
                    ))}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleConfirm}
                        disabled={!selectedMethod}
                        className={`flex-1 py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${
                            selectedMethod
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Continue to Payment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentMethodSelector;

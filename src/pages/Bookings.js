function Bookings({ setScreen, bookings }) {
    return (
        <>
            {/* Navigation Bar */}
            <nav className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 p-6 flex justify-between items-center shadow-lg sticky top-0 z-50">
                <div className="text-3xl font-bold text-white tracking-tight">🏨 My Bookings</div>
                <button onClick={() => setScreen("home")} className="bg-white text-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-indigo-100 transition-colors">
                    Browse Rooms
                </button>
            </nav>

            {/* Bookings Section */}
            <div className="w-full bg-gradient-to-b from-gray-50 to-white min-h-screen px-6 sm:px-12 lg:px-20 py-12">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Bookings</h1>
                    <p className="text-gray-600 mb-12">Manage and view all your hotel reservations</p>

                    {bookings.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Bookings Yet</h3>
                            <p className="text-gray-600 mb-6">You haven't made any bookings yet. Explore our rooms and make your first reservation!</p>
                            <button 
                                onClick={() => setScreen("home")}
                                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow"
                            >
                                Browse Available Rooms
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden border-l-4 border-indigo-600">
                                    <div className="p-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Left Side */}
                                            <div>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="text-4xl">🛏️</div>
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-gray-900">{booking.roomName}</h3>
                                                        <p className="text-gray-600">Booking ID: #{booking.id}</p>
                                                        <p className="text-sm text-green-600 font-bold">
                                                            ✅ Payment: Confirmed
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="space-y-3 mt-6">
                                                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                                                        <span className="text-gray-700 font-bold">Guest Name:</span>
                                                        <span className="text-gray-900 font-bold">{booking.guestName}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                                                        <span className="text-gray-700 font-bold">Email:</span>
                                                        <span className="text-gray-900 font-bold">{booking.guestEmail}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                                                        <span className="text-gray-700 font-bold">Check-In:</span>
                                                        <span className="text-gray-900 font-bold">{new Date(booking.checkIn).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                                                        <span className="text-gray-700 font-bold">Check-Out:</span>
                                                        <span className="text-gray-900 font-bold">{new Date(booking.checkOut).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                                        <span className="text-gray-700 font-bold">Guests:</span>
                                                        <span className="text-gray-900 font-bold">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Side */}
                                            <div className="flex flex-col justify-between">
                                                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg">
                                                    <p className="text-gray-600 text-sm mb-2">Duration</p>
                                                    <p className="text-3xl font-bold text-indigo-600 mb-4">{booking.totalDays} {booking.totalDays === 1 ? 'Day' : 'Days'}</p>
                                                    
                                                    <hr className="my-4 border-indigo-200" />

                                                    <p className="text-gray-600 text-sm mb-2">Total Amount</p>
                                                    <p className="text-4xl font-bold text-gray-900">₹{booking.totalPrice.toFixed(2)}</p>
                                                    <p className="text-gray-600 text-sm mt-2">₹{(booking.totalPrice / booking.totalDays).toFixed(2)} per night</p>
                                                </div>

                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <p className="text-gray-600 text-sm">Booked on {booking.bookingDate}</p>
                                                    <div className="flex gap-3 mt-4">
                                                        <button onClick={() => alert('Edit feature coming soon! You can modify your check-in/out dates.')} className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors">
                                                            Modify
                                                        </button>
                                                        <button onClick={() => alert('Are you sure you want to cancel this booking?')} className="flex-1 bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600 transition-colors">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Summary Section */}
                    {bookings.length > 0 && (
                        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-8 shadow-lg">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                <div>
                                    <p className="text-indigo-100">Total Bookings</p>
                                    <p className="text-4xl font-bold">{bookings.length}</p>
                                </div>
                                <div>
                                    <p className="text-indigo-100">Total Days</p>
                                    <p className="text-4xl font-bold">{bookings.reduce((sum, b) => sum + b.totalDays, 0)}</p>
                                </div>
                                <div>
                                    <p className="text-indigo-100">Total Spent</p>
                                    <p className="text-4xl font-bold">₹{bookings.reduce((sum, b) => sum + b.totalPrice, 0).toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-indigo-100">Avg per Night</p>
                                    <p className="text-4xl font-bold">₹{(bookings.reduce((sum, b) => sum + b.totalPrice, 0) / bookings.reduce((sum, b) => sum + b.totalDays, 0)).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Bookings;

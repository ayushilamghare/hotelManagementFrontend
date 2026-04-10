function Home({ setScreen, setSelectedRoom }) {
    const rooms = [
        {
            id: 1,
            name: "Deluxe Suite",
            price: 5000,
            image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
            description: "Spacious suite with modern amenities and city view"
        },
        {
            id: 2,
            name: "Standard Room",
            price: 3000,
            image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80",
            description: "Comfortable room perfect for budget travelers"
        },
        {
            id: 3,
            name: "Ocean View",
            price: 6000,
            image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
            description: "Beautiful beachfront room with stunning ocean views"
        },
        {
            id: 4,
            name: "Family Room",
            price: 7000,
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
            description: "Spacious accommodation for families with kids"
        },
        {
            id: 5,
            name: "Luxury Penthouse",
            price: 10000,
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80",
            description: "Premium penthouse with exclusive amenities and services"
        },
        {
            id: 6,
            name: "Garden Room",
            price: 4000,
            image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80",
            description: "Serene room nestled in a lush garden setting"
        },
        {
            id: 7,
            name: "Business Executive",
            price: 4500,
            image: "https://images.unsplash.com/photo-1570129477492-45524c556da1?w=600&q=80",
            description: "Ideal for business travelers with conference facilities"
        }
    ]

    return (
        <>
            {/* Navigation Bar */}
            <nav className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 p-6 flex justify-between items-center shadow-lg sticky top-0 z-50">
                <div className="text-3xl font-bold text-white tracking-tight">🏨 Hotel Management</div>
                <div className="flex gap-8 items-center">
                    <button className="text-white hover:text-indigo-200 transition-colors font-medium">Services</button>
                    <button className="text-white hover:text-indigo-200 transition-colors font-medium">About</button>
                    <button onClick={() => setScreen("bookings")} className="bg-white text-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-indigo-100 transition-colors">My Bookings</button>
                    <button onClick={() => setScreen('login')} className="bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600 transition-colors">Sign Out</button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="w-full bg-gradient-to-br from-white via-indigo-50 to-blue-50 min-h-screen flex items-center px-6 sm:px-12 lg:px-20 py-20">
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <p className="text-indigo-600 font-semibold text-lg">Welcome to</p>
                            <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                Hotel Management System
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Streamline your hotel operations with our comprehensive management platform. Effortlessly handle bookings, manage rooms, and deliver exceptional guest experiences.
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:scale-105 transition-transform duration-200">
                                Get Started
                            </button>
                            <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-50 transition-colors">
                                Learn More
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-4">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-indigo-600">1000+</p>
                                <p className="text-gray-600 text-sm">Hotels Managed</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-indigo-600">50K+</p>
                                <p className="text-gray-600 text-sm">Happy Guests</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-indigo-600">24/7</p>
                                <p className="text-gray-600 text-sm">Support</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Image Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80"
                            alt="Luxury Hotel Room"
                            className="w-full h-48 object-cover rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 hover:scale-105 transform" />
                        
                        <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80"
                            alt="Hotel Lobby"
                            className="w-full h-48 object-cover rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 hover:scale-105 transform" />
                        
                        <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
                            alt="Hotel Restaurant"
                            className="w-full h-48 object-cover rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 hover:scale-105 transform" />
                        
                        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80"
                            alt="Hotel Pool"
                            className="w-full h-48 object-cover rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 hover:scale-105 transform" />
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="w-full bg-white px-6 sm:px-12 lg:px-20 py-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">📅</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Bookings</h3>
                            <p className="text-gray-600">Manage reservations seamlessly with our intuitive booking system.</p>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">🛏️</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Room Management</h3>
                            <p className="text-gray-600">Track room status, maintenance, and availability in real-time.</p>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Guest Experience</h3>
                            <p className="text-gray-600">Deliver personalized service and build lasting customer relationships.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Available Rooms Section */}
            <div className="w-full bg-gradient-to-b from-gray-50 to-gray-100 px-6 sm:px-12 lg:px-20 py-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Available Rooms</h2>
                    <p className="text-center text-gray-600 text-lg mb-12">Explore our luxurious rooms and book your perfect stay</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rooms.map((room) => (
                            <div 
                                key={room.id}
                                onClick={() => {
                                    setSelectedRoom(room);
                                    setScreen("roomDetails");
                                }}
                                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
                            >
                                <div className="relative overflow-hidden h-48">
                                    <img 
                                        src={room.image} 
                                        alt={room.name}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-full font-bold">
                                        ₹{room.price}/night
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{room.name}</h3>
                                    <p className="text-gray-600 mb-4">{room.description}</p>
                                    <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2 rounded-lg font-bold hover:shadow-lg transition-shadow">
                                        View Details & Book
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 sm:px-12 lg:px-20 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h4 className="text-xl font-bold mb-4">Hotel Management</h4>
                            <p className="text-gray-400">Your trusted partner in hotel management excellence.</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                            <div className="space-y-2">
                                <button className="block text-gray-400 hover:text-white transition-colors cursor-pointer">Home</button>
                                <button className="block text-gray-400 hover:text-white transition-colors cursor-pointer">About</button>
                                <button className="block text-gray-400 hover:text-white transition-colors cursor-pointer">Services</button>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4">Contact</h4>
                            <p className="text-gray-400">support@hotelmanagement.com</p>
                            <p className="text-gray-400">+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-8">
                        <p className="text-center text-gray-400">
                            © 2026 Hotel Management System. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Home
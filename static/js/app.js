// Notification Component
const Notification = ({ message, show }) => {
    return React.createElement('div', { 
        className: `notification ${show ? 'show' : ''}` 
    }, message);
};

// Cart Modal Component
const CartModal = ({ cartItems, removeFromCart, updateQuantity, closeCart, checkout }) => {
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return React.createElement('div', { className: 'cart-modal' },
        React.createElement('div', { className: 'cart-content' },
            React.createElement('div', { className: 'cart-header' },
                React.createElement('h2', null, 'Your Rental Cart'),
                React.createElement('button', { 
                    className: 'close-cart', 
                    onClick: closeCart 
                }, '×')
            ),
            
            cartItems.length === 0 
                ? React.createElement('div', { className: 'empty-cart' },
                    React.createElement('i', { className: 'fas fa-shopping-cart' }),
                    React.createElement('p', null, 'Your cart is empty'),
                    React.createElement('button', { 
                        className: 'btn btn-primary',
                        onClick: closeCart
                    }, 'Continue Shopping')
                  )
                : React.createElement(React.Fragment, null,
                    React.createElement('div', { className: 'cart-items' },
                        cartItems.map(item => 
                            React.createElement('div', { key: item.id, className: 'cart-item' },
                                React.createElement('div', { className: 'cart-item-image' },
                                    React.createElement('img', { src: item.image, alt: item.title })
                                ),
                                React.createElement('div', { className: 'cart-item-details' },
                                    React.createElement('div', { className: 'cart-item-title' }, item.title),
                                    React.createElement('div', { className: 'cart-item-price' }, `₹${item.price}/month`)
                                ),
                                React.createElement('div', { className: 'cart-item-actions' },
                                    React.createElement('div', { className: 'quantity-controls' },
                                        React.createElement('button', { 
                                            className: 'quantity-btn',
                                            onClick: () => updateQuantity(item.id, item.quantity - 1)
                                        }, '-'),
                                        React.createElement('span', { className: 'quantity' }, item.quantity),
                                        React.createElement('button', { 
                                            className: 'quantity-btn',
                                            onClick: () => updateQuantity(item.id, item.quantity + 1)
                                        }, '+')
                                    ),
                                    React.createElement('button', { 
                                        className: 'remove-item',
                                        onClick: () => removeFromCart(item.id)
                                    }, React.createElement('i', { className: 'fas fa-trash' }))
                                )
                            )
                        )
                    ),
                    React.createElement('div', { className: 'cart-summary' },
                        React.createElement('div', { className: 'cart-total' },
                            React.createElement('span', null, 'Total:'),
                            React.createElement('span', null, `₹${calculateTotal()}/month`)
                        ),
                        React.createElement('div', { className: 'cart-actions' },
                            React.createElement('button', { 
                                className: 'btn-continue',
                                onClick: closeCart
                            }, 'Continue Shopping'),
                            React.createElement('button', { 
                                className: 'btn-checkout',
                                onClick: checkout
                            }, 'Proceed to Checkout')
                        )
                    )
                  )
        )
    );
};

// Header Component
const Header = ({ cartItemsCount, openCart, currentPage, navigateTo }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return React.createElement('header', { className: 'header' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'header-content' },
                React.createElement('a', { 
                    href: '#', 
                    className: 'logo',
                    onClick: (e) => {
                        e.preventDefault();
                        navigateTo('home');
                    }
                }, 'Retify'),
                
                React.createElement('button', { 
                    className: 'mobile-menu-toggle', 
                    onClick: toggleMenu 
                },
                    React.createElement('span', null),
                    React.createElement('span', null),
                    React.createElement('span', null)
                ),
                
                React.createElement('nav', { className: `nav ${isMenuOpen ? 'nav-open' : ''}` },
                    React.createElement('ul', { className: 'nav-links' },
                        React.createElement('li', null, 
                            React.createElement('a', { 
                                href: '#',
                                className: currentPage === 'home' ? 'active' : '',
                                onClick: (e) => {
                                    e.preventDefault();
                                    navigateTo('home');
                                    setIsMenuOpen(false);
                                }
                            }, 'Home')
                        ),
                        React.createElement('li', null, 
                            React.createElement('a', { 
                                href: '#',
                                className: currentPage === 'properties' ? 'active' : '',
                                onClick: (e) => {
                                    e.preventDefault();
                                    navigateTo('properties');
                                    setIsMenuOpen(false);
                                }
                            }, 'Properties')
                        ),
                        React.createElement('li', null, 
                            React.createElement('a', { 
                                href: '#',
                                className: currentPage === 'electronics' ? 'active' : '',
                                onClick: (e) => {
                                    e.preventDefault();
                                    navigateTo('electronics');
                                    setIsMenuOpen(false);
                                }
                            }, 'Electronics')
                        ),
                        React.createElement('li', null, 
                            React.createElement('a', { 
                                href: '#',
                                className: currentPage === 'vehicles' ? 'active' : '',
                                onClick: (e) => {
                                    e.preventDefault();
                                    navigateTo('vehicles');
                                    setIsMenuOpen(false);
                                }
                            }, 'Vehicles')
                        ),
                        React.createElement('li', null, 
                            React.createElement('a', { 
                                href: '#',
                                className: currentPage === 'about' ? 'active' : '',
                                onClick: (e) => {
                                    e.preventDefault();
                                    navigateTo('about');
                                    setIsMenuOpen(false);
                                }
                            }, 'About')
                        )
                    )
                ),
                
                React.createElement('div', { className: 'header-actions' },
                    React.createElement('div', { 
                        className: 'cart-icon', 
                        onClick: openCart 
                    },
                        React.createElement('i', { className: 'fas fa-shopping-cart' }),
                        cartItemsCount > 0 && React.createElement('span', { className: 'cart-count' }, cartItemsCount)
                    ),
                    React.createElement('div', { className: 'auth-buttons' },
                        React.createElement('button', { className: 'login-btn' }, 'Login'),
                        React.createElement('button', { className: 'signup-btn' }, 'Sign Up')
                    )
                )
            )
        )
    );
};

// Hero Component
const Hero = () => {
    return React.createElement('section', { className: 'hero' },
        React.createElement('div', { className: 'container' },
            React.createElement('h1', null, 'Find Your Perfect Rental in India'),
            React.createElement('p', null, 'Discover properties, electronics, bikes, and cars for rent across India. Quality assured with verified listings and customer reviews.'),
            React.createElement('div', { className: 'search-bar' },
                React.createElement('input', { 
                    type: 'text', 
                    placeholder: 'Search for properties, electronics, bikes, cars...' 
                }),
                React.createElement('button', null, 'Search')
            )
        )
    );
};

// Category Section Component
const CategorySection = ({ navigateTo }) => {
    const categories = [
        {
            id: 1,
            title: "Rental Properties",
            description: "Apartments, Houses, Villas & more",
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
            id: 2,
            title: "Electronics",
            description: "Laptops, Cameras, Gadgets & more",
            image: "https://tse3.mm.bing.net/th/id/OIP.f3CIMV5AiO_UfMACKY3zBwHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
        },
        {
            id: 3,
            title: "Bikes & Scooters",
            description: "Motorcycles, Scooters & more",
            image: "https://ultimatemotorcycling.com/wp-content/uploads/2024/11/honda-ev-fun-concept-first-look-electric-motorcycle-2-1024x683.webp"
        },
        {
            id: 4,
            title: "Cars",
            description: "Sedans, SUVs, Luxury cars & more",
            image: "https://tse4.mm.bing.net/th/id/OIP.cSEjDgglEO-m7HSsTHvF3QHaD0?cb=12&w=1913&h=988&rs=1&pid=ImgDetMain&o=7&rm=3"
        }
    ];

    const handleCategoryClick = (title) => {
        const page = title.toLowerCase().includes('property') ? 'properties' : 
                     title.toLowerCase().includes('electronic') ? 'electronics' :
                     title.toLowerCase().includes('bike') || title.toLowerCase().includes('scooter') ? 'vehicles' :
                     title.toLowerCase().includes('car') ? 'vehicles' : 'home';
        navigateTo(page);
    };

    return React.createElement('section', { className: 'section' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'section-title' },
                React.createElement('h2', null, 'Browse Rental Categories'),
                React.createElement('p', null, 'Find exactly what you need from our wide range of rental options across India')
            ),
            React.createElement('div', { className: 'category-grid' },
                categories.map(category => 
                    React.createElement('div', { 
                        key: category.id, 
                        className: 'category-card',
                        onClick: () => handleCategoryClick(category.title)
                    },
                        React.createElement('div', { className: 'category-image' },
                            React.createElement('img', { src: category.image, alt: category.title })
                        ),
                        React.createElement('div', { className: 'category-content' },
                            React.createElement('h3', null, category.title),
                            React.createElement('p', null, category.description)
                        )
                    )
                )
            )
        )
    );
};

// Property Card Component
const PropertyCard = ({ property, addToCart, showNotification }) => {
    const {
        id,
        title,
        location,
        price,
        image,
        bedrooms,
        bathrooms,
        area,
        isFeatured = false
    } = property;

    const handleRentNow = () => {
        addToCart({
            ...property,
            type: 'property',
            quantity: 1
        });
        showNotification(`${title} added to cart!`);
    };

    return React.createElement('div', { className: 'property-card' },
        React.createElement('div', { className: 'property-image' },
            React.createElement('img', { src: image, alt: title }),
            isFeatured && React.createElement('div', { className: 'property-badge' }, 'Featured')
        ),
        React.createElement('div', { className: 'property-content' },
            React.createElement('h3', { className: 'property-title' }, title),
            React.createElement('div', { className: 'property-location' },
                React.createElement('i', { className: 'fas fa-map-marker-alt' }),
                React.createElement('span', null, location)
            ),
            React.createElement('div', { className: 'property-price' }, `₹${price}/month`),
            React.createElement('div', { className: 'property-features' },
                React.createElement('div', null,
                    React.createElement('i', { className: 'fas fa-bed' }),
                    React.createElement('span', null, `${bedrooms} Beds`)
                ),
                React.createElement('div', null,
                    React.createElement('i', { className: 'fas fa-bath' }),
                    React.createElement('span', null, `${bathrooms} Baths`)
                ),
                React.createElement('div', null,
                    React.createElement('i', { className: 'fas fa-vector-square' }),
                    React.createElement('span', null, `${area} sq ft`)
                )
            ),
            React.createElement('div', { className: 'property-actions' },
                React.createElement('button', { 
                    className: 'btn btn-primary', 
                    onClick: handleRentNow 
                }, 'Rent Now'),
                React.createElement('button', { className: 'btn btn-outline' }, 'View Details')
            )
        )
    );
};

// Product Card Component
const ProductCard = ({ product, addToCart, showNotification }) => {
    const {
        id,
        title,
        brand,
        price,
        image,
        category,
        specs,
        rating,
        isFeatured = false
    } = product;

    const handleRentNow = () => {
        addToCart({
            ...product,
            type: 'product',
            quantity: 1
        });
        showNotification(`${title} added to cart!`);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                React.createElement('i', { 
                    key: i, 
                    className: `fas fa-star ${i <= rating ? 'filled' : ''}`
                })
            );
        }
        return stars;
    };

    return React.createElement('div', { className: 'product-card' },
        React.createElement('div', { className: 'product-image' },
            React.createElement('img', { src: image, alt: title }),
            isFeatured && React.createElement('div', { className: 'product-badge' }, 'Popular')
        ),
        React.createElement('div', { className: 'product-content' },
            React.createElement('h3', { className: 'product-title' }, title),
            React.createElement('div', { className: 'product-specs' },
                React.createElement('i', { className: 'fas fa-tag' }),
                React.createElement('span', null, `${brand} • ${category}`)
            ),
            React.createElement('div', { className: 'product-rating' },
                renderStars(rating),
                React.createElement('span', null, `(${rating})`)
            ),
            React.createElement('div', { className: 'product-price' }, `₹${price}/month`),
            React.createElement('div', { className: 'product-features' },
                specs.map((spec, index) => 
                    React.createElement('div', { key: index },
                        React.createElement('i', { className: 'fas fa-check' }),
                        React.createElement('span', null, spec)
                    )
                )
            ),
            React.createElement('div', { className: 'product-actions' },
                React.createElement('button', { 
                    className: 'btn btn-primary', 
                    onClick: handleRentNow 
                }, 'Rent Now'),
                React.createElement('button', { className: 'btn btn-outline' }, 'View Details')
            )
        )
    );
};

// Review Card Component
const ReviewCard = ({ review }) => {
    const { id, name, avatar, rating, text, date, item } = review;

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                React.createElement('i', { 
                    key: i, 
                    className: `fas fa-star ${i <= rating ? 'filled' : ''}`
                })
            );
        }
        return stars;
    };

    return React.createElement('div', { className: 'review-card' },
        React.createElement('div', { className: 'review-header' },
            React.createElement('div', { className: 'review-avatar' },
                React.createElement('img', { src: avatar, alt: name })
            ),
            React.createElement('div', { className: 'reviewer-info' },
                React.createElement('h4', null, name),
                React.createElement('div', { className: 'review-stars' }, renderStars(rating)),
                React.createElement('div', { className: 'review-date' }, date)
            )
        ),
        React.createElement('p', { className: 'review-text' }, `"${text}"`),
        React.createElement('div', { className: 'reviewed-item' }, `Rented: ${item}`)
    );
};

// Footer Component
const Footer = () => {
    return React.createElement('footer', { className: 'footer' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'footer-content' },
                React.createElement('div', { className: 'footer-column' },
                    React.createElement('h3', null, 'Retify'),
                    React.createElement('p', null, "India's leading rental platform for properties, electronics, bikes, and cars. Quality assured with verified listings."),
                    React.createElement('div', { className: 'social-links' },
                        React.createElement('a', { href: '#' }, React.createElement('i', { className: 'fab fa-facebook' })),
                        React.createElement('a', { href: '#' }, React.createElement('i', { className: 'fab fa-twitter' })),
                        React.createElement('a', { href: '#' }, React.createElement('i', { className: 'fab fa-instagram' })),
                        React.createElement('a', { href: '#' }, React.createElement('i', { className: 'fab fa-linkedin' }))
                    )
                ),
                React.createElement('div', { className: 'footer-column' },
                    React.createElement('h3', null, 'Quick Links'),
                    React.createElement('ul', { className: 'footer-links' },
                        React.createElement('li', null, React.createElement('a', { href: '#home' }, 'Home')),
                        React.createElement('li', null, React.createElement('a', { href: '#properties' }, 'Properties')),
                        React.createElement('li', null, React.createElement('a', { href: '#electronics' }, 'Electronics')),
                        React.createElement('li', null, React.createElement('a', { href: '#vehicles' }, 'Vehicles')),
                        React.createElement('li', null, React.createElement('a', { href: '#about' }, 'About Us'))
                    )
                ),
                React.createElement('div', { className: 'footer-column' },
                    React.createElement('h3', null, 'Categories'),
                    React.createElement('ul', { className: 'footer-links' },
                        React.createElement('li', null, React.createElement('a', { href: '#properties' }, 'Apartments')),
                        React.createElement('li', null, React.createElement('a', { href: '#properties' }, 'Houses')),
                        React.createElement('li', null, React.createElement('a', { href: '#electronics' }, 'Laptops')),
                        React.createElement('li', null, React.createElement('a', { href: '#electronics' }, 'Cameras')),
                        React.createElement('li', null, React.createElement('a', { href: '#vehicles' }, 'Bikes')),
                        React.createElement('li', null, React.createElement('a', { href: '#vehicles' }, 'Cars'))
                    )
                ),
                React.createElement('div', { className: 'footer-column' },
                    React.createElement('h3', null, 'Contact Us'),
                    React.createElement('ul', { className: 'footer-links' },
                        React.createElement('li', null, 
                            React.createElement('i', { className: 'fas fa-map-marker-alt' }), 
                            ' 123 Rental Street, Mumbai, India'
                        ),
                        React.createElement('li', null, 
                            React.createElement('i', { className: 'fas fa-phone' }), 
                            ' +91 98765 43210'
                        ),
                        React.createElement('li', null, 
                            React.createElement('i', { className: 'fas fa-envelope' }), 
                            ' info@retify.com'
                        )
                    )
                )
            ),
            React.createElement('div', { className: 'footer-bottom' },
                React.createElement('p', null, '© 2023 Retify. All rights reserved.')
            )
        )
    );
};

// Home Page Component
const Home = ({ addToCart, showNotification, navigateTo }) => {
    // Sample data for featured properties (12 properties)
    const featuredProperties = [
        {
            id: 1,
            title: "Luxury Apartment in Bandra",
            location: "Bandra West, Mumbai",
            price: 45000,
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            bedrooms: 3,
            bathrooms: 2,
            area: 1200,
            isFeatured: true
        },
        {
            id: 2,
            title: "Modern Villa in Whitefield",
            location: "Whitefield, Bangalore",
            price: 75000,
            image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            bedrooms: 4,
            bathrooms: 3,
            area: 2200,
            isFeatured: true
        },
        {
            id: 3,
            title: "Cozy Studio in Connaught Place",
            location: "Connaught Place, Delhi",
            price: 25000,
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            bedrooms: 1,
            bathrooms: 1,
            area: 600
        }
    ];

    // Sample data for featured electronics (12 electronics)
    const featuredElectronics = [
        {
            id: 1,
            title: "MacBook Pro 16-inch",
            brand: "Apple",
            price: 12000,
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            category: "Laptop",
            specs: ["16GB RAM", "1TB SSD", "M1 Chip"],
            rating: 4.8,
            isFeatured: true
        },
        {
            id: 2,
            title: "Sony A7III Camera",
            brand: "Sony",
            price: 8000,
            image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            category: "Camera",
            specs: ["24.2MP", "4K Video", "Full Frame"],
            rating: 4.6,
            isFeatured: true
        },
        {
            id: 3,
            title: "PlayStation 5",
            brand: "Sony",
            price: 5000,
            image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2052&q=80",
            category: "Gaming Console",
            specs: ["825GB SSD", "4K Gaming", "Ray Tracing"],
            rating: 4.9
        }
    ];

    // Sample data for customer reviews
    const customerReviews = [
        {
            id: 1,
            name: "Rahul Sharma",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 5,
            text: "Excellent service! Rented a bike for a month and the process was seamless. The bike was in perfect condition.",
            date: "2 weeks ago",
            item: "Yamaha MT-15"
        },
        {
            id: 2,
            name: "Priya Patel",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 4,
            text: "Found my dream apartment through Retify. The verification process gave me confidence in the listing.",
            date: "1 month ago",
            item: "2BHK in HSR Layout"
        },
        {
            id: 3,
            name: "Amit Kumar",
            avatar: "https://randomuser.me/api/portraits/men/67.jpg",
            rating: 5,
            text: "Rented a MacBook for my freelance work. Saved me from a huge upfront investment. Highly recommended!",
            date: "3 weeks ago",
            item: "MacBook Pro"
        }
    ];

    return React.createElement('div', null,
        React.createElement(Hero),
        React.createElement(CategorySection, { navigateTo }),
        
        // Featured Properties Section
        React.createElement('section', { className: 'section' },
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'section-title' },
                    React.createElement('h2', null, 'Featured Properties'),
                    React.createElement('p', null, 'Discover premium rental properties across major Indian cities')
                ),
                React.createElement('div', { className: 'properties-grid' },
                    featuredProperties.map(property => 
                        React.createElement(PropertyCard, { 
                            key: property.id, 
                            property: property, 
                            addToCart: addToCart,
                            showNotification: showNotification
                        })
                    )
                ),
                React.createElement('div', { style: { textAlign: 'center', marginTop: '30px' } },
                    React.createElement('button', { 
                        className: 'btn btn-primary',
                        onClick: () => navigateTo('properties')
                    }, 'View All Properties')
                )
            )
        ),
        
        // Featured Electronics Section
        React.createElement('section', { className: 'section' },
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'section-title' },
                    React.createElement('h2', null, 'Popular Electronics'),
                    React.createElement('p', null, 'Rent the latest gadgets and electronics without the commitment of buying')
                ),
                React.createElement('div', { className: 'products-grid' },
                    featuredElectronics.map(product => 
                        React.createElement(ProductCard, { 
                            key: product.id, 
                            product: product, 
                            addToCart: addToCart,
                            showNotification: showNotification
                        })
                    )
                ),
                React.createElement('div', { style: { textAlign: 'center', marginTop: '30px' } },
                    React.createElement('button', { 
                        className: 'btn btn-primary',
                        onClick: () => navigateTo('electronics')
                    }, 'View All Electronics')
                )
            )
        ),
        
        // Customer Reviews Section
        React.createElement('section', { className: 'section reviews-section' },
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'section-title' },
                    React.createElement('h2', null, 'Customer Reviews'),
                    React.createElement('p', null, 'See what our customers have to say about their rental experiences')
                ),
                React.createElement('div', { className: 'reviews-grid' },
                    customerReviews.map(review => 
                        React.createElement(ReviewCard, { key: review.id, review: review })
                    )
                )
            )
        )
    );
};

// Properties Page Component
const Properties = ({ addToCart, showNotification }) => {
    const [filter, setFilter] = React.useState('all');
    
    const properties = [
        {
            id: 1,
            title: "Luxury Apartment in Bandra",
            location: "Bandra West, Mumbai",
            price: 45000,
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            type: "Apartment",
            bedrooms: 3,
            bathrooms: 2,
            area: 1200,
            isFeatured: true
        },
        {
            id: 2,
            title: "Modern Villa in Whitefield",
            location: "Whitefield, Bangalore",
            price: 75000,
            image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            type: "Villa",
            bedrooms: 4,
            bathrooms: 3,
            area: 2200,
            isFeatured: true
        },
        {
            id: 3,
            title: "Cozy Studio in Connaught Place",
            location: "Connaught Place, Delhi",
            price: 25000,
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            type: "Studio",
            bedrooms: 1,
            bathrooms: 1,
            area: 600
        },
        {
            id: 4,
            title: "Spacious 3BHK in Hitech City",
            location: "Hitech City, Hyderabad",
            price: 35000,
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            type: "Apartment",
            bedrooms: 3,
            bathrooms: 2,
            area: 1400
        },
        {
            id: 5,
            title: "Penthouse with City View",
            location: "Koregaon Park, Pune",
            price: 90000,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            type: "Penthouse",
            bedrooms: 3,
            bathrooms: 3,
            area: 1800
        },
        {
            id: 6,
            title: "Furnished 2BHK in Salt Lake",
            location: "Salt Lake, Kolkata",
            price: 22000,
            image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            type: "Apartment",
            bedrooms: 2,
            bathrooms: 2,
            area: 950
        },
        {
            id: 7,
            title: "Luxury Apartment in Jubilee Hills",
            location: "Jubilee Hills, Hyderabad",
            price: 55000,
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
            type: "Apartment",
            bedrooms: 3,
            bathrooms: 3,
            area: 1600
        },
        {
            id: 8,
            title: "Sea Facing Apartment in Marine Drive",
            location: "Marine Drive, Mumbai",
            price: 85000,
            image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            type: "Apartment",
            bedrooms: 2,
            bathrooms: 2,
            area: 1100
        },
        {
            id: 9,
            title: "Farmhouse in Chhatarpur",
            location: "Chhatarpur, Delhi",
            price: 120000,
            image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            type: "Villa",
            bedrooms: 5,
            bathrooms: 4,
            area: 3500
        },
        {
            id: 10,
            title: "Modern Duplex in Gachibowli",
            location: "Gachibowli, Hyderabad",
            price: 68000,
            image: "https://i.pinimg.com/736x/90/80/ff/9080ffdaa0fd1ab8861aae6757df80a1.jpg",
            type: "villa",
            bedrooms: 3,
            bathrooms: 3,
            area: 1900
        },
        {
            id: 11,
            title: "Serviced Apartment in BKC",
            location: "Bandra Kurla Complex, Mumbai",
            price: 95000,
            image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            type: "Apartment",
            bedrooms: 2,
            bathrooms: 2,
            area: 1250
        },
        {
            id: 12,
            title: "Independent House in JP Nagar",
            location: "JP Nagar, Bangalore",
            price: 65000,
            image: "https://img.squareyards.com/secondaryPortal/638579747542007038-3007241019141914.jpg",
            type: "Villa",
            bedrooms: 4,
            bathrooms: 3,
            area: 2400
        }
    ];

    const filteredProperties = filter === 'all' 
        ? properties 
        : properties.filter(property => property.type.toLowerCase() === filter);

    return React.createElement('div', { className: 'section' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'section-title' },
                React.createElement('h2', null, 'Rental Properties'),
                React.createElement('p', null, 'Find your perfect home from our verified listings across India')
            ),
            
            React.createElement('div', { className: 'filter-buttons' },
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'all' ? 'active' : ''}`,
                    onClick: () => setFilter('all')
                }, 'All Properties'),
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'apartment' ? 'active' : ''}`,
                    onClick: () => setFilter('apartment')
                }, 'Apartments'),
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'villa' ? 'active' : ''}`,
                    onClick: () => setFilter('villa')
                }, 'Villas'),
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'studio' ? 'active' : ''}`,
                    onClick: () => setFilter('studio')
                }, 'Studios')
            ),
            
            React.createElement('div', { className: 'properties-grid' },
                filteredProperties.map(property => 
                    React.createElement(PropertyCard, { 
                        key: property.id, 
                        property: property, 
                        addToCart: addToCart,
                        showNotification: showNotification
                    })
                )
            )
        )
    );
};

// Electronics Page Component
const Electronics = ({ addToCart, showNotification }) => {
    const [filter, setFilter] = React.useState('all');
    
    const electronics = [
        {
            id: 1,
            title: "MacBook Pro 16-inch",
            brand: "Apple",
            price: 12000,
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            category: "Laptop",
            specs: ["16GB RAM", "1TB SSD", "M1 Chip"],
            rating: 4.8,
            isFeatured: true
        },
        {
            id: 2,
            title: "Sony A7III Camera",
            brand: "Sony",
            price: 8000,
            image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            category: "Camera",
            specs: ["24.2MP", "4K Video", "Full Frame"],
            rating: 4.6,
            isFeatured: true
        },
        {
            id: 3,
            title: "PlayStation 5",
            brand: "Sony",
            price: 5000,
            image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2052&q=80",
            category: "Gaming Console",
            specs: ["825GB SSD", "4K Gaming", "Ray Tracing"],
            rating: 4.9
        },
        {
            id: 4,
            title: "iPad Pro 12.9-inch",
            brand: "Apple",
            price: 7000,
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            category: "Tablet",
            specs: ["M1 Chip", "Liquid Retina XDR", "5G"],
            rating: 4.7
        },
        {
            id: 5,
            title: "DJI Mavic Air 2",
            brand: "DJI",
            price: 6000,
            image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
            category: "Drone",
            specs: ["4K/60fps Video", "34min Flight", "48MP Photos"],
            rating: 4.5
        },
        {
            id: 6,
            title: "Samsung QLED 4K TV",
            brand: "Samsung",
            price: 4000,
            image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            category: "Television",
            specs: ["55-inch", "Quantum Dot", "Smart TV"],
            rating: 4.4
        },
        {
            id: 7,
            title: "Canon EOS R5",
            brand: "Canon",
            price: 15000,
            image: "https://dealsallyear.com/cdn/shop/products/eos_r5_-_rf70200.jpg",
            category: "Camera",
            specs: ["45MP", "8K Video", "IBIS"],
            rating: 4.8
        },
        {
            id: 8,
            title: "Dell XPS 13",
            brand: "Dell",
            price: 9000,
            image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80",
            category: "Laptop",
            specs: ["16GB RAM", "512GB SSD", "11th Gen Intel"],
            rating: 4.6
        },
        {
            id: 9,
            title: "Apple Watch Series 8",
            brand: "Apple",
            price: 3500,
            image: "https://tse1.mm.bing.net/th/id/OIP.CJgl60Xs3d-QOzglPJyr-wHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
            category: "Smartwatch",
            specs: ["GPS", "Heart Monitor", "Water Resistant"],
            rating: 4.7
        },
        {
            id: 10,
            title: "Bose QuietComfort 45",
            brand: "Bose",
            price: 2500,
            image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
            category: "Headphones",
            specs: ["Noise Cancelling", "20hr Battery", "Wireless"],
            rating: 4.5
        },
        {
            id: 11,
            title: "Nintendo Switch OLED",
            brand: "Nintendo",
            price: 4000,
            image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            category: "Gaming Console",
            specs: ["7-inch OLED", "64GB Storage", "Portable"],
            rating: 4.6
        },
        {
            id: 12,
            title: "GoPro Hero 11",
            brand: "GoPro",
            price: 5500,
            image: "https://cdn.pocket-lint.com/r/s/970x/assets/images/162622-cameras-review-gopro-hero-11-black-review-image1-m6ebffc47u.jpg",
            category: "Action Camera",
            specs: ["5.3K Video", "Waterproof", "HyperSmooth"],
            rating: 4.4
        }
    ];

    const filteredElectronics = filter === 'all' 
        ? electronics 
        : electronics.filter(product => product.category.toLowerCase() === filter);

    return React.createElement('div', { className: 'section' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'section-title' },
                React.createElement('h2', null, 'Electronics Rental'),
                React.createElement('p', null, 'Rent the latest gadgets and electronics for your needs')
            ),
            
            React.createElement('div', { className: 'filter-buttons' },
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'all' ? 'active' : ''}`,
                    onClick: () => setFilter('all')
                }, 'All Electronics'),
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'laptop' ? 'active' : ''}`,
                    onClick: () => setFilter('laptop')
                }, 'Laptops'),
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'camera' ? 'active' : ''}`,
                    onClick: () => setFilter('camera')
                }, 'Cameras'),
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'tablet' ? 'active' : ''}`,
                    onClick: () => setFilter('tablet')
                }, 'Tablets'),
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'gaming console' ? 'active' : ''}`,
                    onClick: () => setFilter('gaming console')
                }, 'Gaming')
            ),
            
            React.createElement('div', { className: 'products-grid' },
                filteredElectronics.map(product => 
                    React.createElement(ProductCard, { 
                        key: product.id, 
                        product: product, 
                        addToCart: addToCart,
                        showNotification: showNotification
                    })
                )
            )
        )
    );
};

// Vehicles Page Component
const Vehicles = ({ addToCart, showNotification }) => {
    const [filter, setFilter] = React.useState('all');
    
    // Bikes with proper images
    const bikes = [
        {
            id: 1,
            title: "Yamaha MT-15",
            brand: "Yamaha",
            price: 3000,
            image: "https://tse4.mm.bing.net/th/id/OIP.9qPpGYmIvl6fV3CL5HsKQgHaE6?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
            category: "Bike",
            specs: ["155cc", "40kmpl", "Sports"],
            rating: 4.7,
            isFeatured: true
        },
        {
            id: 2,
            title: "Royal Enfield Classic 350",
            brand: "Royal Enfield",
            price: 4000,
            image: "https://tse1.mm.bing.net/th/id/OIP.r9HSIf6Rlq4mjQufujh6PwHaGw?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
            category: "Bike",
            specs: ["346cc", "35kmpl", "Cruiser"],
            rating: 4.5,
            isFeatured: true
        },
        {
            id: 3,
            title: "KTM Duke 200",
            brand: "KTM",
            price: 3500,
            image: "https://tse2.mm.bing.net/th/id/OIP.Jabav2V4_NE7_zH0qsRH9QHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
            category: "Bike",
            specs: ["199cc", "35kmpl", "Naked Sports"],
            rating: 4.6
        },
        {
            id: 4,
            title: "Bajaj Pulsar NS200",
            brand: "Bajaj",
            price: 2800,
            image: "https://www.bajajauto.com/-/media/assets/bajajauto/bikes/discontinued/pulsar/pulsar-180/180-development/bottom-page-images/ns200-grey.png",
            category: "Bike",
            specs: ["199cc", "38kmpl", "Sports"],
            rating: 4.3
        },
        {
            id: 5,
            title: "TVS Apache RTR 160",
            brand: "TVS",
            price: 2500,
            image: "https://tse3.mm.bing.net/th/id/OIP._LVtag0P3MojVtNhD7P13wHaFI?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
            category: "Bike",
            specs: ["159cc", "45kmpl", "Street"],
            rating: 4.4
        },
        {
            id: 6,
            title: "Hero Splendor Plus",
            brand: "Hero",
            price: 1800,
            image: "https://bikepricenepal.com/assets/img/product/product-650c0fed7415e7.jpg",
            category: "Bike",
            specs: ["97cc", "80kmpl", "Commuter"],
            rating: 4.2
        }
    ];

    // Scooters with proper images
    const scooters = [
        {
            id: 7,
            title: "Honda Activa 6G",
            brand: "Honda",
            price: 2000,
            image: "https://images.hindustantimes.com/auto/img/2022/04/08/1600x900/scooty1_1638959065775_1649400269154.png",
            category: "Scooter",
            specs: ["110cc", "60kmpl", "Automatic"],
            rating: 4.6
        },
        {
            id: 8,
            title: "TVS Jupiter",
            brand: "TVS",
            price: 1800,
            image: "https://www.timesbull.com/wp-content/uploads/2024/09/TVS-Jupiter.webp",
            category: "Scooter",
            specs: ["110cc", "55kmpl", "Family"],
            rating: 4.2
        },
        {
            id: 9,
            title: "Suzuki Access 125",
            brand: "Suzuki",
            price: 2200,
            image: "https://tse1.mm.bing.net/th/id/OIF.O94oDqB2Ins6fD5QcUOaow?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
            category: "Scooter",
            specs: ["124cc", "55kmpl", "Premium"],
            rating: 4.4
        },
        {
            id: 10,
            title: "Yamaha Fascino 125",
            brand: "Yamaha",
            price: 2300,
            image: "https://www.yamaha-motor-india.com/theme/v3/image/fascino125fi-new/color/Disc/VIVID-RED-STD.png",
            category: "Scooter",
            specs: ["125cc", "50kmpl", "Fashion"],
            rating: 4.3
        }
    ];

    // Cars with proper images
    const cars = [
        {
            id: 11,
            title: "Hyundai Creta",
            brand: "Hyundai",
            price: 15000,
            image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/fbb3c469677443.5b895fda8a773.jpg",
            category: "Car",
            specs: ["Petrol", "5 Seater", "SUV"],
            rating: 4.4
        },
        {
            id: 12,
            title: "Maruti Suzuki Swift",
            brand: "Maruti",
            price: 10000,
            image: "https://tse1.mm.bing.net/th/id/OIP.VuUAe0qNs2Kow0LFxdX4IwHaEc?cb=12&w=1100&h=660&rs=1&pid=ImgDetMain&o=7&rm=3",
            category: "Car",
            specs: ["Petrol", "5 Seater", "Hatchback"],
            rating: 4.3
        },
        {
            id: 13,
            title: "Hyundai i20",
            brand: "Hyundai",
            price: 11000,
            image: "https://images.carexpert.com.au/resize/3000/-/app/uploads/2022/08/Hyundai-i20N-64.jpg",
            category: "Car",
            specs: ["Petrol", "5 Seater", "Hatchback"],
            rating: 4.4
        },
        {
            id: 14,
            title: "Tata Nexon",
            brand: "Tata",
            price: 14000,
            image: "https://images.hindustantimes.com/auto/img/2023/04/22/1600x900/Nexon_EV_Max_Dark_1681722058918_1682149527371_1682149531001.png",
            category: "Car",
            specs: ["Diesel", "5 Seater", "Compact SUV"],
            rating: 4.5
        },
        {
            id: 15,
            title: "Kia Seltos",
            brand: "Kia",
            price: 16000,
            image: "https://tse4.mm.bing.net/th/id/OIP.34m-tRI--p1ZPDMpczpl3gHaEr?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
            category: "Car",
            specs: ["Petrol", "5 Seater", "SUV"],
            rating: 4.6
        },
        {
            id: 16,
            title: "Honda City",
            brand: "Honda",
            price: 18000,
            image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/134287/city-exterior-right-front-three-quarter-77.jpeg?isig=0&q=80",
            category: "Car",
            specs: ["Petrol", "5 Seater", "Sedan"],
            rating: 4.7
        }
    ];

    const vehicles = [...bikes, ...scooters, ...cars];
    const filteredVehicles = filter === 'all' 
        ? vehicles 
        : vehicles.filter(vehicle => vehicle.category.toLowerCase() === filter);

    return React.createElement('div', { className: 'section' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'section-title' },
                React.createElement('h2', null, 'Vehicle Rentals'),
                React.createElement('p', null, 'Find bikes, scooters, and cars for rent across India')
            ),
            
            React.createElement('div', { className: 'filter-buttons' },
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'all' ? 'active' : ''}`,
                    onClick: () => setFilter('all')
                }, 'All Vehicles'),
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'bike' ? 'active' : ''}`,
                    onClick: () => setFilter('bike')
                }, 'Bikes'),
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'scooter' ? 'active' : ''}`,
                    onClick: () => setFilter('scooter')
                }, 'Scooters'),
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'car' ? 'active' : ''}`,
                    onClick: () => setFilter('car')
                }, 'Cars')
            ),
            
            React.createElement('div', { className: 'products-grid' },
                filteredVehicles.map(vehicle => 
                    React.createElement(ProductCard, { 
                        key: vehicle.id, 
                        product: vehicle, 
                        addToCart: addToCart,
                        showNotification: showNotification
                    })
                )
            )
        )
    );
};

// About Page Component
const About = () => {
    return React.createElement('div', { className: 'section' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'section-title' },
                React.createElement('h2', null, 'About Rentify'),
                React.createElement('p', null, "India's trusted rental platform for properties, electronics, bikes, and cars")
            ),
            
            React.createElement('div', { className: 'about-content' },
                React.createElement('div', { className: 'about-text' },
                    React.createElement('h3', null, 'Our Mission'),
                    React.createElement('p', null,
                        "Retify was founded with a simple mission: to make renting easy, accessible, and trustworthy " +
                        "for everyone in India. We understand the challenges people face when looking for rental options - " +
                        "from properties to vehicles and electronics. Our platform brings verified listings, transparent " +
                        "pricing, and a seamless rental experience to your fingertips."
                    ),
                    
                    React.createElement('h3', null, 'Why Choose Retify?'),
                    React.createElement('div', { className: 'features-grid' },
                        React.createElement('div', { className: 'feature' },
                            React.createElement('i', { className: 'fas fa-shield-alt' }),
                            React.createElement('h4', null, 'Verified Listings'),
                            React.createElement('p', null, 'All our listings go through a verification process to ensure authenticity and quality.')
                        ),
                        React.createElement('div', { className: 'feature' },
                            React.createElement('i', { className: 'fas fa-rupee-sign' }),
                            React.createElement('h4', null, 'Transparent Pricing'),
                            React.createElement('p', null, 'No hidden charges. See the complete cost breakdown before you rent.')
                        ),
                        React.createElement('div', { className: 'feature' },
                            React.createElement('i', { className: 'fas fa-headset' }),
                            React.createElement('h4', null, '24/7 Support'),
                            React.createElement('p', null, 'Our customer support team is available round the clock to assist you.')
                        ),
                        React.createElement('div', { className: 'feature' },
                            React.createElement('i', { className: 'fas fa-map-marker-alt' }),
                            React.createElement('h4', null, 'Pan-India Presence'),
                            React.createElement('p', null, 'We serve customers across major cities and towns in India.')
                        )
                    ),
                    
                    React.createElement('h3', null, 'Our Story'),
                    React.createElement('p', null,
                        "Started in 2020, Retify has grown to become one of India's leading rental platforms. " +
                        "We've helped thousands of customers find their perfect rental options across categories. " +
                        "Whether you're a student looking for a laptop, a professional seeking accommodation, " +
                        "or a family needing a car for vacation, Retify is your one-stop solution."
                    )
                ),
                
                React.createElement('div', { className: 'stats-section' },
                    React.createElement('h3', null, 'Retify in Numbers'),
                    React.createElement('div', { className: 'stats-grid' },
                        React.createElement('div', { className: 'stat' },
                            React.createElement('h4', null, '50,000+'),
                            React.createElement('p', null, 'Happy Customers')
                        ),
                        React.createElement('div', { className: 'stat' },
                            React.createElement('h4', null, '15,000+'),
                            React.createElement('p', null, 'Verified Listings')
                        ),
                        React.createElement('div', { className: 'stat' },
                            React.createElement('h4', null, '25+'),
                            React.createElement('p', null, 'Cities Across India')
                        ),
                        React.createElement('div', { className: 'stat' },
                            React.createElement('h4', null, '4.8/5'),
                            React.createElement('p', null, 'Customer Rating')
                        )
                    )
                )
            )
        )
    );
};

// Main App Component
const App = () => {
    const [cartItems, setCartItems] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState('home');
    const [showCart, setShowCart] = React.useState(false);
    const [notification, setNotification] = React.useState({ message: '', show: false });

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(itemId);
            return;
        }
        
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const openCart = () => {
        setShowCart(true);
    };

    const closeCart = () => {
        setShowCart(false);
    };

    const checkout = () => {
        if (cartItems.length === 0) return;
        
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        showNotification(`Checkout successful! Total: ₹${total}/month`);
        setCartItems([]);
        setShowCart(false);
    };

    const showNotification = (message) => {
        setNotification({ message, show: true });
        setTimeout(() => {
            setNotification({ message: '', show: false });
        }, 3000);
    };

    const getCartItemsCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    const navigateTo = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const renderPage = () => {
        switch(currentPage) {
            case 'properties':
                return React.createElement(Properties, { 
                    addToCart, 
                    showNotification 
                });
            case 'electronics':
                return React.createElement(Electronics, { 
                    addToCart, 
                    showNotification 
                });
            case 'vehicles':
                return React.createElement(Vehicles, { 
                    addToCart, 
                    showNotification 
                });
            case 'about':
                return React.createElement(About);
            case 'home':
            default:
                return React.createElement(Home, { 
                    addToCart, 
                    showNotification,
                    navigateTo 
                });
        }
    };

    return React.createElement('div', { className: 'App' },
        React.createElement(Header, { 
            cartItemsCount: getCartItemsCount(), 
            openCart: openCart,
            currentPage: currentPage,
            navigateTo: navigateTo
        }),
        React.createElement('main', null, renderPage()),
        React.createElement(Footer),
        showCart && React.createElement(CartModal, {
            cartItems: cartItems,
            removeFromCart: removeFromCart,
            updateQuantity: updateQuantity,
            closeCart: closeCart,
            checkout: checkout
        }),
        React.createElement(Notification, {
            message: notification.message,
            show: notification.show
        })
    );
};

// Render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
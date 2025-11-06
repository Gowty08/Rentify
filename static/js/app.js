// Notification Component
const Notification = ({ message, show }) => {
    return React.createElement('div', { 
        className: `notification ${show ? 'show' : ''}` 
    }, message);
};

// Login Modal Component - RESTRUCTURED
const LoginModal = ({ show, onClose, onSwitchToSignup, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = React.useState(true);
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError('Email and password are required');
            return false;
        }
        
        if (!isLogin) {
            if (!formData.name) {
                setError('Name is required');
                return false;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return false;
            }
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters long');
                return false;
            }
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (isLogin) {
                // Login logic
                console.log('Login attempt:', { email: formData.email, password: formData.password });
                
                // Simulate successful login
                const userData = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: formData.name || "Demo User",
                    email: formData.email,
                    phone: '+91 98765 43210',
                    joinDate: new Date().toLocaleDateString()
                };
                
                onLoginSuccess(userData);
                showNotification(`Welcome back, ${userData.name}!`);
            } else {
                // Signup logic
                console.log('Signup attempt:', formData);
                
                // Simulate successful signup
                const userData = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: formData.name,
                    email: formData.email,
                    phone: '+91 98765 43210',
                    joinDate: new Date().toLocaleDateString()
                };
                
                onLoginSuccess(userData);
                showNotification(`Account created successfully! Welcome, ${userData.name}!`);
            }
            
            onClose();
        } catch (err) {
            setError(isLogin ? 'Invalid email or password' : 'Error creating account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            email: '',
            password: '',
            name: '',
            confirmPassword: ''
        });
        setError('');
    };

    const handleClose = () => {
        setError('');
        setFormData({
            email: '',
            password: '',
            name: '',
            confirmPassword: ''
        });
        onClose();
    };

    if (!show) return null;

    return React.createElement('div', { className: 'modal-overlay' },
        React.createElement('div', { className: 'modal-content' },
            React.createElement('div', { className: 'modal-header' },
                React.createElement('h2', null, isLogin ? 'Login' : 'Sign Up'),
                React.createElement('button', { 
                    className: 'close-modal', 
                    onClick: handleClose,
                    disabled: loading
                }, '×')
            ),
            
            // Error message
            error && React.createElement('div', { className: 'error-message' },
                React.createElement('i', { className: 'fas fa-exclamation-circle' }),
                error
            ),
            
            React.createElement('form', { onSubmit: handleSubmit, className: 'auth-form' },
                !isLogin && React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'Full Name'),
                    React.createElement('input', {
                        type: 'text',
                        name: 'name',
                        value: formData.name,
                        onChange: handleInputChange,
                        required: !isLogin,
                        placeholder: 'Enter your full name',
                        disabled: loading
                    })
                ),
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'Email'),
                    React.createElement('input', {
                        type: 'email',
                        name: 'email',
                        value: formData.email,
                        onChange: handleInputChange,
                        required: true,
                        placeholder: 'Enter your email',
                        disabled: loading
                    })
                ),
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'Password'),
                    React.createElement('input', {
                        type: 'password',
                        name: 'password',
                        value: formData.password,
                        onChange: handleInputChange,
                        required: true,
                        placeholder: 'Enter your password',
                        disabled: loading
                    })
                ),
                !isLogin && React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'Confirm Password'),
                    React.createElement('input', {
                        type: 'password',
                        name: 'confirmPassword',
                        value: formData.confirmPassword,
                        onChange: handleInputChange,
                        required: !isLogin,
                        placeholder: 'Confirm your password',
                        disabled: loading
                    })
                ),
                React.createElement('button', { 
                    type: 'submit', 
                    className: `btn btn-primary btn-full ${loading ? 'loading' : ''}`,
                    disabled: loading
                }, 
                    loading ? React.createElement(React.Fragment, null,
                        React.createElement('i', { className: 'fas fa-spinner fa-spin' }),
                        ' Processing...'
                    ) : (isLogin ? 'Login' : 'Sign Up')
                ),
                React.createElement('div', { className: 'auth-switch' },
                    React.createElement('p', null, 
                        isLogin ? "Don't have an account? " : "Already have an account? ",
                        React.createElement('button', {
                            type: 'button',
                            className: 'switch-btn',
                            onClick: switchMode,
                            disabled: loading
                        }, isLogin ? 'Sign Up' : 'Login')
                    )
                )
            )
        )
    );
};

// Product Details Modal Component
const ProductDetailsModal = ({ product, show, onClose, addToCart, showNotification }) => {
    const [selectedImage, setSelectedImage] = React.useState(0);
    
    if (!show || !product) return null;

    const handleRentNow = () => {
        addToCart({
            ...product,
            quantity: 1
        });
        showNotification(`${product.title} added to cart!`);
        onClose();
    };

    const renderStars = (rating) => {
        const stars = [];
        const actualRating = product.rating || 4;
        for (let i = 1; i <= 5; i++) {
            stars.push(
                React.createElement('i', { 
                    key: i, 
                    className: `fas fa-star ${i <= actualRating ? 'filled' : ''}`
                })
            );
        }
        return stars;
    };

    return React.createElement('div', { className: 'modal-overlay' },
        React.createElement('div', { className: 'modal-content product-details-modal' },
            React.createElement('div', { className: 'modal-header' },
                React.createElement('h2', null, product.title),
                React.createElement('button', { 
                    className: 'close-modal', 
                    onClick: onClose 
                }, '×')
            ),
            React.createElement('div', { className: 'product-details-content' },
                React.createElement('div', { className: 'product-images' },
                    React.createElement('div', { className: 'main-image' },
                        React.createElement('img', { 
                            src: product.image, 
                            alt: product.title 
                        })
                    )
                ),
                React.createElement('div', { className: 'product-info' },
                    React.createElement('div', { className: 'product-header' },
                        React.createElement('h3', null, product.title),
                        React.createElement('div', { className: 'product-rating' },
                            renderStars(product.rating),
                            React.createElement('span', null, `(${product.rating || 4})`)
                        )
                    ),
                    
                    React.createElement('div', { className: 'product-price' },
                        React.createElement('span', null, `₹${product.price}/month`)
                    ),
                    
                    React.createElement('div', { className: 'product-specs' },
                        React.createElement('h4', null, 'Specifications'),
                        React.createElement('ul', null,
                            product.brand && React.createElement('li', null,
                                React.createElement('strong', null, 'Brand: '),
                                product.brand
                            ),
                            product.category && React.createElement('li', null,
                                React.createElement('strong', null, 'Category: '),
                                product.category
                            ),
                            product.location && React.createElement('li', null,
                                React.createElement('strong', null, 'Location: '),
                                product.location
                            ),
                            product.bedrooms && React.createElement('li', null,
                                React.createElement('strong', null, 'Bedrooms: '),
                                product.bedrooms
                            ),
                            product.bathrooms && React.createElement('li', null,
                                React.createElement('strong', null, 'Bathrooms: '),
                                product.bathrooms
                            ),
                            product.area && React.createElement('li', null,
                                React.createElement('strong', null, 'Area: '),
                                `${product.area} sq ft`
                            ),
                            product.specs && Array.isArray(product.specs) && product.specs.map((spec, index) =>
                                React.createElement('li', { key: index }, spec)
                            )
                        )
                    ),
                    
                    React.createElement('div', { className: 'product-description' },
                        React.createElement('h4', null, 'Description'),
                        React.createElement('p', null, 
                            product.description || 
                            `This ${product.category || 'item'} is available for rent at an affordable monthly rate. Perfect for your needs with quality assurance and reliable service.`
                        )
                    ),
                    
                    React.createElement('div', { className: 'product-actions' },
                        React.createElement('button', { 
                            className: 'btn btn-primary', 
                            onClick: handleRentNow 
                        }, 'Rent Now'),
                        React.createElement('button', { 
                            className: 'btn btn-outline',
                            onClick: onClose
                        }, 'Close')
                    )
                )
            )
        )
    );
};

// Search Component
const SearchComponent = ({ onSearch, searchQuery, setSearchQuery, navigateTo }) => {
    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            onSearch(searchQuery);
        }
    };

    const handleCategoryNavigation = (query) => {
        const lowerQuery = query.toLowerCase();
        
        // Navigate to specific pages based on search terms
        if (lowerQuery.includes('property') || lowerQuery.includes('apartment') || 
            lowerQuery.includes('house') || lowerQuery.includes('villa') || 
            lowerQuery.includes('studio')) {
            navigateTo('properties');
        } else if (lowerQuery.includes('electronic') || lowerQuery.includes('laptop') || 
                   lowerQuery.includes('camera') || lowerQuery.includes('phone') || 
                   lowerQuery.includes('tablet') || lowerQuery.includes('gaming')) {
            navigateTo('electronics');
        } else if (lowerQuery.includes('car') || lowerQuery.includes('bike') || 
                   lowerQuery.includes('scooter') || lowerQuery.includes('vehicle') ||
                   lowerQuery.includes('motorcycle')) {
            navigateTo('vehicles');
        }
        // If no specific category match, stay on current page but filter results
    };

    const handleSearchClick = () => {
        onSearch(searchQuery);
        handleCategoryNavigation(searchQuery);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch(searchQuery);
            handleCategoryNavigation(searchQuery);
        }
    };

    return React.createElement('div', { className: 'search-container' },
        React.createElement('div', { className: 'search-bar' },
            React.createElement('input', {
                type: 'text',
                placeholder: 'Search for properties, electronics, bikes, cars...',
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                onKeyPress: handleKeyPress
            }),
            React.createElement('button', { 
                onClick: handleSearchClick
            }, React.createElement('i', { className: 'fas fa-search' }))
        )
    );
};

// Cart Modal Component
const CartModal = ({ cartItems, removeFromCart, updateQuantity, closeCart, checkout, user, openLogin }) => {
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleProceedToCheckout = () => {
        if (!user) {
            closeCart();
            openLogin(true);
            return;
        }
        checkout();
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
                                onClick: handleProceedToCheckout
                            }, user ? 'Proceed to Checkout' : 'Login to Checkout')
                        )
                    )
                  )
        )
    );
};

// Header Component
const Header = ({ cartItemsCount, openCart, currentPage, navigateTo, openLogin, user, logout, onSearch, searchQuery, setSearchQuery }) => {
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
                }, 'Rentify'),
                
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
                        user && React.createElement('li', null, 
                            React.createElement('a', { 
                                href: '#',
                                className: currentPage === 'orders' ? 'active' : '',
                                onClick: (e) => {
                                    e.preventDefault();
                                    navigateTo('orders');
                                    setIsMenuOpen(false);
                                }
                            }, 'My Orders')
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
                    React.createElement(SearchComponent, {
                        onSearch: onSearch,
                        searchQuery: searchQuery,
                        setSearchQuery: setSearchQuery,
                        navigateTo: navigateTo
                    }),
                    React.createElement('div', { 
                        className: 'cart-icon', 
                        onClick: openCart 
                    },
                        React.createElement('i', { className: 'fas fa-shopping-cart' }),
                        cartItemsCount > 0 && React.createElement('span', { className: 'cart-count' }, cartItemsCount)
                    ),
                    React.createElement('div', { className: 'auth-buttons' },
                        user ? 
                            React.createElement('div', { className: 'user-menu' },
                                React.createElement('span', { 
                                    className: 'user-name',
                                    onClick: () => navigateTo('profile')
                                }, `Hello, ${user.name}`),
                                React.createElement('button', { 
                                    className: 'logout-btn',
                                    onClick: logout
                                }, 'Logout')
                            ) :
                            React.createElement(React.Fragment, null,
                                React.createElement('button', { 
                                    className: 'login-btn',
                                    onClick: () => openLogin(true)
                                }, 'Login'),
                                React.createElement('button', { 
                                    className: 'signup-btn',
                                    onClick: () => openLogin(false)
                                }, 'Sign Up')
                            )
                    )
                )
            )
        )
    );
};

// Order Success Component
const OrderSuccess = ({ order, onContinueShopping, onViewOrders }) => {
    return React.createElement('div', { className: 'section' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'order-success' },
                React.createElement('div', { className: 'success-icon' },
                    React.createElement('i', { className: 'fas fa-check-circle' })
                ),
                React.createElement('h1', null, 'Order Placed Successfully!'),
                React.createElement('p', null, `Thank you for your rental order. Your order #${order.id} has been confirmed.`),
                
                React.createElement('div', { className: 'order-summary-card' },
                    React.createElement('h3', null, 'Order Summary'),
                    React.createElement('div', { className: 'order-details-grid' },
                        React.createElement('div', { className: 'order-info' },
                            React.createElement('h4', null, 'Order Details'),
                            React.createElement('div', { className: 'detail-row' },
                                React.createElement('span', null, 'Order ID:'),
                                React.createElement('span', null, order.id)
                            ),
                            React.createElement('div', { className: 'detail-row' },
                                React.createElement('span', null, 'Order Date:'),
                                React.createElement('span', null, order.orderDate)
                            ),
                            React.createElement('div', { className: 'detail-row' },
                                React.createElement('span', null, 'Total Amount:'),
                                React.createElement('span', null, `₹${order.totalAmount}`)
                            ),
                            React.createElement('div', { className: 'detail-row' },
                                React.createElement('span', null, 'Rental Duration:'),
                                React.createElement('span', null, `${order.duration} month${order.duration > 1 ? 's' : ''}`)
                            )
                        ),
                        React.createElement('div', { className: 'order-items-summary' },
                            React.createElement('h4', null, 'Rental Items'),
                            React.createElement('div', { className: 'ordered-items' },
                                order.items.map(item => 
                                    React.createElement('div', { key: item.id, className: 'ordered-item' },
                                        React.createElement('div', { className: 'item-image' },
                                            React.createElement('img', { src: item.image, alt: item.title })
                                        ),
                                        React.createElement('div', { className: 'item-details' },
                                            React.createElement('h5', null, item.title),
                                            React.createElement('p', null, `₹${item.price}/month × ${item.quantity}`),
                                            React.createElement('p', { className: 'item-total' }, 
                                                `Total: ₹${item.price * item.quantity * order.duration}`
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                
                React.createElement('div', { className: 'delivery-info' },
                    React.createElement('h4', null, 'What happens next?'),
                    React.createElement('div', { className: 'timeline' },
                        React.createElement('div', { className: 'timeline-step' },
                            React.createElement('div', { className: 'step-icon' },
                                React.createElement('i', { className: 'fas fa-clipboard-check' })
                            ),
                            React.createElement('div', { className: 'step-content' },
                                React.createElement('h5', null, 'Order Confirmed'),
                                React.createElement('p', null, 'Your order has been confirmed and is being processed.')
                            )
                        ),
                        React.createElement('div', { className: 'timeline-step' },
                            React.createElement('div', { className: 'step-icon' },
                                React.createElement('i', { className: 'fas fa-truck' })
                            ),
                            React.createElement('div', { className: 'step-content' },
                                React.createElement('h5', null, 'Delivery Scheduled'),
                                React.createElement('p', null, `We will contact you within 24 hours to schedule delivery for ${order.startDate}.`)
                            )
                        ),
                        React.createElement('div', { className: 'timeline-step' },
                            React.createElement('div', { className: 'step-icon' },
                                React.createElement('i', { className: 'fas fa-home' })
                            ),
                            React.createElement('div', { className: 'step-content' },
                                React.createElement('h5', null, 'Enjoy Your Rental'),
                                React.createElement('p', null, 'Your rental period begins on the scheduled delivery date.')
                            )
                        )
                    )
                ),
                
                React.createElement('div', { className: 'success-actions' },
                    React.createElement('button', {
                        className: 'btn btn-primary',
                        onClick: onViewOrders
                    }, 'View My Orders'),
                    React.createElement('button', {
                        className: 'btn btn-outline',
                        onClick: onContinueShopping
                    }, 'Continue Shopping')
                )
            )
        )
    );
};

// Hero Component
const Hero = ({ onSearch, searchQuery, setSearchQuery, navigateTo }) => {
    return React.createElement('section', { className: 'hero' },
        React.createElement('div', { className: 'container' },
            React.createElement('h1', null, 'Find Your Perfect Rental in India'),
            React.createElement('p', null, 'Discover properties, electronics, bikes, and cars for rent across India. Quality assured with verified listings and customer reviews.'),
            React.createElement(SearchComponent, {
                onSearch: onSearch,
                searchQuery: searchQuery,
                setSearchQuery: setSearchQuery,
                navigateTo: navigateTo
            })
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
const PropertyCard = ({ property, addToCart, showNotification, viewDetails }) => {
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

    const handleViewDetails = () => {
        viewDetails(property);
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
                React.createElement('button', { 
                    className: 'btn btn-outline', 
                    onClick: handleViewDetails 
                }, 'View Details')
            )
        )
    );
};

// Product Card Component
const ProductCard = ({ product, addToCart, showNotification, viewDetails }) => {
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

    const handleViewDetails = () => {
        viewDetails(product);
    };

    const renderStars = (rating) => {
        const stars = [];
        const actualRating = rating || 4;
        for (let i = 1; i <= 5; i++) {
            stars.push(
                React.createElement('i', { 
                    key: i, 
                    className: `fas fa-star ${i <= actualRating ? 'filled' : ''}`
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
                React.createElement('span', null, `(${rating || 4})`)
            ),
            React.createElement('div', { className: 'product-price' }, `₹${price}/month`),
            React.createElement('div', { className: 'product-features' },
                Array.isArray(specs) && specs.map((spec, index) => 
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
                React.createElement('button', { 
                    className: 'btn btn-outline', 
                    onClick: handleViewDetails 
                }, 'View Details')
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

// User Profile Component
const UserProfile = ({ user, updateUser, showNotification }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        updateUser(formData);
        setIsEditing(false);
        showNotification('Profile updated successfully!');
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || ''
        });
        setIsEditing(false);
    };

    return React.createElement('div', { className: 'section' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'profile-header' },
                React.createElement('div', { className: 'profile-avatar' },
                    React.createElement('i', { className: 'fas fa-user-circle' })
                ),
                React.createElement('div', { className: 'profile-info' },
                    React.createElement('h1', null, user?.name || 'User'),
                    React.createElement('p', null, `Member since ${user?.joinDate || '2024'}`)
                )
            ),
            
            React.createElement('div', { className: 'profile-content' },
                React.createElement('div', { className: 'profile-section' },
                    React.createElement('div', { className: 'section-header' },
                        React.createElement('h2', null, 'Personal Information'),
                        !isEditing && React.createElement('button', {
                            className: 'btn btn-outline',
                            onClick: () => setIsEditing(true)
                        }, 'Edit Profile')
                    ),
                    
                    React.createElement('div', { className: 'profile-form' },
                        React.createElement('div', { className: 'form-group' },
                            React.createElement('label', null, 'Full Name'),
                            React.createElement('input', {
                                type: 'text',
                                name: 'name',
                                value: formData.name,
                                onChange: handleInputChange,
                                disabled: !isEditing,
                                placeholder: 'Enter your full name'
                            })
                        ),
                        React.createElement('div', { className: 'form-group' },
                            React.createElement('label', null, 'Email'),
                            React.createElement('input', {
                                type: 'email',
                                name: 'email',
                                value: formData.email,
                                onChange: handleInputChange,
                                disabled: !isEditing,
                                placeholder: 'Enter your email'
                            })
                        ),
                        React.createElement('div', { className: 'form-group' },
                            React.createElement('label', null, 'Phone'),
                            React.createElement('input', {
                                type: 'tel',
                                name: 'phone',
                                value: formData.phone,
                                onChange: handleInputChange,
                                disabled: !isEditing,
                                placeholder: 'Enter your phone number'
                            })
                        ),
                        React.createElement('div', { className: 'form-group' },
                            React.createElement('label', null, 'Address'),
                            React.createElement('textarea', {
                                name: 'address',
                                value: formData.address,
                                onChange: handleInputChange,
                                disabled: !isEditing,
                                placeholder: 'Enter your address',
                                rows: 3
                            })
                        ),
                        
                        isEditing && React.createElement('div', { className: 'form-actions' },
                            React.createElement('button', {
                                className: 'btn btn-primary',
                                onClick: handleSave
                            }, 'Save Changes'),
                            React.createElement('button', {
                                className: 'btn btn-outline',
                                onClick: handleCancel
                            }, 'Cancel')
                        )
                    )
                ),
                
                React.createElement('div', { className: 'profile-section' },
                    React.createElement('h2', null, 'Account Statistics'),
                    React.createElement('div', { className: 'stats-grid' },
                        React.createElement('div', { className: 'stat-card' },
                            React.createElement('i', { className: 'fas fa-shopping-cart' }),
                            React.createElement('div', null,
                                React.createElement('h3', null, '12'),
                                React.createElement('p', null, 'Total Orders')
                            )
                        ),
                        React.createElement('div', { className: 'stat-card' },
                            React.createElement('i', { className: 'fas fa-home' }),
                            React.createElement('div', null,
                                React.createElement('h3', null, '3'),
                                React.createElement('p', null, 'Active Rentals')
                            )
                        ),
                        React.createElement('div', { className: 'stat-card' },
                            React.createElement('i', { className: 'fas fa-star' }),
                            React.createElement('div', null,
                                React.createElement('h3', null, '4.8'),
                                React.createElement('p', null, 'Avg Rating')
                            )
                        ),
                        React.createElement('div', { className: 'stat-card' },
                            React.createElement('i', { className: 'fas fa-calendar' }),
                            React.createElement('div', null,
                                React.createElement('h3', null, '8'),
                                React.createElement('p', null, 'Months Member')
                            )
                        )
                    )
                )
            )
        )
    );
};

// Order History Component
const OrderHistory = ({ orders, showNotification }) => {
    const [filter, setFilter] = React.useState('all');

    const filteredOrders = filter === 'all' 
        ? orders 
        : orders.filter(order => order.status === filter);

    const getStatusColor = (status) => {
        switch(status) {
            case 'completed': return 'success';
            case 'active': return 'primary';
            case 'pending': return 'warning';
            case 'cancelled': return 'error';
            default: return 'default';
        }
    };

    const handleExtendRental = (orderId) => {
        showNotification('Rental extension request sent!');
    };

    const handleCancelOrder = (orderId) => {
        showNotification('Order cancellation request submitted!');
    };

    return React.createElement('div', { className: 'section' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'section-title' },
                React.createElement('h2', null, 'My Orders'),
                React.createElement('p', null, 'Manage your rental orders and track their status')
            ),
            
            React.createElement('div', { className: 'filter-buttons' },
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'all' ? 'active' : ''}`,
                    onClick: () => setFilter('all')
                }, 'All Orders'),
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'active' ? 'active' : ''}`,
                    onClick: () => setFilter('active')
                }, 'Active'),
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'completed' ? 'active' : ''}`,
                    onClick: () => setFilter('completed')
                }, 'Completed'),
                React.createElement('button', { 
                    className: `filter-btn ${filter === 'pending' ? 'active' : ''}`,
                    onClick: () => setFilter('pending')
                }, 'Pending')
            ),
            
            filteredOrders.length === 0 ? 
                React.createElement('div', { className: 'no-orders' },
                    React.createElement('i', { className: 'fas fa-box-open' }),
                    React.createElement('h3', null, 'No orders found'),
                    React.createElement('p', null, 
                        filter === 'all' 
                            ? "You haven't placed any orders yet."
                            : `You don't have any ${filter} orders.`
                    )
                ) :
                React.createElement('div', { className: 'orders-list' },
                    filteredOrders.map(order => 
                        React.createElement('div', { key: order.id, className: 'order-card' },
                            React.createElement('div', { className: 'order-header' },
                                React.createElement('div', { className: 'order-info' },
                                    React.createElement('h3', null, order.itemTitle),
                                    React.createElement('p', null, `Order #${order.id} • ${order.date}`)
                                ),
                                React.createElement('div', { className: `order-status ${getStatusColor(order.status)}` },
                                    order.status.charAt(0).toUpperCase() + order.status.slice(1)
                                )
                            ),
                            React.createElement('div', { className: 'order-content' },
                                React.createElement('div', { className: 'order-image' },
                                    React.createElement('img', { src: order.image, alt: order.itemTitle })
                                ),
                                React.createElement('div', { className: 'order-details' },
                                    React.createElement('div', { className: 'order-specs' },
                                        React.createElement('div', { className: 'spec-row' },
                                            React.createElement('strong', null, 'Category:'),
                                            React.createElement('span', null, order.category)
                                        ),
                                        React.createElement('div', { className: 'spec-row' },
                                            React.createElement('strong', null, 'Duration:'),
                                            React.createElement('span', null, `${order.duration} month${order.duration > 1 ? 's' : ''}`)
                                        ),
                                        React.createElement('div', { className: 'spec-row' },
                                            React.createElement('strong', null, 'Start Date:'),
                                            React.createElement('span', null, order.startDate)
                                        ),
                                        React.createElement('div', { className: 'spec-row' },
                                            React.createElement('strong', null, 'End Date:'),
                                            React.createElement('span', null, order.endDate)
                                        )
                                    ),
                                    React.createElement('div', { className: 'order-price' },
                                        React.createElement('span', { className: 'price-amount' }, `₹${order.totalAmount}`),
                                        React.createElement('small', null, 'total')
                                    )
                                )
                            ),
                            React.createElement('div', { className: 'order-actions' },
                                order.status === 'active' && 
                                    React.createElement('button', {
                                        className: 'btn btn-primary',
                                        onClick: () => handleExtendRental(order.id)
                                    }, 'Extend Rental'),
                                (order.status === 'active' || order.status === 'pending') && 
                                    React.createElement('button', {
                                        className: 'btn btn-outline',
                                        onClick: () => handleCancelOrder(order.id)
                                    }, 'Cancel Order'),
                                React.createElement('button', {
                                    className: 'btn btn-outline'
                                }, 'View Details')
                            )
                        )
                    )
                )
        )
    );
};

// Checkout/Place Order Component
const Checkout = ({ cartItems, user, onOrderSuccess, onBack, showNotification }) => {
    const [orderData, setOrderData] = React.useState({
        duration: 1,
        startDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'credit_card',
        address: user?.address || '',
        specialInstructions: ''
    });
    const [loading, setLoading] = React.useState(false);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity * orderData.duration), 0);
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const order = {
                id: Math.random().toString(36).substr(2, 9).toUpperCase(),
                items: [...cartItems],
                totalAmount: calculateTotal(),
                duration: orderData.duration,
                startDate: orderData.startDate,
                endDate: new Date(new Date(orderData.startDate).setMonth(new Date(orderData.startDate).getMonth() + parseInt(orderData.duration))).toISOString().split('T')[0],
                status: 'pending',
                paymentMethod: orderData.paymentMethod,
                orderDate: new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })
            };
            
            onOrderSuccess(order);
            showNotification('Order placed successfully!');
        } catch (error) {
            showNotification('Error placing order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return React.createElement('div', { className: 'section' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'section-title' },
                React.createElement('h2', null, 'Checkout'),
                React.createElement('p', null, 'Review your order and complete the rental process')
            ),
            
            React.createElement('div', { className: 'checkout-content' },
                React.createElement('div', { className: 'checkout-form' },
                    React.createElement('div', { className: 'form-section' },
                        React.createElement('h3', null, 'Rental Details'),
                        React.createElement('div', { className: 'form-group' },
                            React.createElement('label', null, 'Rental Duration (months)'),
                            React.createElement('select', {
                                name: 'duration',
                                value: orderData.duration,
                                onChange: handleInputChange
                            },
                                [1,2,3,4,5,6,7,8,9,10,11,12].map(month => 
                                    React.createElement('option', { key: month, value: month }, 
                                        `${month} month${month > 1 ? 's' : ''}`
                                    )
                                )
                            )
                        ),
                        React.createElement('div', { className: 'form-group' },
                            React.createElement('label', null, 'Start Date'),
                            React.createElement('input', {
                                type: 'date',
                                name: 'startDate',
                                value: orderData.startDate,
                                onChange: handleInputChange,
                                min: new Date().toISOString().split('T')[0]
                            })
                        )
                    ),
                    
                    React.createElement('div', { className: 'form-section' },
                        React.createElement('h3', null, 'Delivery Information'),
                        React.createElement('div', { className: 'form-group' },
                            React.createElement('label', null, 'Delivery Address'),
                            React.createElement('textarea', {
                                name: 'address',
                                value: orderData.address,
                                onChange: handleInputChange,
                                placeholder: 'Enter your complete delivery address',
                                rows: 4
                            })
                        ),
                        React.createElement('div', { className: 'form-group' },
                            React.createElement('label', null, 'Special Instructions (Optional)'),
                            React.createElement('textarea', {
                                name: 'specialInstructions',
                                value: orderData.specialInstructions,
                                onChange: handleInputChange,
                                placeholder: 'Any special delivery instructions...',
                                rows: 3
                            })
                        )
                    ),
                    
                    React.createElement('div', { className: 'form-section' },
                        React.createElement('h3', null, 'Payment Method'),
                        React.createElement('div', { className: 'payment-options' },
                            React.createElement('label', { className: 'payment-option' },
                                React.createElement('input', {
                                    type: 'radio',
                                    name: 'paymentMethod',
                                    value: 'credit_card',
                                    checked: orderData.paymentMethod === 'credit_card',
                                    onChange: handleInputChange
                                }),
                                React.createElement('div', { className: 'payment-content' },
                                    React.createElement('i', { className: 'fas fa-credit-card' }),
                                    React.createElement('span', null, 'Credit/Debit Card')
                                )
                            ),
                            React.createElement('label', { className: 'payment-option' },
                                React.createElement('input', {
                                    type: 'radio',
                                    name: 'paymentMethod',
                                    value: 'upi',
                                    checked: orderData.paymentMethod === 'upi',
                                    onChange: handleInputChange
                                }),
                                React.createElement('div', { className: 'payment-content' },
                                    React.createElement('i', { className: 'fas fa-mobile-alt' }),
                                    React.createElement('span', null, 'UPI Payment')
                                )
                            ),
                            React.createElement('label', { className: 'payment-option' },
                                React.createElement('input', {
                                    type: 'radio',
                                    name: 'paymentMethod',
                                    value: 'net_banking',
                                    checked: orderData.paymentMethod === 'net_banking',
                                    onChange: handleInputChange
                                }),
                                React.createElement('div', { className: 'payment-content' },
                                    React.createElement('i', { className: 'fas fa-university' }),
                                    React.createElement('span', null, 'Net Banking')
                                )
                            ),
                            React.createElement('label', { className: 'payment-option' },
                                React.createElement('input', {
                                    type: 'radio',
                                    name: 'paymentMethod',
                                    value: 'cash_on_delivery',
                                    checked: orderData.paymentMethod === 'cash_on_delivery',
                                    onChange: handleInputChange
                                }),
                                React.createElement('div', { className: 'payment-content' },
                                    React.createElement('i', { className: 'fas fa-money-bill-wave' }),
                                    React.createElement('span', null, 'Cash on Delivery')
                                )
                            )
                        )
                    )
                ),
                
                React.createElement('div', { className: 'order-summary' },
                    React.createElement('h3', null, 'Order Summary'),
                    React.createElement('div', { className: 'order-items' },
                        cartItems.map(item => 
                            React.createElement('div', { key: item.id, className: 'order-item' },
                                React.createElement('div', { className: 'item-image' },
                                    React.createElement('img', { src: item.image, alt: item.title })
                                ),
                                React.createElement('div', { className: 'item-details' },
                                    React.createElement('h4', null, item.title),
                                    React.createElement('p', null, `₹${item.price}/month × ${item.quantity}`)
                                ),
                                React.createElement('div', { className: 'item-total' },
                                    `₹${item.price * item.quantity * orderData.duration}`
                                )
                            )
                        )
                    ),
                    
                    React.createElement('div', { className: 'order-totals' },
                        React.createElement('div', { className: 'total-row' },
                            React.createElement('span', null, 'Subtotal:'),
                            React.createElement('span', null, `₹${calculateSubtotal()}`)
                        ),
                        React.createElement('div', { className: 'total-row' },
                            React.createElement('span', null, 'Duration:'),
                            React.createElement('span', null, `${orderData.duration} month${orderData.duration > 1 ? 's' : ''}`)
                        ),
                        React.createElement('div', { className: 'total-row' },
                            React.createElement('span', null, 'Delivery:'),
                            React.createElement('span', null, '₹0')
                        ),
                        React.createElement('div', { className: 'total-row total' },
                            React.createElement('span', null, 'Total:'),
                            React.createElement('span', null, `₹${calculateTotal()}`)
                        )
                    ),
                    
                    React.createElement('div', { className: 'checkout-actions' },
                        React.createElement('button', {
                            className: 'btn btn-outline',
                            onClick: onBack
                        }, 'Back to Cart'),
                        React.createElement('button', {
                            className: `btn btn-primary ${loading ? 'loading' : ''}`,
                            onClick: handlePlaceOrder,
                            disabled: loading || cartItems.length === 0
                        }, 
                            loading ? 
                                React.createElement(React.Fragment, null,
                                    React.createElement('i', { className: 'fas fa-spinner fa-spin' }),
                                    ' Processing...'
                                ) : 
                                `Place Order - ₹${calculateTotal()}`
                        )
                    ),
                    
                    React.createElement('div', { className: 'security-notice' },
                        React.createElement('i', { className: 'fas fa-shield-alt' }),
                        React.createElement('span', null, 'Your payment is secure and encrypted')
                    )
                )
            )
        )
    );
};

// Footer Component
const Footer = () => {
    return React.createElement('footer', { className: 'footer' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'footer-content' },
                React.createElement('div', { className: 'footer-column' },
                    React.createElement('h3', null, 'Rentify'),
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
                            ' info@rentify.com'
                        )
                    )
                )
            ),
            React.createElement('div', { className: 'footer-bottom' },
                React.createElement('p', null, '© 2023 Rentify. All rights reserved.')
            )
        )
    );
};

// Home Page Component
const Home = ({ addToCart, showNotification, navigateTo, viewDetails, searchQuery, setSearchQuery, onSearch }) => {
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
            text: "Found my dream apartment through Rentify. The verification process gave me confidence in the listing.",
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
        React.createElement(Hero, { 
            onSearch: onSearch, 
            searchQuery: searchQuery, 
            setSearchQuery: setSearchQuery,
            navigateTo: navigateTo 
        }),
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
                            showNotification: showNotification,
                            viewDetails: viewDetails
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
                            showNotification: showNotification,
                            viewDetails: viewDetails
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
const Properties = ({ addToCart, showNotification, viewDetails, searchQuery }) => {
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

    // Search functionality
    const searchedProperties = searchQuery 
        ? filteredProperties.filter(property => 
            property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.type.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : filteredProperties;

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
            
            (searchedProperties.length === 0 && searchQuery) ? 
                React.createElement('div', { className: 'no-results' },
                    React.createElement('p', null, `No properties found for "${searchQuery}"`),
                    React.createElement('button', { 
                        className: 'btn btn-primary',
                        onClick: () => setFilter('all')
                    }, 'Show All Properties')
                ) : null,
            
            React.createElement('div', { className: 'properties-grid' },
                searchedProperties.map(property => 
                    React.createElement(PropertyCard, { 
                        key: property.id, 
                        property: property, 
                        addToCart: addToCart,
                        showNotification: showNotification,
                        viewDetails: viewDetails
                    })
                )
            )
        )
    );
};

// Electronics Page Component
const Electronics = ({ addToCart, showNotification, viewDetails, searchQuery }) => {
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

    // Search functionality
    const searchedElectronics = searchQuery 
        ? filteredElectronics.filter(product => 
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (Array.isArray(product.specs) && product.specs.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())))
          )
        : filteredElectronics;

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
            
            (searchedElectronics.length === 0 && searchQuery) ? 
                React.createElement('div', { className: 'no-results' },
                    React.createElement('p', null, `No electronics found for "${searchQuery}"`),
                    React.createElement('button', { 
                        className: 'btn btn-primary',
                        onClick: () => setFilter('all')
                    }, 'Show All Electronics')
                ) : null,
            
            React.createElement('div', { className: 'products-grid' },
                searchedElectronics.map(product => 
                    React.createElement(ProductCard, { 
                        key: product.id, 
                        product: product, 
                        addToCart: addToCart,
                        showNotification: showNotification,
                        viewDetails: viewDetails
                    })
                )
            )
        )
    );
};

// Vehicles Page Component
const Vehicles = ({ addToCart, showNotification, viewDetails, searchQuery }) => {
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
            image: "https://tse1.mm.bing.net/th/id/OIP.4MWLR0Z_PRCa10XbAmDRfgHaHH?w=960&h=922&rs=1&pid=ImgDetMain&o=7&rm=3",
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

    // Search functionality
    const searchedVehicles = searchQuery 
        ? filteredVehicles.filter(vehicle => 
            vehicle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (Array.isArray(vehicle.specs) && vehicle.specs.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())))
          )
        : filteredVehicles;

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
            
            (searchedVehicles.length === 0 && searchQuery) ? 
                React.createElement('div', { className: 'no-results' },
                    React.createElement('p', null, `No vehicles found for "${searchQuery}"`),
                    React.createElement('button', { 
                        className: 'btn btn-primary',
                        onClick: () => setFilter('all')
                    }, 'Show All Vehicles')
                ) : null,
            
            React.createElement('div', { className: 'products-grid' },
                searchedVehicles.map(vehicle => 
                    React.createElement(ProductCard, { 
                        key: vehicle.id, 
                        product: vehicle, 
                        addToCart: addToCart,
                        showNotification: showNotification,
                        viewDetails: viewDetails
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
                        "Rentify was founded with a simple mission: to make renting easy, accessible, and trustworthy " +
                        "for everyone in India. We understand the challenges people face when looking for rental options - " +
                        "from properties to vehicles and electronics. Our platform brings verified listings, transparent " +
                        "pricing, and a seamless rental experience to your fingertips."
                    ),
                    
                    React.createElement('h3', null, 'Why Choose Rentify?'),
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
                        "Started in 2020, Rentify has grown to become one of India's leading rental platforms. " +
                        "We've helped thousands of customers find their perfect rental options across categories. " +
                        "Whether you're a student looking for a laptop, a professional seeking accommodation, " +
                        "or a family needing a car for vacation, Rentify is your one-stop solution."
                    )
                ),
                
                React.createElement('div', { className: 'stats-section' },
                    React.createElement('h3', null, 'Rentify in Numbers'),
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
    const [showLogin, setShowLogin] = React.useState(false);
    const [isLoginMode, setIsLoginMode] = React.useState(true);
    const [notification, setNotification] = React.useState({ message: '', show: false });
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [showProductDetails, setShowProductDetails] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [user, setUser] = React.useState(null);
    const [orders, setOrders] = React.useState([]);
    const [showCheckout, setShowCheckout] = React.useState(false);
    const [orderSuccess, setOrderSuccess] = React.useState(null);

    // Sample orders data
    React.useEffect(() => {
        if (user) {
            setOrders([
                {
                    id: 'ORD001',
                    itemTitle: 'MacBook Pro 16-inch',
                    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    category: 'Laptop',
                    duration: 3,
                    startDate: '2024-01-15',
                    endDate: '2024-04-15',
                    totalAmount: 36000,
                    status: 'active',
                    date: 'Jan 15, 2024'
                },
                {
                    id: 'ORD002',
                    itemTitle: 'Yamaha MT-15',
                    image: 'https://tse4.mm.bing.net/th/id/OIP.9qPpGYmIvl6fV3CL5HsKQgHaE6?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
                    category: 'Bike',
                    duration: 2,
                    startDate: '2024-02-01',
                    endDate: '2024-04-01',
                    totalAmount: 6000,
                    status: 'completed',
                    date: 'Feb 1, 2024'
                },
                {
                    id: 'ORD003',
                    itemTitle: 'Luxury Apartment in Bandra',
                    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    category: 'Apartment',
                    duration: 6,
                    startDate: '2024-03-01',
                    endDate: '2024-09-01',
                    totalAmount: 270000,
                    status: 'active',
                    date: 'Mar 1, 2024'
                }
            ]);
        }
    }, [user]);

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
        setShowCart(false);
        setShowCheckout(true);
    };

    const handleOrderSuccess = (order) => {
        setOrders(prev => [order, ...prev]);
        setCartItems([]);
        setShowCheckout(false);
        setOrderSuccess(order);
    };

    const handleContinueShopping = () => {
        setOrderSuccess(null);
        setCurrentPage('home');
    };

    const handleViewOrders = () => {
        setOrderSuccess(null);
        setCurrentPage('orders');
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
        setSearchQuery(''); // Clear search when navigating
        setShowCheckout(false);
        setOrderSuccess(null);
        window.scrollTo(0, 0);
    };

    const openLogin = (isLogin) => {
        setIsLoginMode(isLogin);
        setShowLogin(true);
    };

    const closeLogin = () => {
        setShowLogin(false);
    };

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setShowLogin(false);
        showNotification(`Welcome ${userData.name ? 'back, ' + userData.name + '!' : 'to Rentify!'}`);
    };

    const updateUser = (userData) => {
        setUser(prev => ({ ...prev, ...userData }));
    };

    const logout = () => {
        setUser(null);
        setOrders([]);
        setCartItems([]);
        showNotification('Logged out successfully');
        if (['profile', 'orders'].includes(currentPage)) {
            navigateTo('home');
        }
    };

    const viewDetails = (product) => {
        setSelectedProduct(product);
        setShowProductDetails(true);
    };

    const closeProductDetails = () => {
        setShowProductDetails(false);
        setSelectedProduct(null);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        // The actual navigation is handled in the SearchComponent
    };

    const renderPage = () => {
        if (orderSuccess) {
            return React.createElement(OrderSuccess, {
                order: orderSuccess,
                onContinueShopping: handleContinueShopping,
                onViewOrders: handleViewOrders
            });
        }

        if (showCheckout) {
            return React.createElement(Checkout, {
                cartItems: cartItems,
                user: user,
                onOrderSuccess: handleOrderSuccess,
                onBack: () => setShowCheckout(false),
                showNotification: showNotification
            });
        }

        const commonProps = {
            addToCart, 
            showNotification,
            viewDetails,
            searchQuery
        };

        switch(currentPage) {
            case 'profile':
                return user ? React.createElement(UserProfile, {
                    user: user,
                    updateUser: updateUser,
                    showNotification: showNotification
                }) : React.createElement('div', { className: 'section' },
                    React.createElement('div', { className: 'container' },
                        React.createElement('div', { className: 'auth-required' },
                            React.createElement('i', { className: 'fas fa-user-lock' }),
                            React.createElement('h2', null, 'Authentication Required'),
                            React.createElement('p', null, 'Please login to view your profile'),
                            React.createElement('button', {
                                className: 'btn btn-primary',
                                onClick: () => openLogin(true)
                            }, 'Login Now')
                        )
                    )
                );
            case 'orders':
                return user ? React.createElement(OrderHistory, {
                    orders: orders,
                    showNotification: showNotification
                }) : React.createElement('div', { className: 'section' },
                    React.createElement('div', { className: 'container' },
                        React.createElement('div', { className: 'auth-required' },
                            React.createElement('i', { className: 'fas fa-user-lock' }),
                            React.createElement('h2', null, 'Authentication Required'),
                            React.createElement('p', null, 'Please login to view your orders'),
                            React.createElement('button', {
                                className: 'btn btn-primary',
                                onClick: () => openLogin(true)
                            }, 'Login Now')
                        )
                    )
                );
            case 'properties':
                return React.createElement(Properties, commonProps);
            case 'electronics':
                return React.createElement(Electronics, commonProps);
            case 'vehicles':
                return React.createElement(Vehicles, commonProps);
            case 'about':
                return React.createElement(About);
            case 'home':
            default:
                return React.createElement(Home, { 
                    ...commonProps,
                    navigateTo,
                    setSearchQuery,
                    onSearch: handleSearch
                });
        }
    };

    return React.createElement('div', { className: 'App' },
        !showCheckout && !orderSuccess && React.createElement(Header, { 
            cartItemsCount: getCartItemsCount(), 
            openCart: openCart,
            currentPage: currentPage,
            navigateTo: navigateTo,
            openLogin: openLogin,
            user: user,
            logout: logout,
            onSearch: handleSearch,
            searchQuery: searchQuery,
            setSearchQuery: setSearchQuery
        }),
        React.createElement('main', null, renderPage()),
        !showCheckout && !orderSuccess && React.createElement(Footer),
        showCart && React.createElement(CartModal, {
            cartItems: cartItems,
            removeFromCart: removeFromCart,
            updateQuantity: updateQuantity,
            closeCart: closeCart,
            checkout: checkout,
            user: user,
            openLogin: openLogin
        }),
        React.createElement(LoginModal, {
            show: showLogin,
            onClose: closeLogin,
            onSwitchToSignup: () => setIsLoginMode(false),
            onLoginSuccess: handleLoginSuccess
        }),
        React.createElement(ProductDetailsModal, {
            product: selectedProduct,
            show: showProductDetails,
            onClose: closeProductDetails,
            addToCart: addToCart,
            showNotification: showNotification
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
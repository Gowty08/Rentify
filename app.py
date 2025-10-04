from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import json
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'retify_secret_key_2023'

# Sample data (in a real app, this would be in a database)
properties_data = [
    {
        "id": 1,
        "title": "Luxury Apartment in Bandra",
        "location": "Bandra West, Mumbai",
        "price": 45000,
        "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "type": "Apartment",
        "bedrooms": 3,
        "bathrooms": 2,
        "area": 1200,
        "isFeatured": True,
        "description": "A luxurious 3BHK apartment in the heart of Bandra with modern amenities and great connectivity."
    },
    {
        "id": 2,
        "title": "Modern Villa in Whitefield",
        "location": "Whitefield, Bangalore",
        "price": 75000,
        "image": "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "type": "Villa",
        "bedrooms": 4,
        "bathrooms": 3,
        "area": 2200,
        "isFeatured": True,
        "description": "Spacious villa with garden and modern amenities in Whitefield."
    }
]

electronics_data = [
    {
        "id": 1,
        "title": "MacBook Pro 16-inch",
        "brand": "Apple",
        "price": 12000,
        "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "category": "Laptop",
        "specs": ["16GB RAM", "1TB SSD", "M1 Chip"],
        "rating": 4.8,
        "isFeatured": True,
        "description": "Powerful MacBook Pro for professional work and creative tasks."
    },
    {
        "id": 2,
        "title": "Sony A7III Camera",
        "brand": "Sony",
        "price": 8000,
        "image": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "category": "Camera",
        "specs": ["24.2MP", "4K Video", "Full Frame"],
        "rating": 4.6,
        "isFeatured": True,
        "description": "Professional full-frame mirrorless camera for photography enthusiasts."
    }
]

vehicles_data = [
    {
        "id": 1,
        "title": "Yamaha MT-15",
        "brand": "Yamaha",
        "price": 3000,
        "image": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
        "category": "Bike",
        "specs": ["155cc", "40kmpl", "Sports"],
        "rating": 4.7,
        "isFeatured": True,
        "description": "Sporty bike with great performance and mileage."
    },
    {
        "id": 2,
        "title": "Hyundai Creta",
        "brand": "Hyundai",
        "price": 15000,
        "image": "https://images.unsplash.com/photo-1621330396140-8dff8d8c0415?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
        "category": "Car",
        "specs": ["Petrol", "5 Seater", "SUV"],
        "rating": 4.4,
        "description": "Comfortable SUV for family trips and daily commute."
    }
]

users_data = {
    "admin@retify.com": {
        "password": "admin123",
        "name": "Admin User",
        "phone": "+91 9876543210"
    }
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/properties')
def get_properties():
    category = request.args.get('category', 'all')
    
    if category == 'all':
        return jsonify(properties_data)
    else:
        filtered_properties = [p for p in properties_data if p['type'].lower() == category.lower()]
        return jsonify(filtered_properties)

@app.route('/api/electronics')
def get_electronics():
    category = request.args.get('category', 'all')
    
    if category == 'all':
        return jsonify(electronics_data)
    else:
        filtered_electronics = [e for e in electronics_data if e['category'].lower() == category.lower()]
        return jsonify(filtered_electronics)

@app.route('/api/vehicles')
def get_vehicles():
    category = request.args.get('category', 'all')
    
    if category == 'all':
        return jsonify(vehicles_data)
    else:
        filtered_vehicles = [v for v in vehicles_data if v['category'].lower() == category.lower()]
        return jsonify(filtered_vehicles)

@app.route('/api/item/<item_type>/<int:item_id>')
def get_item(item_type, item_id):
    if item_type == 'property':
        item = next((p for p in properties_data if p['id'] == item_id), None)
    elif item_type == 'electronic':
        item = next((e for e in electronics_data if e['id'] == item_id), None)
    elif item_type == 'vehicle':
        item = next((v for v in vehicles_data if v['id'] == item_id), None)
    else:
        return jsonify({"error": "Invalid item type"}), 400
    
    if item:
        return jsonify(item)
    else:
        return jsonify({"error": "Item not found"}), 404

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = users_data.get(email)
    if user and user['password'] == password:
        session['user'] = {
            'email': email,
            'name': user['name'],
            'phone': user['phone']
        }
        return jsonify({"success": True, "user": session['user']})
    else:
        return jsonify({"success": False, "error": "Invalid credentials"}), 401

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    phone = data.get('phone')
    
    if email in users_data:
        return jsonify({"success": False, "error": "User already exists"}), 400
    
    users_data[email] = {
        "password": password,
        "name": name,
        "phone": phone
    }
    
    session['user'] = {
        'email': email,
        'name': name,
        'phone': phone
    }
    
    return jsonify({"success": True, "user": session['user']})

@app.route('/api/logout')
def logout():
    session.pop('user', None)
    return jsonify({"success": True})

@app.route('/api/user')
def get_user():
    user = session.get('user')
    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "Not logged in"}), 401

@app.route('/api/cart', methods=['GET', 'POST', 'DELETE'])
def cart():
    if 'cart' not in session:
        session['cart'] = []
    
    if request.method == 'GET':
        return jsonify(session['cart'])
    
    elif request.method == 'POST':
        data = request.get_json()
        item = data.get('item')
        
        # Check if item already in cart
        for cart_item in session['cart']:
            if cart_item['id'] == item['id'] and cart_item['type'] == item['type']:
                cart_item['quantity'] += 1
                session.modified = True
                return jsonify({"success": True, "cart": session['cart']})
        
        # Add new item to cart
        session['cart'].append({
            'id': item['id'],
            'title': item['title'],
            'price': item['price'],
            'image': item['image'],
            'type': item['type'],
            'quantity': 1
        })
        session.modified = True
        return jsonify({"success": True, "cart": session['cart']})
    
    elif request.method == 'DELETE':
        data = request.get_json()
        item_id = data.get('item_id')
        item_type = data.get('item_type')
        
        session['cart'] = [item for item in session['cart'] if not (item['id'] == item_id and item['type'] == item_type)]
        session.modified = True
        return jsonify({"success": True, "cart": session['cart']})

@app.route('/api/cart/update', methods=['POST'])
def update_cart():
    data = request.get_json()
    item_id = data.get('item_id')
    item_type = data.get('item_type')
    quantity = data.get('quantity')
    
    for item in session['cart']:
        if item['id'] == item_id and item['type'] == item_type:
            if quantity <= 0:
                session['cart'].remove(item)
            else:
                item['quantity'] = quantity
            session.modified = True
            break
    
    return jsonify({"success": True, "cart": session['cart']})

@app.route('/api/checkout', methods=['POST'])
def checkout():
    if 'user' not in session:
        return jsonify({"success": False, "error": "Please login to checkout"}), 401
    
    if 'cart' not in session or len(session['cart']) == 0:
        return jsonify({"success": False, "error": "Cart is empty"}), 400
    
    data = request.get_json()
    rental_period = data.get('rental_period', 1)  # in months
    address = data.get('address', {})
    
    # Calculate total
    total = sum(item['price'] * item['quantity'] * rental_period for item in session['cart'])
    
    # Create order (in real app, save to database)
    order = {
        'order_id': f"RET{datetime.now().strftime('%Y%m%d%H%M%S')}",
        'user': session['user'],
        'items': session['cart'].copy(),
        'rental_period': rental_period,
        'total': total,
        'address': address,
        'order_date': datetime.now().isoformat(),
        'status': 'confirmed'
    }
    
    # Clear cart after successful checkout
    session['cart'] = []
    session.modified = True
    
    return jsonify({
        "success": True,
        "order": order,
        "message": f"Order placed successfully! Total: ₹{total}"
    })

@app.route('/api/search')
def search():
    query = request.args.get('q', '').lower()
    category = request.args.get('category', 'all')
    
    results = {
        'properties': [],
        'electronics': [],
        'vehicles': []
    }
    
    if category in ['all', 'properties']:
        results['properties'] = [p for p in properties_data if query in p['title'].lower() or query in p['location'].lower()]
    
    if category in ['all', 'electronics']:
        results['electronics'] = [e for e in electronics_data if query in e['title'].lower() or query in e['brand'].lower()]
    
    if category in ['all', 'vehicles']:
        results['vehicles'] = [v for v in vehicles_data if query in v['title'].lower() or query in v['brand'].lower()]
    
    return jsonify(results)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    
    # In a real application, you would save this to a database or send an email
    print(f"Contact form submission: {name} ({email}) - {message}")
    
    return jsonify({
        "success": True,
        "message": "Thank you for your message! We'll get back to you soon."
    })

@app.route('/api/reviews')
def get_reviews():
    reviews = [
        {
            "id": 1,
            "name": "Rahul Sharma",
            "avatar": "https://randomuser.me/api/portraits/men/32.jpg",
            "rating": 5,
            "text": "Excellent service! Rented a bike for a month and the process was seamless. The bike was in perfect condition.",
            "date": "2 weeks ago",
            "item": "Yamaha MT-15"
        },
        {
            "id": 2,
            "name": "Priya Patel",
            "avatar": "https://randomuser.me/api/portraits/women/44.jpg",
            "rating": 4,
            "text": "Found my dream apartment through Retify. The verification process gave me confidence in the listing.",
            "date": "1 month ago",
            "item": "2BHK in HSR Layout"
        },
        {
            "id": 3,
            "name": "Amit Kumar",
            "avatar": "https://randomuser.me/api/portraits/men/67.jpg",
            "rating": 5,
            "text": "Rented a MacBook for my freelance work. Saved me from a huge upfront investment. Highly recommended!",
            "date": "3 weeks ago",
            "item": "MacBook Pro"
        }
    ]
    
    return jsonify(reviews)

@app.route('/api/stats')
def get_stats():
    stats = {
        "total_customers": 50000,
        "verified_listings": 15000,
        "cities": 25,
        "rating": 4.8
    }
    
    return jsonify(stats)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
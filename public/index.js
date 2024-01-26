// public/scripts/main.js
require('dotenv').config();
function userLogin() {
    const username = document.getElementById('userUsername').value;
    const password = document.getElementById('userPassword').value;

    // Create an object with the user credentials
    const credentials = {
        username: username,
        password: password
    };

    // Make a POST request to the server's authentication endpoint
    fetch('http://localhost:3000/auth/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Store the user token in localStorage
        localStorage.setItem('userToken', data.token);
        // Redirect or perform other actions after successful login
        console.log('User login successful!');
    })
    .catch(error => {
        console.error('Error during user login:', error);
        // Handle error, display error message, etc.
    });
}

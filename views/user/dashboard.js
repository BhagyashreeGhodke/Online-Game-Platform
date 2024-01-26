// public/scripts/dashboard.js

// Example: Fetch user data from the server and update the dashboard dynamically
async function fetchUserData() {
    try {
        const response = await fetch('http://localhost:3000/user/data', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();

        // Update user information on the dashboard
        document.getElementById('username').innerText = userData.username;
        document.getElementById('email').innerText = userData.email;

        // Update statistics on the dashboard
        document.getElementById('totalGames').innerText = userData.totalGames;
        document.getElementById('highScore').innerText = userData.highScore;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Call the fetchUserData function when the dashboard is loaded
window.onload = function () {
    fetchUserData();
};

// public/scripts/admin/dashboard.js

// Example: Fetch admin data from the server and update the dashboard dynamically
async function fetchAdminData() {
    try {
        const response = await fetch('http://localhost:3000/admin/data', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('adminToken'),
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const adminData = await response.json();

        // Update admin information on the dashboard
        document.getElementById('adminUsername').innerText = adminData.username;
        document.getElementById('adminEmail').innerText = adminData.email;

        // Update statistics on the dashboard
        document.getElementById('totalUsers').innerText = adminData.totalUsers;
        document.getElementById('totalGames').innerText = adminData.totalGames;
    } catch (error) {
        console.error('Error fetching admin data:', error);
    }
}

// Call the fetchAdminData function when the dashboard is loaded
window.onload = function () {
    fetchAdminData();
};

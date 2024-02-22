import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState(null); // Assuming avatar is a file

  const handleRegister = async () => {
    try {
      // Create FormData object to send files
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('fullName', fullName);
      formData.append('avatar', avatar); // Append file

      // Make POST request to backend
      const response = await axios.post('http://localhost:8000/api/v1/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Registration successful:', response.data);
      // Handle successful registration (e.g., redirect to login page)
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <input
        className="block w-full py-2 px-3 mb-3 border rounded-lg"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="block w-full py-2 px-3 mb-3 border rounded-lg"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="block w-full py-2 px-3 mb-3 border rounded-lg"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="block w-full py-2 px-3 mb-3 border rounded-lg"
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        className="block w-full py-2 px-3 mb-3 border rounded-lg"
        type="file"
        onChange={(e) => setAvatar(e.target.files[0])} // Handle file input change
      />
      <button
        className="block w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
}

export default Register;

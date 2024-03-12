import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button } from '../index';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const ForgotPassword = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/v1/users/forgot-password', {
        email,
      });
      console.log("response in forgotPassword: ", response);
      if (response.status === 200) {
        setSuccessMessage('OTP sent successfully. Check your email.');
        // Redirect to password reset component
        navigate('/reset-password');
      }
    } catch (error) {
      console.error('An error occurred while initiating password reset:', error);
      setErrorMessage('Failed to initiate password reset. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <p className="text-sm text-gray-400 mb-4">Enter your email address below to receive an OTP to reset your password.</p>

      <form onSubmit={handleResetPassword}>
        <Input
          label="Email: "
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="submit" className="w-full mt-4">
          Send OTP
        </Button>

        {successMessage && (
          <p className="text-green-600 mt-4">{successMessage}</p>
        )}

        {errorMessage && (
          <p className="text-red-600 mt-4">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../index';

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Password validations
      if (newPassword !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
      if (newPassword.length < 8) {
        setErrorMessage('Password should be at least 8 characters long.');
        return;
      }
      // Add more password strength validations if needed

      // Send reset password request
      const response = await axios.post('/api/v1/users/reset-password', {
        email,
        otp,
        newPassword,
        confirmPassword,
      });
      
      if (response.status === 200) {
        setSuccessMessage('Password reset successfully.');
        navigate('/login');
      }
    } catch (error) {
      console.error('An error occurred while resetting password:', error);
      setErrorMessage('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <p className="text-sm text-gray-400 mb-4">
        Enter your email, OTP, new password, and confirm password to reset your password.
      </p>

      <form onSubmit={handleResetPassword}>
        <Input
          label="Email: "
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="OTP: "
          name="otp"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />

        <Input
          label="New Password: "
          name="newPassword"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Input
          label="Confirm Password: "
          name="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button type="submit" className="w-full mt-4">
          Reset Password
        </Button>

        {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}

        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;

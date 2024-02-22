import React, { useState } from 'react';
import axios from 'axios';


function Login() {
  const [username, setUsername] = useState(''); // Username or Email
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPasswordRequested, setIsForgotPasswordRequested] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState(false);
  

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', {
        username,
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Redirect user to dashboard or any other page
      history.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (e.g., display error message)
    }
  };

  const handleForgotPassword = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/users/forgotpassword', {
        email,
      });
      setIsForgotPasswordRequested(true);
      setErrorMessage('');
    } catch (error) {
      console.error('Forgot password request failed:', error);
      setErrorMessage('Failed to request password reset. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/users/verifyotp', {
        email,
        otp,
      });
      setErrorMessage('');
    } catch (error) {
      console.error('OTP verification failed:', error);
      setErrorMessage('Failed to verify OTP. Please try again.');
    }
  };

  const handleResetPasswordWithOtp = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/users/resetpassword', {
        email,
        newPassword,
        otp,
      });
      setErrorMessage('');
      setIsPasswordResetSuccess(true); // Set password reset success flag to true
    } catch (error) {
      console.error('Password reset with OTP failed:', error);
      setErrorMessage('Failed to reset password with OTP. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <input
        className="block w-full py-2 px-3 mb-3 border rounded-lg"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="block w-full py-2 px-3 mb-3 border rounded-lg"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="block w-full py-2 px-3 mb-3 border rounded-lg"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="block w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700"
        onClick={handleLogin}
      >
        Login
      </button>
      <button
        className="block w-full py-2 mt-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400"
        onClick={handleForgotPassword}
      >
        Forgot Password?
      </button>
      {isPasswordResetSuccess && (
        <p className="text-green-500">Password reset successfully. You can now log in with your new password.</p>
      )}
      {isForgotPasswordRequested && (
        <div>
          <h2>Enter OTP</h2>
          <input
            className="block w-full py-2 px-3 mb-3 border rounded-lg"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="block w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700"
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </button>
          <input
            className="block w-full py-2 px-3 mb-3 border rounded-lg"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            className="block w-full py-2 px-3 mb-3 border rounded-lg"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="block w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700"
            onClick={handleResetPasswordWithOtp}
          >
            Reset Password
          </button>
        </div>
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default Login;

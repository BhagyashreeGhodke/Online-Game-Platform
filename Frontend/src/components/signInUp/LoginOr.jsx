import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Logo } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../../store/authSlice';
import { isAdmin } from '../../store/adminSlice';
import { useSelector } from 'react-redux';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Import icons

const Login = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const adminStatus = useSelector((state) => state.admin.status);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/v1/users/login', {
        email,
        password,
      });
      if (response) {
        const session = await axios.get('/api/v1/users/current-user');
        const userData = session.data;
       
        if (userData) {
          dispatch(authLogin(userData));
          if (userData.data.adminStatus) {
            dispatch(isAdmin());
          }
        }
      }

      if (response.status === 200) {
        setEmail('');
        setPassword('');
        
        
          navigate('/')
        
        console.log('User logged in successfully!');
      } else {
        console.error('Failed to log in:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {!authStatus &&(
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100px" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">Log in to your account</h2>
          <p className="mt-2 text-center text-base text-black/60">
            Don't have an account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className='space-y-5'>
              <Input
                label="Email: "
                name="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password: "
                name="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <Button type="submit" className="w-full">
                Log In
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;

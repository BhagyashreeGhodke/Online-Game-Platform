import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Logo } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login as authLogin} from '../../store/authSlice';
import { isAdmin } from '../../store/adminSlice';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 

const SignupForm = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  const [passwordError, setPasswordError] = useState("");

  const [isAdminKeyEnabled, setIsAdminKeyEnabled] = useState(false);
  const [adminKey, setAdminKey] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('avatar', avatar);
    if (isAdminKeyEnabled && adminKey === "ogp") {
      formData.append('adminStatus', true);
    } else {
      formData.append('adminStatus', false)
    }
    
    try {
      const response = await axios.post('/api/v1/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if(response){
        const session = await axios.post('/api/v1/users/login', {
          email,
          password,
        })
        if (session) {
          const data = await axios.get('/api/v1/users/current-user');
          const userData = data.data;
          if (userData) {
            dispatch(authLogin(userData));
            if (userData.data.adminStatus) {
              dispatch(isAdmin());
            }
          }
        }
      }

      if (response.status === 201) {
        setFullName('');
        setEmail('');
        setUsername('');
        setPassword('');
        setAvatar(null);
        navigate('/')
        console.log('User signed up successfully!');
      } else {
        console.error('Failed to sign up:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while signing up:', error);
      setError(error.message);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="flex items-center justify-center">
      {!authStatus && (
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100px" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className='space-y-5'>
              <Input
                label="Username: "
                name="username"
                placeholder="Enter your Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                label="Email: "
                name="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${
                  !email || !validateEmail(email) ? 'border-red-500' : ''
                }`}
              />
              <Input
                label="Fullname: "
                name="fullName"
                placeholder="Enter your Full name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <Input
                label="Password: "
                name="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${passwordError ? 'border-red-500' : ''}`}
              />
              {passwordError && <p className="text-red-600 mt-1">{passwordError}</p>}
      
              <Input
                label="Avatar: "
                name="avatar"
                type="file"
                placeholder="Select your avatar"
                required
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  <input
                    type="checkbox"
                    id="adminKeyToggle"
                    checked={isAdminKeyEnabled}
                    onChange={() => setIsAdminKeyEnabled(!isAdminKeyEnabled)}
                    className="mr-2 hidden"
                  />
                  <label htmlFor="adminKeyToggle" className="cursor-pointer">
                    {isAdminKeyEnabled ? (
                      <FaCheckCircle className="text-green-500 text-lg" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-lg" />
                    )}
                  </label>
                </div>
                <label htmlFor="adminKeyToggle" className="cursor-pointer">Sign up as an Admin</label>
              </div>
              {isAdminKeyEnabled && (
                <Input
                  label="Admin Key: "
                  name="adminKey"
                  type="text"
                  placeholder="Enter Admin key"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                />
              )}
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignupForm;

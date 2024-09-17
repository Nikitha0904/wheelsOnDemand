'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';  
import { UserContext } from '../contexts/userContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter(); 
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    if (email.trim() === '' ) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      const data = await res.json();
      setErrorMessage('');

      console.log('Login successful', data);

      // Extract user details
      const { username, id,  role } = data.user;

      // Set user details in context and localStorage
      setUser({
        username,
        userId: id,
        role,
      });

      // Redirect based on role_id
      if (role === "Admin") {
        router.push(`/facultydashboard`);
      } else if (role === "AdminOffice") {
        router.push(`/officeDashboard`);
      } else if (role == "GuestAdmin") {
        router.push(`/adminDashboard`);
      } else {
        setErrorMessage('Unknown role.');
      }

    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || 'An error occurred while logging in.');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
      <div className='w-full max-w-sm p-8 bg-white rounded-lg shadow-md'>
        <h2 className='text-2xl font-semibold text-center mb-4'>Login</h2>
        {errorMessage && <p className='text-red-500 mb-4 text-center'>{errorMessage}</p>}
        <label htmlFor='email' className='block mb-2 font-semibold'>Email</label>
        <input
          type='email'
          id='email'
          placeholder='Enter email'
          className='w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <button
          className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors'
          onClick={handleLogin}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

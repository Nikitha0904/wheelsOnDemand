import Requests from '@/app/components/Requests'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';

function page() {
  const { user } = useContext(UserContext);

  return (
    <div >
      {user ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <p>Please log in.</p>
      )}
      <h1 className='mb-20'>Home</h1>
      <Button>New Guest Request</Button>
      <Requests/>
    </div>
  )
}

export default page

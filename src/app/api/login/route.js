// app/api/login/route.js
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db'; // Import your database connection

export async function POST(request) {
  try {
    // Parse the incoming request data (email and password)
    const { email } = await request.json();

    // Validate if email and password are provided
    if (!email ) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Connect to the database
    const connection = await connectToDatabase();

    // Query the database for a user with the provided email
    const [rows] = await connection.execute('SELECT * FROM guest_users WHERE email = ?', [email]);

    // If no user is found, return a 404 response
    if (rows.length === 0) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Extract the user from the database result
    const user = rows[0];

    // Compare the provided password with the hashed password stored in the database
    // const match = await bcrypt.compare(password, user.password);

    // If the password doesn't match, return a 401 response
    // if (!match) {
    //   return NextResponse.json(
    //     { message: 'Invalid password' },
    //     { status: 401 }
    //   );
    // }

    // Remove sensitive data before returning the user object
    const { password: _, ...safeUserData } = user;

    // Return success response with the user data (without the password)
    return NextResponse.json({
      message: 'Login successful',
      user: safeUserData // Return only safe user data
    });

  } catch (error) {
    console.error('An error occurred during login:', error);
    return NextResponse.json(
      { message: 'Error logging in' },
      { status: 500 }
    );
  }
}

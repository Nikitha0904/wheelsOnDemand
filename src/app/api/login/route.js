import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request) {
  try {
    // Parse the incoming request data (email and password)
    const { email, password } = await request.json();

    // Validate if email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Query the database for a user with the provided email using Prisma
    const user = await prisma.guest_users.findUnique({
      where: { email },
    });

    // If no user is found, return a 404 response
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    console.log('Stored hash:', user.password);  // Log the stored password hash
const match = await bcrypt.compare(password, user.password);
console.log('Password match:', match);  // Log the result of comparison


    // If the password doesn't match, return a 401 response
    if (!match) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 }
      );
    }

    // Remove sensitive data before returning the user object
    const { password: _, ...safeUserData } = user;

    return NextResponse.json({
      message: 'Login successful',
      user: safeUserData,
    });

  } catch (error) {
    console.error('An error occurred during login:', error);
    return NextResponse.json(
      { message: 'Error logging in' },
      { status: 500 }
    );
  }
}

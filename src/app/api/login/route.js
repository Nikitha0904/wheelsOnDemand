import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
  }

  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const user = rows[0];

    // Compare the provided password with the hashed password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    return NextResponse.json({
      message: 'Login successful',
      user: {
        name: user.name,
        userId: user.id,
        college_id: user.college_id,
        role_id: user.role_id,
      },
    });

  } catch (error) {
    console.error('An error occurred while logging in:', error);
    return NextResponse.json({ message: 'Error logging in' }, { status: 500 });
  }
}

import bcrypt from 'bcrypt';
import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';  // Import NextResponse

// Named export for PUT method
export async function PUT(req) {
  try {
    // Parse the request body if necessary
    // const data = await req.json(); // If needed

    // Fetch all users (without any filtering condition on the password)
    const users = await prisma.guest_users.findMany({
      select: {
        id: true,
        username: true,
        password: true,
      },
    });

    // If no users found, return a message
    if (users.length === 0) {
      return NextResponse.json({ message: 'No users found.' }, { status: 200 });
    }

    // Hash passwords for all users
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Update each user with the hashed password
      await prisma.guest_users.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });
    }

    return NextResponse.json({ message: 'Passwords hashed and updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error hashing passwords:', error);
    return NextResponse.json({ message: 'Error hashing passwords' }, { status: 500 });
  }
}

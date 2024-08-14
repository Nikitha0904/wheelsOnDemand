// pages/api/requests.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export async function POST(req) {
  try {
    const { userId, role_id, status, college_id } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const connection = await connectToDatabase();
    let query = "";
    let params = [];

    if (role_id == 3) {
      query = `
        SELECT * FROM requests
        ${status ? 'WHERE status = ?' : ''}
      `;
      params = status ? [status] : [];
    } else if(role_id == 2){
      query = `
        SELECT * FROM requests
        WHERE college_id = ?${status ? ' AND status = ?' : ''}
      `;
      params = status ? [college_id, status] : [college_id];
    } else {
      query = `
        SELECT * FROM requests
        WHERE id = ?${status ? ' AND status = ?' : ''}
      `;
      params = status ? [userId, status] : [userId];
    }
    

    // Execute the query
    const [rows] = await connection.execute(query, params);

    if (rows.length > 0) {
      return NextResponse.json(rows);
    } else {
      return NextResponse.json({ message: 'No requests found' }, { status: 404 });
    }
  } catch (err) {
    console.error('Database query failed:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

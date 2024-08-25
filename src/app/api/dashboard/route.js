import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export async function POST(req) {
  try {
    console.log('API dashboard');
    
    const { userId, role_id, college_id } = await req.json();
    console.log('Received:', { userId, role_id , college_id});
    
    if (!userId || !role_id) {
      return NextResponse.json({ error: 'User ID and Role ID are required' }, { status: 400 });
    }
    
    const connection = await connectToDatabase();

    let query = '';
    let params = [];

    if (role_id == 3) {
      query = `
        SELECT 
          COUNT(*) AS totalRequests,
          SUM(status = 'Approved') AS approvedRequests,
          SUM(status = 'Rejected') AS rejectedRequests,
          SUM(status = 'Pending' OR status = 'approved by office') AS pendingRequests
        FROM requests
      `;
    } else if(role_id == 2){
      query = `
        SELECT 
          COUNT(*) AS totalRequests,
          SUM(status = 'Approved' ) AS approvedRequests,
          SUM(status = 'Rejected') AS rejectedRequests,
          SUM(status = 'Pending' OR status = 'approved by office') AS pendingRequests
        FROM requests
        WHERE college_id = ?
      `;
      params = [college_id];
    }
    else{
      query = `
        SELECT 
          COUNT(*) AS totalRequests,
          SUM(status = 'Approved') AS approvedRequests,
          SUM(status = 'Rejected') AS rejectedRequests,
          SUM(status = 'Pending' OR status = 'approved by office') AS pendingRequests
        FROM requests
        WHERE id = ?
      `;
      params = [userId];
    }

    // Execute the query
    const [rows] = await connection.execute(query, params);

    // Log the retrieved data
    console.log('Database response:', rows);

    // Check if rows are returned and return appropriate response
    if (rows.length > 0) {
      return NextResponse.json(rows[0]);
    } else {
      return NextResponse.json({ error: 'No data found for this user' }, { status: 404 });
    }

  } catch (err) {
    console.error('Error processing request:', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}

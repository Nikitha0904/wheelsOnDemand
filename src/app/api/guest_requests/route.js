import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db'; // Import your database connection

export async function POST(request) {
  const connection = await connectToDatabase();

  try {
    // Parse the incoming request data
    const {
      guest_name,
      guest_email,
      guest_mobile_number,
      campusId,
      collegeId,
      request_status,
      vehicle_req,
      room_req,
      no_of_persons,
      purpose_of_visit,
      guest_pickup_place,
      guest_pickup_time,
      vehicle_start_time,
      vehicle_return_time,
      stay_start_date,
      stay_end_date,
      room_id,
      house_id,
    } = await request.json();

    // Validate if necessary fields are provided
    if (!guest_name || !guest_email || !guest_mobile_number || !campusId || !collegeId) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Start a transaction
    await connection.beginTransaction();

    // Insert into GuestRequests table
    const [guestRequestResult] = await connection.execute(
      `INSERT INTO GuestRequests (guest_name, guest_email, guest_mobile_number, campusId, collegeId, request_status, vehicle_req, room_req, no_of_persons, purpose_of_visit)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [guest_name, guest_email, guest_mobile_number, campusId, collegeId, request_status, vehicle_req, room_req, no_of_persons, purpose_of_visit]
    );

    const guestRequestId = guestRequestResult.insertId;

    // If vehicle is required, insert into VehicleAllocation table
    if (vehicle_req === 'yes') {
      await connection.execute(
        `INSERT INTO VehicleAllocation (gRequestId, guest_pickup_place, guest_pickup_time, vehicle_start_time, vehicle_return_time)
         VALUES (?, ?, ?, ?, ?)`,
        [guestRequestId, guest_pickup_place, guest_pickup_time, vehicle_start_time, vehicle_return_time]
      );
    }

    // If room is required, insert into RoomAllocation table
    if (room_req === 'yes') {
      await connection.execute(
        `INSERT INTO RoomAllocation (gRequestId, stay_start_date, stay_end_date, room_id, house_id)
         VALUES (?, ?, ?, ?, ?)`,
        [guestRequestId, stay_start_date, stay_end_date, room_id, house_id]
      );
    }

    // Commit the transaction
    await connection.commit();

    // Return success response
    return NextResponse.json({ message: 'Guest request created successfully' });

  } catch (error) {
    console.error('Error creating guest request:', error);

    // If there was an error, roll back the transaction
    await connection.rollback();

    return NextResponse.json({ message: 'Error creating guest request' }, { status: 500 });
  } finally {
    // Close the database connection
    connection.release();
  }
}

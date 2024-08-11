'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const Requests = () => {
  const { data: session } = useSession();
  const [requests, setRequests] = useState({ pending: 0, ongoing: 0, closed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(session.user.id);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!session) return;

      try {
        const res = await fetch('/api/requests');
        if (!res.ok) {
          throw new Error('Failed to fetch requests');
        }

        const data = await res.json();
        setRequests(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [session]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex justify-around p-6 gap-5">
      <div className="bg-white border border-gray-200 rounded-md p-4 w-1/3">
        <h2 className="text-lg font-semibold text-gray-800">Pending</h2>
        <h2>{requests.pending || 0}</h2>
      </div>
      <div className="bg-white border border-gray-200 rounded-md p-4 w-1/3">
        <h2 className="text-lg font-semibold text-gray-800">Ongoing</h2>
        <h2>{requests.ongoing || 0}</h2>
      </div>
      <div className="bg-white border border-gray-200 rounded-md p-4 w-1/3">
        <h2 className="text-lg font-semibold text-gray-800">Closed</h2>
        <h2>{requests.closed || 0}</h2>
      </div>
    </div>
  );
};

export default Requests;

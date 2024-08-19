"use client";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import RequestsTable from "../components/RequestsTable";
import RequestModal from "../components/RequestModal";
import GuestRequestForm from "../form/GuestRequestForm";
import DashboardBoxes from "../components/DashboardSidebar"; // Import the updated component

export default function AdminDashboard() {
  const { user } = useContext(UserContext);

  const userId = user?.userId;
  const role_id = user?.role_id;

  const [dashboardData, setDashboardData] = useState({ pendingRequests: 0, approvedRequests: 0, rejectedRequests: 0 });
  const [pendingRequests, setPendingRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    if (userId && role_id) {
      fetchDashboardData(userId, role_id);
      fetchPendingRequests();
      fetchAllRequests();
    }
  }, [userId, role_id]);

  const fetchDashboardData = async (userId, role_id) => {
    try {
      const res = await fetch('/api/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, role_id })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const res = await fetch(`/api/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, role_id, status: 'pending' })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setPendingRequests(data);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };

  const fetchAllRequests = async () => {
    try {
      const res = await fetch(`/api/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, role_id })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setAllRequests(data);
    } catch (error) {
      console.error('Error fetching all requests:', error);
    }
  };

  const handleViewRequestDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  return (
    <div style={{ paddingTop: "5rem", paddingLeft: "2rem", paddingRight: "2rem" }} className="h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-bold">Welcome {user?.name || 'Guest'}</h2>
          <GuestRequestForm />
        </div>
      </div>
      <DashboardBoxes dashboardData={dashboardData} />
      
      {/* Pending Requests Table */}
      <div className="mb-8">
        {/* <h3 className="text-2xl font-bold mb-4">Pending Requests</h3> */}
        <RequestsTable requests={pendingRequests} currentView="pending" onViewDetails={handleViewRequestDetails} />
      </div>

      {/* All Requests Table */}
      <div className="mb-8">
        {/* <h3 className="text-2xl font-bold mb-4">All Requests</h3> */}
        <RequestsTable requests={allRequests} currentView="all" onViewDetails={handleViewRequestDetails} />
      </div>

      <RequestModal isOpen={!!selectedRequest} onClose={handleCloseModal} request={selectedRequest} userName={user?.userName} />
    </div>
  );
}

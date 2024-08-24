"use client";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import RequestsTable from "../components/AdminRequests";
import RequestModal from "../components/RequestModal";
import GuestRequestForm from "../form/GuestRequestForm";
import DashboardBoxes from "../components/DashboardSidebar"; // Import the new component

export default function AdminDashboard() {
  const { user } = useContext(UserContext);

  const userId = user?.userId;
  const role_id = user?.role_id;

  const [dashboardData, setDashboardData] = useState({ pendingRequests: 0, approvedRequests: 0, rejectedRequests: 0 });
  const [requests, setRequests] = useState([]);
  const [currentView, setCurrentView] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    if (userId && role_id) {
      fetchDashboardData(userId, role_id);
    }
  }, [userId, role_id]);

  useEffect(() => {
    if (userId) {
      fetchRequests();
    }
  }, [userId, currentView]);

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

  const fetchRequests = async () => {
    try {
      const res = await fetch(`/api/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, role_id, status: currentView })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
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
      <DashboardBoxes dashboardData={dashboardData} onViewChange={setCurrentView} />
      <div className="flex flex-col w-full">
        <RequestsTable
          requests={requests}
          currentView={currentView}
          onViewDetails={handleViewRequestDetails}
          className="w-full"
        />
      </div>
      <RequestModal isOpen={!!selectedRequest} onClose={handleCloseModal} request={selectedRequest} userName={user?.userName} />
    </div>
  );
}

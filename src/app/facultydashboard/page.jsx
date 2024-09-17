"use client";
import { useState, useEffect, useContext } from "react";
import DashboardBoxes from '../components/DashboardSidebar'; // Updated import
import { UserContext } from "../contexts/userContext";
import RequestsTable from "../components/FacultyRequestsTable";
import RequestModal from "../components/RequestModal";
import GuestRequestForm from "../form/GuestRequestForm";

export default function FacultyDashboard() {
  const { user } = useContext(UserContext);
  console.log("User Context:", user);
  
  const userId = user?.userId;
  const role_id = user?.role_id;

  const [dashboardData, setDashboardData] = useState({ pendingRequests: 0, approvedRequests: 0, rejectedRequests: 0 });
  const [requests, setRequests] = useState([]);
  const [currentView, setCurrentView] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    if (userId && role_id) {
      fetchDashboardData({ userId, role_id });
      fetchRequests();
    }
  }, [userId, role_id, currentView]);

  const fetchDashboardData = async ({ userId, role_id }) => {
    try {
      console.log("User ID:", userId);
      console.log("Role ID:", role_id);

      const body = JSON.stringify({ userId, role_id });
      console.log("Request Body:", body);

      const res = await fetch('/api/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
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
        body: JSON.stringify({ userId, status: currentView })
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
          <h2 className="text-3xl font-bold">Welcome {user?.username || 'Guest'}</h2>
          <GuestRequestForm />
        </div>
      </div>
      <DashboardBoxes dashboardData={dashboardData} onViewChange={setCurrentView} />
      <div className="w-full mt-8">
        <RequestsTable requests={requests} currentView={currentView} onViewDetails={handleViewRequestDetails} />
      </div>
      <RequestModal isOpen={!!selectedRequest} onClose={handleCloseModal} request={selectedRequest} userName={user?.userName} />
    </div>
  );
}

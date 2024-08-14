"use client";
import { useState, useEffect, useContext } from "react";
import DashboardSidebar from '../components/DashboardSidebar';
import { UserContext } from "../contexts/userContext";
import RequestsTable from "../components/RequestsTable";
import RequestModal from "../components/RequestModal";
import GuestRequestForm from "../form/GuestRequestForm";

export default function officeDashboard() {
  const { user } = useContext(UserContext);
  console.log("User Context:", user);
  
  const userId = user?.userId;
  const role_id = user?.role_id;
  const college_id = user?.college_id;

  const [dashboardData, setDashboardData] = useState({ pendingRequests: 0, approvedRequests: 0, rejectedRequests: 0 });
  const [requests, setRequests] = useState([]);
  const [currentView, setCurrentView] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    if (userId && role_id && college_id) {
      fetchDashboardData({ userId, role_id , college_id});
      fetchRequests();
    } 
  }, [userId, role_id, currentView, college_id]);

  const fetchDashboardData = async ({ userId, role_id }) => {
    try {
      console.log("User ID:", userId);
      console.log("Role ID:", role_id);

      const body = JSON.stringify({ userId, role_id , college_id});
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
        body: JSON.stringify({ userId,role_id,  status: currentView , college_id})
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
        <h2 className="text-3xl font-bold">Welcome {user?.name || 'Guest'}</h2>
        <GuestRequestForm />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 flex flex-col h-[calc(100vh-10rem)] mb-0">
          <DashboardSidebar dashboardData={dashboardData} onViewChange={setCurrentView} />
        </div>
        <div className="md:col-span-3">
          <RequestsTable requests={requests} currentView={currentView} onViewDetails={handleViewRequestDetails} />
        </div>
      </div>
      <RequestModal isOpen={!!selectedRequest} onClose={handleCloseModal} request={selectedRequest} userName={user?.userName} />
    </div>
  );
}

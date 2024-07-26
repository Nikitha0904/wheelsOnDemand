"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import DashboardSidebar from './DashboardSidebar';
import RequestsTable from './RequestsTable';
import RequestModal from './RequestModal';
import { Button } from "@/components/ui/button";

export default function FacultyDashboard() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const userName = searchParams.get('userName');
  const college_id = searchParams.get('college_id');

  const [dashboardData, setDashboardData] = useState({ pendingRequests: 0, approvedRequests: 0, rejectedRequests: 0 });
  const [requests, setRequests] = useState([]);
  const [currentView, setCurrentView] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchDashboardData();
      fetchRequests();
    }
  }, [userId, currentView]);

  const fetchDashboardData = async () => {
    const res = await fetch(`/api/dashboard/${userId}`);
    const data = await res.json();
    setDashboardData(data);
  };

  const fetchRequests = async () => {
    const res = await fetch(`/api/requests/${userId}?status=${currentView}`);
    const data = await res.json();
    setRequests(data);
  };

  const handleRequest = () => {
    router.push(`/requisitionForm/${userId}/${userName}/${college_id}`);
  };

  const handleViewRequestDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  return (
    <div style={{paddingTop:"5rem", paddingLeft:"2rem",paddingRight:"2rem"}}className="h-[calc(100vh-8rem)] ">
      <div className="flex justify-between items-center mb-8 ">
        <h2 className="text-3xl font-bold">Welcome {userName}</h2>
        <Button onClick={handleRequest} className="bg-gray-800">Make a Request</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 flex flex-col h-[calc(100vh-10rem)]  mb-0">
          <DashboardSidebar dashboardData={dashboardData} onViewChange={setCurrentView} />
        </div>
        <div className="md:col-span-3">
          <RequestsTable requests={requests} currentView={currentView} onViewDetails={handleViewRequestDetails} />
        </div>
      </div>
      <RequestModal isOpen={!!selectedRequest} onClose={handleCloseModal} request={selectedRequest} userName={userName} />
    </div>
  );
}

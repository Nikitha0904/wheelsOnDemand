"use client";
import { Button } from "@/components/ui/button"

export default function DashboardSidebar({ dashboardData, onViewChange }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow  h-screen mb-0">
      <h5 className="text-lg font-semibold mb-4">Request Details</h5>
      <Button className="w-full mb-2 justify-between bg-gray-800" onClick={() => onViewChange('pending')}>
        <span>Pending Requests</span>
        <span>{dashboardData.pendingRequests}</span>
      </Button>
      <Button className="w-full mb-2 justify-between bg-gray-800" onClick={() => onViewChange('approved')}>
        <span>Approved Requests</span>
        <span>{dashboardData.approvedRequests}</span>
      </Button>
      <Button className="w-full justify-between bg-gray-800" onClick={() => onViewChange('rejected')}>
        <span>Rejected Requests</span>
        <span>{dashboardData.rejectedRequests}</span>
      </Button>
    </div>
  )
}
"use client";
import { Button } from "@/components/ui/button";

export default function DashboardBoxes({ dashboardData, onViewChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <Button className="w-full bg-gray-800 text-white" onClick={() => onViewChange('pending')}>
          <h5 className="text-lg font-semibold">Pending Requests</h5>
        </Button>
        <div className="mt-4 text-2xl font-semibold">{dashboardData.pendingRequests}</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <Button className="w-full bg-gray-800 text-white" onClick={() => onViewChange('approved')}>
          <h5 className="text-lg font-semibold">Approved Requests</h5>
        </Button>
        <div className="mt-4 text-2xl font-semibold">{dashboardData.approvedRequests}</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <Button className="w-full bg-gray-800 text-white" onClick={() => onViewChange('rejected')}>
          <h5 className="text-lg font-semibold">Rejected Requests</h5>
        </Button>
        <div className="mt-4 text-2xl font-semibold">{dashboardData.rejectedRequests}</div>
      </div>
    </div>
  );
}

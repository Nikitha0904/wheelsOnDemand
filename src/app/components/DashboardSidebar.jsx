"use client";

export default function DashboardBoxes({ dashboardData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div>
          <h5 className="text-lg font-semibold mb-2">Pending Requests</h5>
          <span className="text-2xl">{dashboardData.pendingRequests}</span>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div>
          <h5 className="text-lg font-semibold mb-2">Approved Requests</h5>
          <span className="text-2xl">{dashboardData.approvedRequests}</span>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div>
          <h5 className="text-lg font-semibold mb-2">Rejected Requests</h5>
          <span className="text-2xl">{dashboardData.rejectedRequests}</span>
        </div>
      </div>
    </div>
  );
}

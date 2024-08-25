// "use client";
// import React from 'react';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Eye } from "lucide-react";

// export default function RequestsTable({ requests, currentView, onViewDetails }) {

//   if (!currentView) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h5 className="text-lg font-semibold mb-4">
//         {currentView.charAt(0).toUpperCase() + currentView.slice(1)} Requests Table
//       </h5>
//       <div className="max-h-80 overflow-y-auto">
//         <Table className="min-w-full">
//           <TableHeader className="sticky top-0 bg-white z-10">
//             <TableRow>
//               <TableHead>S no</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead>Place</TableHead>
//               <TableHead>Vehicle Reporting Time</TableHead>
//               <TableHead>Purpose</TableHead>
//               <TableHead>View</TableHead>
//               <TableHead>Action</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {requests.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={7} className="text-center">
//                   No {currentView} requests
//                 </TableCell>
//               </TableRow>
//             ) : (
//               requests.map((request, index) => (
//                 <TableRow key={request.request_id}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{request.date}</TableCell>
//                   <TableCell>{request.place}</TableCell>
//                   <TableCell>{request.vehicle_reporting_time}</TableCell>
//                   <TableCell>{request.purpose}</TableCell>
//                   <TableCell>
//                     <Button variant="ghost" size="sm" onClick={() => onViewDetails(request)}>
//                       <Eye className="h-4 w-4" />
//                     </Button>
//                   </TableCell>
//                   <TableCell>
//                     {currentView === 'rejected' ? (
//                       <span className="text-red-500">Rejected</span>
//                     ) : currentView === 'approved' ? (
//                       <span className="text-green-500">Accepted</span>
//                     ) : (
//                       <div className="flex gap-1">
//                         <Button variant="outline">Reject</Button>
//                         <Button variant="success">Accept</Button>
//                       </div>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }
"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function RequestsTable({ requests, currentView, onViewDetails }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState('');

  const updateRequestStatus = async (requestId, status) => {
    try {
      const res = await fetch('/api/updaterequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId, status }),
      });

      if (!res.ok) {
        throw new Error('Failed to update request status');
      }

      // Optionally, refresh the data or update the state
      console.log("Request status updated successfully");
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  const handleAction = (request, type) => {
    setSelectedRequest(request);
    setActionType(type);
  };

  const handleConfirmAction = () => {
    if (selectedRequest && actionType) {
      updateRequestStatus(selectedRequest.request_id, actionType);
      setSelectedRequest(null); // Reset after the action
    }
  };

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">
        {currentView.charAt(0).toUpperCase() + currentView.slice(1)} Requests Table
      </h5>
      <div className="max-h-80 overflow-y-auto">
        <Table className="min-w-full">
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead>S no</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Place</TableHead>
              <TableHead>Vehicle Reporting Time</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>View</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No {currentView} requests
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request, index) => (
                <TableRow key={request.request_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>{request.place}</TableCell>
                  <TableCell>{request.vehicle_reporting_time}</TableCell>
                  <TableCell>{request.purpose}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => onViewDetails(request)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    {currentView === 'rejected' ? (
                      <span className="text-red-500">Rejected</span>
                    ) : currentView === 'approved' ? (
                      <span className="text-green-500">Accepted</span>
                    ) : (
                      <div className="flex gap-1">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" onClick={() => handleAction(request, 'rejected')}>
                              Reject
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Reject Request</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to reject this request?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleConfirmAction}>Reject</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" onClick={() => handleAction(request, 'approved')}>
                              Accept
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Accept Request</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to accept this request?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleConfirmAction}>Accept</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

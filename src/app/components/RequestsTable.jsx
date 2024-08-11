"use client";
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default function RequestsTable({ requests, currentView, onViewDetails }) {

  // Conditional rendering to handle the case when currentView is undefined or null
  if (!currentView) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">
        {currentView.charAt(0).toUpperCase() + currentView.slice(1)} Requests Table
      </h5>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S no</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Place</TableHead>
            <TableHead>Vehicle Reporting Time</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead>View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">No {currentView} requests</TableCell>
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
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

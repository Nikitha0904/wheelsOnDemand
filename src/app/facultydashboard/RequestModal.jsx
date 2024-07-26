import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function RequestModal({ isOpen, onClose, request, userName }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Details</DialogTitle>
        </DialogHeader>
        {request && (
          <div className="space-y-2">
            <p><strong>Request ID:</strong> {request.request_id}</p>
            <p><strong>Username:</strong> {userName}</p>
            <p><strong>College Name:</strong> {request.college_name}</p>
            <p><strong>Designation:</strong> {request.designation}</p>
            <p><strong>Destination From:</strong> {request.destinationFrom}</p>
            <p><strong>Destination To:</strong> {request.destinationTo}</p>
            <p><strong>Vehicle Reporting Time:</strong> {request.vehicle_reporting_time}</p>
            <p><strong>Date:</strong> {request.date}</p>
            <p><strong>Place:</strong> {request.place}</p>
            <p><strong>Purpose:</strong> {request.purpose}</p>
            <p><strong>Guest Mobile:</strong> {request.guest_mobile_no}</p>
          </div>
        )}
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
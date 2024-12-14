import React, { useState, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserContext } from "../contexts/userContext";

const GuestRequestForm = () => {
  const [open, setOpen] = useState(false);
  const [vehicleRequired, setVehicleRequired] = useState(false);
  const [roomRequired, setRoomRequired] = useState(false);
  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestMobileNumber: '',
    purpose: '',
    pickupPlace: '',
    pickupTime: '',
    vehicleStartTime: '',
    vehicleReturnTime: '',
    stayStartDate: '',
    stayEndDate: '',
    noOfPersons: 1,
  });

  // Fetch campusId and collegeId from context
  const { user } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      ...formData,
      vehicleRequired,
      roomRequired,
      collegeId: user.college_id, // Use values from context
      campusId: user.campus_id,
    };

    // Now you can send requestData to your API or backend
    console.log('Form Data:', requestData);

    // Example API call (You would replace this with actual API code)
    
    fetch('/api/guest_requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    setOpen(false); // Close the form after submission
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>New Guest Request</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="max-h-screen overflow-y-auto p-4">
          <form onSubmit={handleSubmit}>
            <SheetHeader>
              <SheetTitle>Guest Request</SheetTitle>
            </SheetHeader>
            <div className="space-y-4">
              {/* Guest Details */}
              <div>
                <Label htmlFor="guestName">Guest Name</Label>
                <Input id="guestName" placeholder="Enter guest name" onChange={handleInputChange} value={formData.guestName} />
              </div>
              <div>
                <Label htmlFor="guestEmail">Guest Email</Label>
                <Input id="guestEmail" type="email" placeholder="Enter guest email" onChange={handleInputChange} value={formData.guestEmail} />
              </div>
              <div>
                <Label htmlFor="guestMobileNumber">Guest Mobile Number</Label>
                <Input id="guestMobileNumber" type="tel" placeholder="Enter guest mobile number" onChange={handleInputChange} value={formData.guestMobile} />
              </div>
              <div>
                <Label htmlFor="purpose">Purpose of Visit</Label>
                <Input id="purpose" placeholder="Enter purpose of visit" onChange={handleInputChange} value={formData.purpose} />
              </div>

              {/* Vehicle Required */}
              <div>
                <Label className="block mb-2">Vehicle Required?</Label>
                <RadioGroup
                  onValueChange={(value) => setVehicleRequired(value === "yes")}
                  className="flex space-x-4"
                >
                  <div className="flex items-center">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="ml-2">Yes</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="ml-2">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Conditional Vehicle Fields */}
              {vehicleRequired && (
                <>
                  <div>
                    <Label htmlFor="pickupPlace">Guest Pickup Place</Label>
                    <Input id="pickupPlace" placeholder="Enter pickup place" onChange={handleInputChange} value={formData.pickupPlace} />
                  </div>
                  <div>
                    <Label htmlFor="pickupTime">Guest Pickup Time</Label>
                    <Input id="pickupTime" type="time" onChange={handleInputChange} value={formData.pickupTime} />
                  </div>
                  <div>
                    <Label htmlFor="vehicleStartTime">Vehicle Start Time</Label>
                    <Input id="vehicleStartTime" type="time" onChange={handleInputChange} value={formData.vehicleStartTime} />
                  </div>
                  <div>
                    <Label htmlFor="vehicleReturnTime">Vehicle Return Time</Label>
                    <Input id="vehicleReturnTime" type="time" onChange={handleInputChange} value={formData.vehicleReturnTime} />
                  </div>
                </>
              )}

              {/* Room Required */}
              <div>
                <Label className="block mb-2">Room Required?</Label>
                <RadioGroup
                  onValueChange={(value) => setRoomRequired(value === "yes")}
                  className="flex space-x-4"
                >
                  <div className="flex items-center">
                    <RadioGroupItem value="yes" id="yes-room" />
                    <Label htmlFor="yes-room" className="ml-2">Yes</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="no" id="no-room" />
                    <Label htmlFor="no-room" className="ml-2">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Conditional Room Fields */}
              {roomRequired && (
                <>
                  <div>
                    <Label htmlFor="stayStartDate">Stay Start Date</Label>
                    <Input id="stayStartDate" type="date" onChange={handleInputChange} value={formData.stayStartDate} />
                  </div>
                  <div>
                    <Label htmlFor="stayEndDate">Stay End Date</Label>
                    <Input id="stayEndDate" type="date" onChange={handleInputChange} value={formData.stayEndDate} />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="noOfPersons">Number of Persons Coming</Label>
                <Input id="noOfPersons" type="number" placeholder="Enter number of persons" onChange={handleInputChange} value={formData.noOfPersons} />
              </div>
            </div>

            <SheetFooter className="pt-5">
              <Button type="submit">Submit</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default GuestRequestForm;

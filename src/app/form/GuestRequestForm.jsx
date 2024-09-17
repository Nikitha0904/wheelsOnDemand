import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const GuestRequestForm = () => {
  const [open, setOpen] = useState(false);
  const [vehicleRequired, setVehicleRequired] = useState(false);
  const [roomRequired, setRoomRequired] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>New Guest Request</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="max-h-screen overflow-y-auto p-4">
          <SheetHeader>
            <SheetTitle>Guest Request</SheetTitle>
          </SheetHeader>
          <div className="space-y-4">
            {/* Guest Details */}
            <div>
              <Label htmlFor="guestName">Guest Name</Label>
              <Input id="guestName" placeholder="Enter guest name" />
            </div>
            <div>
              <Label htmlFor="guestEmail">Guest Email</Label>
              <Input id="guestEmail" type="email" placeholder="Enter guest email" />
            </div>
            <div>
              <Label htmlFor="guestMobile">Guest Mobile Number</Label>
              <Input id="guestMobile" type="tel" placeholder="Enter guest mobile number" />
            </div>
            <div>
              <Label htmlFor="purpose">Purpose of Visit</Label>
              <Input id="purpose" placeholder="Enter purpose of visit" />
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
                  <Input id="pickupPlace" placeholder="Enter pickup place" />
                </div>
                <div>
                  <Label htmlFor="pickupTime">Guest Pickup Time</Label>
                  <Input id="pickupTime" type="time" />
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
                  <Input id="stayStartDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="stayEndDate">Stay End Date</Label>
                  <Input id="stayEndDate" type="date" />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="noOfPersons">Number of Persons Coming</Label>
              <Input id="noOfPersons" type="number" placeholder="Enter number of persons" />
            </div>
          </div>

          <SheetFooter className="pt-5">
            <Button type="submit">Submit</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default GuestRequestForm;

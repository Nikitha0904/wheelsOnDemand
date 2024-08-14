import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GuestRequestForm = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>New Guest Request</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Guest Request</SheetTitle>
          </SheetHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="guestName">Guest Name</Label>
              <Input id="guestName" placeholder="Enter guest name" />
            </div>
            <div>
              <Label htmlFor="purpose">Purpose of Visit</Label>
              <Input id="purpose" placeholder="Enter purpose of visit" />
            </div>
            <div>
              <Label htmlFor="place">Place</Label>
              <Input id="place" placeholder="Enter place" />
            </div>
            <div>
              <Label htmlFor="fromDate">From Date</Label>
              <Input id="fromDate" type="date" />
            </div>
            <div>
              <Label htmlFor="toDate">To Date</Label>
              <Input id="toDate" type="date" />
            </div>
          </div>
          <SheetFooter className="pt-5">
            <Button type="submit" >Submit</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default GuestRequestForm;

'use client'

import { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TimeSelector from './TimeSelector'

const formSchema = z.object({
  college: z.string().min(1, { message: "College is required" }),
  name: z.string().min(1, { message: "Name is required" }).regex(/^[A-Za-z\s]+$/, { message: "Name format is invalid" }),
  designation: z.string().min(1, { message: "Designation is required" }).regex(/^[A-Za-z\s]+$/, { message: "Designation format is invalid" }),
  guestMobile: z.string().length(10, { message: "Mobile number must be 10 digits" }).regex(/^\d+$/, { message: "Invalid mobile number" }),
  destinationFrom: z.string().min(1, { message: "Destination From is required" }).regex(/^[A-Za-z\s]+$/, { message: "Invalid format" }),
  destinationTo: z.string().min(1, { message: "Destination To is required" }).regex(/^[A-Za-z\s]+$/, { message: "Invalid format" }),
  vehicleReportingTime: z.string().min(1, { message: "Vehicle Reporting Time is required" }),
  expectedReturnTime: z.string().min(1, { message: "Expected Return Time is required" }),
  place: z.string().min(1, { message: "Place is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  numPeople: z.string().min(1, { message: "Number of People is required" }).regex(/^[1-9][0-9]*$/, { message: "Invalid number" }),
  purpose: z.string().min(1, { message: "Purpose is required" }),
})

export default function VehicleRequisitionForm() {
  const [colleges] = useState([
    { id: '1', name: 'College A' },
    { id: '2', name: 'College B' },
    { id: '3', name: 'College C' },
  ])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      college: "",
      name: "",
      designation: "",
      guestMobile: "",
      destinationFrom: "",
      destinationTo: "",
      vehicleReportingTime: "",
      expectedReturnTime: "",
      place: "",
      date: "",
      numPeople: "",
      purpose: "",
    },
  })

  function onSubmit(data) {
    console.log(data)
    alert("Form submitted successfully!")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Vehicle Requisition Form</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="college"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select College" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {colleges.map(college => (
                      <SelectItem key={college.id} value={college.id}>
                        {college.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of Indentor</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Designation</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="guestMobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guest Mobile Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="destinationFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination From</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="destinationTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination To</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
  control={form.control}
  name="vehicleReportingTime"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Vehicle Reporting Time</FormLabel>
      <FormControl>
        <TimeSelector
          selectedHour={field.value.split(':')[0] || ''}
          selectedMinute={field.value.split(':')[1] || ''}
          selectedPeriod={field.value.split(' ')[1] || ''}
          onHourChange={(hour) => field.onChange(`${hour}:${field.value.split(':')[1] || '00'} ${field.value.split(' ')[1] || 'AM'}`)}
          onMinuteChange={(minute) => field.onChange(`${field.value.split(':')[0] || '12'}:${minute} ${field.value.split(' ')[1] || 'AM'}`)}
          onPeriodChange={(period) => field.onChange(`${field.value.split(' ')[0] || '12:00'} ${period}`)}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="expectedReturnTime"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Expected Return Time</FormLabel>
      <FormControl>
        <TimeSelector
          selectedHour={field.value.split(':')[0] || ''}
          selectedMinute={field.value.split(':')[1] || ''}
          selectedPeriod={field.value.split(' ')[1] || ''}
          onHourChange={(hour) => field.onChange(`${hour}:${field.value.split(':')[1] || '00'} ${field.value.split(' ')[1] || 'AM'}`)}
          onMinuteChange={(minute) => field.onChange(`${field.value.split(':')[0] || '12'}:${minute} ${field.value.split(' ')[1] || 'AM'}`)}
          onPeriodChange={(period) => field.onChange(`${field.value.split(' ')[0] || '12:00'} ${period}`)}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

          <FormField
            control={form.control}
            name="place"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Place</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numPeople"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of People</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
"use client"
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function TimeSelector({ label, onChange }) {
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [period, setPeriod] = useState('')

  const hoursOptions = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutesOptions = Array.from({ length: 60 }, (_, i) => i)
  const periods = ['AM', 'PM']

  const handleChange = (type, value) => {
    if (type === 'hour') setHour(value)
    if (type === 'minute') setMinute(value)
    if (type === 'period') setPeriod(value)

    if (hour && minute && period) {
      onChange(`${hour}:${minute} ${period}`)
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex space-x-2">
        <Select onValueChange={(value) => handleChange('hour', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent>
            {hoursOptions.map((h) => (
              <SelectItem key={h} value={h.toString()}>{h}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleChange('minute', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Minute" />
          </SelectTrigger>
          <SelectContent>
            {minutesOptions.map((m) => (
              <SelectItem key={m} value={m.toString()}>{m < 10 ? `0${m}` : m}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleChange('period', value)}>
          <SelectTrigger>
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            {periods.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
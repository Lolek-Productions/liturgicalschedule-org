"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AddEventModal from "@/components/add-event-modal"
import { MainHeader } from "@/components/main-header"

// Liturgical color definitions
const LITURGICAL_COLORS = {
  GREEN: "green",
  PURPLE: "purple",
  WHITE: "white",
  RED: "red",
} as const

type LiturgicalColor = (typeof LITURGICAL_COLORS)[keyof typeof LITURGICAL_COLORS]

// Event interfaces
interface EventItem {
  id: number
  title: string
  startTime: string
  endTime: string
  type: string
  location: string
  description: string
}

interface EventData {
  id: number
  title: string
  date: string
  time: string
  duration: string
  type: string
  description: string
  isRecurring: boolean
  recurringType: string
}

// Sample events with start and end times
const sampleEvents: Record<string, EventItem[]> = {
  "2024-12-15": [
    {
      id: 1,
      title: "Morning Prayer",
      startTime: "07:00",
      endTime: "07:30",
      type: "service",
      location: "Main Chapel",
      description: "Daily morning prayer service",
    },
    {
      id: 2,
      title: "Staff Meeting",
      startTime: "09:00",
      endTime: "10:00",
      type: "meeting",
      location: "Parish Hall",
      description: "Weekly staff planning meeting",
    },
    {
      id: 3,
      title: "Bible Study Setup",
      startTime: "09:30",
      endTime: "10:30",
      type: "meeting",
      location: "Fellowship Room",
      description: "Preparing for evening Bible study",
    },
    {
      id: 4,
      title: "Holy Eucharist",
      startTime: "10:30",
      endTime: "11:30",
      type: "service",
      location: "Main Chapel",
      description: "Sunday Holy Eucharist service",
    },
    {
      id: 5,
      title: "Coffee Hour",
      startTime: "11:30",
      endTime: "12:30",
      type: "social",
      location: "Parish Hall",
      description: "Post-service fellowship",
    },
    {
      id: 6,
      title: "Youth Group Meeting",
      startTime: "14:00",
      endTime: "15:30",
      type: "meeting",
      location: "Youth Room",
      description: "Weekly youth group gathering",
    },
    {
      id: 7,
      title: "Choir Practice",
      startTime: "18:00",
      endTime: "19:30",
      type: "meeting",
      location: "Music Room",
      description: "Weekly choir rehearsal",
    },
    {
      id: 8,
      title: "Evening Prayer",
      startTime: "19:30",
      endTime: "20:00",
      type: "service",
      location: "Main Chapel",
      description: "Daily evening prayer service",
    },
  ],
}

// Helper functions
function getLiturgicalColor(date: Date): LiturgicalColor {
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  // Advent (December 1-24)
  if (month === 12 && day <= 24) return LITURGICAL_COLORS.PURPLE
  // Christmas (December 25 - January 6)
  if ((month === 12 && day >= 25) || (month === 1 && day <= 6)) return LITURGICAL_COLORS.WHITE
  // Lent (varies by year, simplified)
  if (month >= 2 && month <= 3) return LITURGICAL_COLORS.PURPLE
  // Easter (varies by year, simplified)
  if (month >= 3 && month <= 5) return LITURGICAL_COLORS.WHITE
  // Ordinary Time
  return LITURGICAL_COLORS.GREEN
}

function getEventTypeColor(type: string): string {
  switch (type) {
    case "service": return "bg-blue-100 text-blue-800"
    case "meeting": return "bg-green-100 text-green-800"
    case "social": return "bg-purple-100 text-purple-800"
    case "education": return "bg-orange-100 text-orange-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

function getEventTypeIcon(type: string) {
  switch (type) {
    case "service": return <Calendar className="h-3 w-3" />
    case "meeting": return <Users className="h-3 w-3" />
    case "social": return <Users className="h-3 w-3" />
    case "education": return <Calendar className="h-3 w-3" />
    default: return <Calendar className="h-3 w-3" />
  }
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  return `${displayHour}:${minutes} ${ampm}`
}

export default function DailyPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 15)) // December 15, 2024
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const dateKey = currentDate.toISOString().split('T')[0]
  const events = sampleEvents[dateKey] || []
  const liturgicalColor = getLiturgicalColor(currentDate)

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1))
    setCurrentDate(newDate)
  }

  const handleAddEvent = (date: Date) => {
    setSelectedDate(date)
    setIsModalOpen(true)
  }

  const handleEventSave = (eventData: EventData) => {
    console.log('Event saved:', eventData)
    setIsModalOpen(false)
  }

  // Generate time slots for the day (6 AM to 10 PM)
  const timeSlots = []
  for (let hour = 6; hour <= 22; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`)
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4">
      <MainHeader 
        breadcrumbs={[
          { label: "Calendar", href: "/calendar" },
          { label: "Daily View", active: true }
        ]}
      />
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">
                {currentDate.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h1>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Badge 
              variant="outline" 
              className={`
                ${liturgicalColor === 'green' ? 'border-green-500 text-green-700' : ''}
                ${liturgicalColor === 'purple' ? 'border-purple-500 text-purple-700' : ''}
                ${liturgicalColor === 'white' ? 'border-gray-500 text-gray-700' : ''}
                ${liturgicalColor === 'red' ? 'border-red-500 text-red-700' : ''}
              `}
            >
              {liturgicalColor.charAt(0).toUpperCase() + liturgicalColor.slice(1)}
            </Badge>
          </div>
          <Button onClick={() => handleAddEvent(currentDate)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>

        {/* Daily Schedule */}
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Time Schedule */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Daily Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {timeSlots.map((timeSlot) => {
                    const slotMinutes = timeToMinutes(timeSlot)
                    const slotEvents = events.filter(event => {
                      const eventStart = timeToMinutes(event.startTime)
                      const eventEnd = timeToMinutes(event.endTime)
                      return eventStart <= slotMinutes && eventEnd > slotMinutes
                    })

                    return (
                      <div key={timeSlot} className="flex border-b border-gray-100 pb-2">
                        <div className="w-20 flex-shrink-0 text-sm text-gray-500 pt-1">
                          {formatTime(timeSlot)}
                        </div>
                        <div className="flex-1 min-h-[40px]">
                          {slotEvents.map((event) => (
                            <div
                              key={event.id}
                              className={`mb-1 rounded-md p-2 text-sm ${getEventTypeColor(event.type)}`}
                            >
                              <div className="flex items-center gap-2">
                                {getEventTypeIcon(event.type)}
                                <span className="font-medium">{event.title}</span>
                                <span className="text-xs">
                                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 mt-1 text-xs">
                                <MapPin className="h-3 w-3" />
                                {event.location}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Event Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Today&apos;s Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events.length === 0 ? (
                    <p className="text-sm text-gray-500">No events scheduled</p>
                  ) : (
                    events.map((event) => (
                      <div key={event.id} className="border-l-4 border-blue-500 pl-3">
                        <div className="font-medium text-sm">{event.title}</div>
                        <div className="text-xs text-gray-500">
                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Events</span>
                    <span className="font-medium">{events.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Services</span>
                    <span className="font-medium">
                      {events.filter(e => e.type === 'service').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Meetings</span>
                    <span className="font-medium">
                      {events.filter(e => e.type === 'meeting').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Social Events</span>
                    <span className="font-medium">
                      {events.filter(e => e.type === 'social').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddEvent={handleEventSave}
        selectedDate={selectedDate}
      />
    </div>
  )
}

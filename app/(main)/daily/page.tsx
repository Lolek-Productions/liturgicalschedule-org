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

// Sample events with start and end times
const sampleEvents = {
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
      description: "Sunday morning service",
    },
    {
      id: 5,
      title: "Choir Practice",
      startTime: "14:00",
      endTime: "15:30",
      type: "meeting",
      location: "Music Room",
      description: "Weekly choir rehearsal",
    },
    {
      id: 6,
      title: "Youth Group",
      startTime: "14:30",
      endTime: "16:00",
      type: "meeting",
      location: "Youth Room",
      description: "Weekly youth gathering",
    },
    {
      id: 7,
      title: "Evening Prayer",
      startTime: "18:00",
      endTime: "18:30",
      type: "service",
      location: "Main Chapel",
      description: "Daily evening prayer service",
    },
    {
      id: 8,
      title: "Bible Study",
      startTime: "19:00",
      endTime: "20:30",
      type: "study",
      location: "Fellowship Room",
      description: "Weekly Bible study group",
    },
  ],
}

// Helper functions for liturgical calculations (simplified)
function getLiturgicalColor(date: Date): LiturgicalColor {
  const month = date.getMonth()
  const day = date.getDate()

  // Simplified logic - in December, assume Advent
  if (month === 11 && day < 25) {
    return LITURGICAL_COLORS.PURPLE
  }
  if (month === 11 && day >= 25) {
    return LITURGICAL_COLORS.WHITE
  }

  return LITURGICAL_COLORS.GREEN
}

function getLiturgicalSeason(date: Date): string {
  const month = date.getMonth()
  const day = date.getDate()

  if (month === 11 && day < 25) {
    return "Advent"
  }
  if (month === 11 && day >= 25) {
    return "Christmas Season"
  }

  return "Ordinary Time"
}

function getColorClass(color: LiturgicalColor): string {
  switch (color) {
    case LITURGICAL_COLORS.GREEN:
      return "bg-green-500"
    case LITURGICAL_COLORS.PURPLE:
      return "bg-purple-500"
    case LITURGICAL_COLORS.WHITE:
      return "bg-gray-100 border border-gray-400"
    case LITURGICAL_COLORS.RED:
      return "bg-red-500"
    default:
      return "bg-gray-300"
  }
}

function getEventTypeColor(type: string) {
  switch (type) {
    case "service":
      return "bg-blue-500 hover:bg-blue-600 text-white"
    case "meeting":
      return "bg-green-500 hover:bg-green-600 text-white"
    case "study":
      return "bg-purple-500 hover:bg-purple-600 text-white"
    default:
      return "bg-gray-500 hover:bg-gray-600 text-white"
  }
}

function getEventTypeIcon(type: string) {
  switch (type) {
    case "service":
      return <Calendar className="h-3 w-3" />
    case "meeting":
      return <Users className="h-3 w-3" />
    case "study":
      return <Clock className="h-3 w-3" />
    default:
      return <Clock className="h-3 w-3" />
  }
}

// Convert time string to minutes from midnight
function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number)
  return hours * 60 + minutes
}

// Convert minutes to time string
function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`
}

// Calculate event positioning for overlapping events
function calculateEventPositions(events: any[]) {
  if (events.length === 0) return []

  // Sort events by start time
  const sortedEvents = [...events].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime))

  const positioned = sortedEvents.map((event) => ({
    ...event,
    startMinutes: timeToMinutes(event.startTime),
    endMinutes: timeToMinutes(event.endTime),
    column: 0,
    totalColumns: 1,
  }))

  // Group overlapping events
  const groups: any[][] = []
  let currentGroup: any[] = []

  for (let i = 0; i < positioned.length; i++) {
    const event = positioned[i]

    // Check if this event overlaps with any event in current group
    const overlaps = currentGroup.some(
      (groupEvent) => event.startMinutes < groupEvent.endMinutes && event.endMinutes > groupEvent.startMinutes,
    )

    if (overlaps || currentGroup.length === 0) {
      currentGroup.push(event)
    } else {
      // Start new group
      if (currentGroup.length > 0) {
        groups.push([...currentGroup])
      }
      currentGroup = [event]
    }
  }

  // Add the last group
  if (currentGroup.length > 0) {
    groups.push(currentGroup)
  }

  // Calculate positions within each group
  groups.forEach((group) => {
    const maxColumns = group.length
    group.forEach((event, index) => {
      event.column = index
      event.totalColumns = maxColumns
    })
  })

  return positioned
}

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function DailyLiturgicalCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)

  const navigateDay = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1))
    setCurrentDate(newDate)
  }

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const handleAddEvent = (newEvent: any) => {
    console.log("New event added:", newEvent)
  }

  const openModal = (time?: string) => {
    setSelectedTime(time)
    setIsModalOpen(true)
  }

  // Get events for current day
  const dateKey = formatDateKey(currentDate)
  const dayEvents = sampleEvents[dateKey] || []
  const positionedEvents = calculateEventPositions(dayEvents)

  // Get liturgical info
  const liturgicalColor = getLiturgicalColor(currentDate)
  const liturgicalSeason = getLiturgicalSeason(currentDate)
  const colorClass = getColorClass(liturgicalColor)

  // Generate time slots (6 AM to 10 PM)
  const timeSlots = []
  for (let hour = 6; hour <= 22; hour++) {
    timeSlots.push({
      time: `${hour.toString().padStart(2, "0")}:00`,
      label: hour <= 12 ? `${hour === 0 ? 12 : hour}:00 AM` : `${hour - 12}:00 PM`,
    })
  }

  const isToday = currentDate.toDateString() === new Date().toDateString()

  return (
    <div className="min-h-screen bg-gray-50 px-4">
      <MainHeader
        breadcrumbs={[
          { label: "Calendar", href: "/calendar" },
          { label: "Daily", active: true }
        ]}
      />
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Liturgy Planning</h1>
            <div className="flex items-center gap-2">
              <p className="text-gray-600">Daily Calendar</p>
              <Badge variant="outline" className="text-xs">
                {liturgicalSeason}
              </Badge>
            </div>
          </div>

          {/* Day Navigation */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateDay("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="min-w-[200px] text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${colorClass}`} />
                  <span className="font-medium text-lg">{dayNames[currentDate.getDay()]}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {monthNames[currentDate.getMonth()]} {currentDate.getDate()}, {currentDate.getFullYear()}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigateDay("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button size="sm" onClick={() => openModal()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Daily Calendar */}
        <Card className={isToday ? "ring-2 ring-blue-500" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Schedule</span>
              <span className="text-sm font-normal text-gray-500">
                {positionedEvents.length} event{positionedEvents.length !== 1 ? "s" : ""}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative">
              {/* Time slots */}
              {timeSlots.map((slot, index) => {
                const slotMinutes = timeToMinutes(slot.time)
                const slotEvents = positionedEvents.filter(
                  (event) => event.startMinutes <= slotMinutes && event.endMinutes > slotMinutes,
                )

                return (
                  <div key={slot.time} className="relative border-b border-gray-100 hover:bg-gray-50 group">
                    <div className="flex">
                      {/* Time label */}
                      <div className="w-20 p-3 text-sm text-gray-500 border-r border-gray-100 bg-gray-50">
                        {slot.label}
                      </div>

                      {/* Event area */}
                      <div className="flex-1 min-h-[60px] p-2 relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                          onClick={() => openModal(slot.time)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Positioned events */}
              {positionedEvents.map((event) => {
                const topPosition = ((event.startMinutes - 360) / 60) * 60 // 360 = 6 AM in minutes
                const height = ((event.endMinutes - event.startMinutes) / 60) * 60
                const leftOffset = 84 + event.column * (100 / event.totalColumns) // 84px for time column
                const width = 100 / event.totalColumns - 1 // -1 for gap

                return (
                  <div
                    key={event.id}
                    className={`absolute rounded-md p-2 cursor-pointer shadow-sm border-l-4 ${getEventTypeColor(event.type)}`}
                    style={{
                      top: `${topPosition}px`,
                      height: `${Math.max(height, 40)}px`,
                      left: `${leftOffset}%`,
                      width: `${width}%`,
                      zIndex: 10,
                    }}
                    title={`${event.startTime} - ${event.endTime}: ${event.title}`}
                  >
                    <div className="flex items-start gap-1 mb-1">
                      {getEventTypeIcon(event.type)}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{event.title}</div>
                        <div className="text-xs opacity-90">
                          {event.startTime} - {event.endTime}
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1 text-xs opacity-75 mt-1">
                            <MapPin className="h-2 w-2" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Event Summary */}
        {positionedEvents.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Today's Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {positionedEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg border">
                    <div className={`p-2 rounded-full ${getEventTypeColor(event.type)}`}>
                      {getEventTypeIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-600">
                        {event.startTime} - {event.endTime}
                        {event.location && ` • ${event.location}`}
                      </div>
                      {event.description && <div className="text-sm text-gray-500 mt-1">{event.description}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <AddEventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedDate={currentDate}
          onAddEvent={handleAddEvent}
        />
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MainHeader } from "@/components/main-header"
import AddEventModal from "@/components/add-event-modal"

interface EventItem {
  id: number
  time: string
  title: string
  type: string
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

// Sample liturgical events data
const sampleEvents: Record<number, EventItem[]> = {
  0: [
    // Sunday
    { id: 1, time: "8:00 AM", title: "Morning Prayer", type: "service" },
    { id: 2, time: "10:30 AM", title: "Holy Eucharist", type: "service" },
    { id: 3, time: "6:00 PM", title: "Evening Prayer", type: "service" },
  ],
  1: [
    // Monday
    { id: 4, time: "7:00 AM", title: "Morning Prayer", type: "service" },
  ],
  2: [
    // Tuesday
    { id: 5, time: "7:00 AM", title: "Morning Prayer", type: "service" },
    { id: 6, time: "7:00 PM", title: "Bible Study", type: "meeting" },
  ],
  3: [
    // Wednesday
    { id: 7, time: "7:00 AM", title: "Morning Prayer", type: "service" },
    { id: 8, time: "12:00 PM", title: "Midday Prayer", type: "service" },
    { id: 9, time: "7:00 PM", title: "Evening Prayer", type: "service" },
  ],
  4: [
    // Thursday
    { id: 10, time: "7:00 AM", title: "Morning Prayer", type: "service" },
  ],
  5: [
    // Friday
    { id: 11, time: "7:00 AM", title: "Morning Prayer", type: "service" },
    { id: 12, time: "6:00 PM", title: "Choir Practice", type: "meeting" },
  ],
  6: [
    // Saturday
    { id: 13, time: "8:00 AM", title: "Morning Prayer", type: "service" },
    { id: 14, time: "5:00 PM", title: "Evening Prayer", type: "service" },
  ],
}

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const getEventTypeColor = (type: string) => {
  switch (type) {
    case "service":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    case "meeting":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }
}

const getEventTypeIcon = (type: string) => {
  switch (type) {
    case "service":
      return <Calendar className="h-3 w-3" />
    case "meeting":
      return <Users className="h-3 w-3" />
    default:
      return <Clock className="h-3 w-3" />
  }
}

export default function WeeklyCalendar() {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  // Get the start of the current week (Sunday)
  const getWeekStart = (date: Date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day
    return new Date(d.setDate(diff))
  }

  const weekStart = getWeekStart(currentWeek)

  // Generate array of dates for the current week
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart)
    date.setDate(weekStart.getDate() + i)
    return date
  })

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeek)
    newDate.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7))
    setCurrentWeek(newDate)
  }

  const formatDateRange = () => {
    const endDate = new Date(weekStart)
    endDate.setDate(weekStart.getDate() + 6)

    const startMonth = weekStart.toLocaleDateString("en-US", { month: "short" })
    const endMonth = endDate.toLocaleDateString("en-US", { month: "short" })
    const year = weekStart.getFullYear()

    if (startMonth === endMonth) {
      return `${startMonth} ${weekStart.getDate()}-${endDate.getDate()}, ${year}`
    } else {
      return `${startMonth} ${weekStart.getDate()} - ${endMonth} ${endDate.getDate()}, ${year}`
    }
  }

  const handleAddEvent = (newEvent: EventData) => {
    console.log("New event added:", newEvent)
    // Here you would typically save to your backend or state management
    // For now, we'll just log it
  }

  const openModal = (date?: Date) => {
    setSelectedDate(date)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4">
      <MainHeader 
        breadcrumbs={[
          { label: "Calendar", href: "/calendar" },
          { label: "Weekly", active: true }
        ]}
      />  
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Liturgy Planning</h1>
            <p className="text-gray-600">Weekly Calendar</p>
          </div>

          {/* Week Navigation */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="min-w-[200px] text-center font-medium">{formatDateRange()}</span>
              <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button size="sm" onClick={() => openModal()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid gap-3 xl:grid-cols-7">
          {weekDates.map((date, dayIndex) => {
            const dayEvents: EventItem[] = sampleEvents[dayIndex] || []
            const isToday = date.toDateString() === new Date().toDateString()

            return (
              <Card key={dayIndex} className={`${isToday ? "ring-2 ring-blue-500" : ""}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                        {daysOfWeek[dayIndex]}
                      </div>
                      <div className={`text-xl font-bold ${isToday ? "text-blue-600" : "text-gray-900"}`}>
                        {date.getDate()}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => openModal(date)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1.5 min-h-[200px]">
                  {dayEvents.length === 0 ? (
                    <p className="text-sm text-gray-500 italic py-4">No events scheduled</p>
                  ) : (
                    dayEvents.map((event: EventItem) => (
                      <div
                        key={event.id}
                        className="group cursor-pointer rounded-md border border-gray-200 p-2.5 transition-colors hover:bg-gray-50"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-600">{event.time}</span>
                            <div
                              className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs font-medium ${getEventTypeColor(event.type)}`}
                            >
                              {getEventTypeIcon(event.type)}
                            </div>
                          </div>
                          <h4 className="font-medium text-gray-900 text-sm leading-tight">{event.title}</h4>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Mobile-specific improvements */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Add Service
              </Button>
              <Button variant="outline" className="justify-start">
                <Users className="mr-2 h-4 w-4" />
                Add Meeting
              </Button>
              <Button variant="outline" className="justify-start">
                <Clock className="mr-2 h-4 w-4" />
                View Schedule
              </Button>
              <Button variant="outline" className="justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Quick Add
              </Button>
            </CardContent>
          </Card>
        </div>
        <AddEventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedDate={selectedDate}
          onAddEvent={handleAddEvent}
        />
      </div>
    </div>
  )
}

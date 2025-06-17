"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AddEventModal from "@/components/add-event-modal"
import { MainHeader } from "@/components/main-header"

// Liturgical color definitions (same as yearly view)
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

// Sample events data (expanded for monthly view)
const sampleEvents: Record<string, EventItem[]> = {
  "2024-12-01": [{ id: 1, time: "8:00 AM", title: "Morning Prayer", type: "service" }],
  "2024-12-08": [
    { id: 2, time: "10:30 AM", title: "Holy Eucharist", type: "service" },
    { id: 3, time: "6:00 PM", title: "Advent Lessons", type: "service" },
  ],
  "2024-12-15": [
    { id: 4, time: "9:00 AM", title: "Morning Prayer", type: "service" },
    { id: 5, time: "7:00 PM", title: "Choir Practice", type: "meeting" },
  ],
  "2024-12-22": [{ id: 6, time: "10:30 AM", title: "Fourth Sunday of Advent", type: "service" }],
  "2024-12-24": [{ id: 7, time: "11:00 PM", title: "Christmas Eve Service", type: "service" }],
  "2024-12-25": [{ id: 8, time: "10:00 AM", title: "Christmas Day Service", type: "service" }],
}

// Helper functions (same as yearly view)
function getEasterDate(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1

  return new Date(year, month - 1, day)
}

function getAshWednesday(year: number): Date {
  const easter = getEasterDate(year)
  const ashWednesday = new Date(easter)
  ashWednesday.setDate(easter.getDate() - 46)
  return ashWednesday
}

function getFirstAdvent(year: number): Date {
  const christmas = new Date(year, 11, 25)
  const dayOfWeek = christmas.getDay()
  const daysToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek
  const fourthAdvent = new Date(christmas)
  fourthAdvent.setDate(25 - daysToSunday)

  const firstAdvent = new Date(fourthAdvent)
  firstAdvent.setDate(fourthAdvent.getDate() - 21)
  return firstAdvent
}

function getLiturgicalColor(date: Date): LiturgicalColor {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  const easter = getEasterDate(year)
  const ashWednesday = getAshWednesday(year)
  const firstAdvent = getFirstAdvent(year)
  const christmas = new Date(year, 11, 25)
  const pentecost = new Date(easter)
  pentecost.setDate(easter.getDate() + 49)

  const epiphany = new Date(year, 0, 6)
  const baptismOfLord = new Date(epiphany)
  const daysAfterEpiphany = epiphany.getDay() === 0 ? 7 : 7 - epiphany.getDay()
  baptismOfLord.setDate(6 + daysAfterEpiphany)

  const palmSunday = new Date(easter)
  palmSunday.setDate(easter.getDate() - 7)

  // Christmas Season
  if ((month === 11 && day >= 25) || (month === 0 && date <= baptismOfLord)) {
    return LITURGICAL_COLORS.WHITE
  }

  // Advent Season
  if (date >= firstAdvent && date < christmas) {
    return LITURGICAL_COLORS.PURPLE
  }

  // Lent
  const holyThursday = new Date(easter)
  holyThursday.setDate(easter.getDate() - 3)
  if (date >= ashWednesday && date <= holyThursday) {
    return LITURGICAL_COLORS.PURPLE
  }

  // Easter Season
  if (date >= easter && date <= pentecost) {
    if (date.getTime() === pentecost.getTime()) {
      return LITURGICAL_COLORS.RED
    }
    return LITURGICAL_COLORS.WHITE
  }

  // Special days
  if (date.getTime() === palmSunday.getTime()) {
    return LITURGICAL_COLORS.RED
  }

  const goodFriday = new Date(easter)
  goodFriday.setDate(easter.getDate() - 2)
  if (date.getTime() === goodFriday.getTime()) {
    return LITURGICAL_COLORS.RED
  }

  return LITURGICAL_COLORS.GREEN
}

function getLiturgicalSeason(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  const easter = getEasterDate(year)
  const ashWednesday = getAshWednesday(year)
  const firstAdvent = getFirstAdvent(year)
  const christmas = new Date(year, 11, 25)
  const pentecost = new Date(easter)
  pentecost.setDate(easter.getDate() + 49)

  const epiphany = new Date(year, 0, 6)
  const baptismOfLord = new Date(epiphany)
  const daysAfterEpiphany = epiphany.getDay() === 0 ? 7 : 7 - epiphany.getDay()
  baptismOfLord.setDate(6 + daysAfterEpiphany)

  if ((month === 11 && day >= 25) || (month === 0 && date <= baptismOfLord)) {
    return "Christmas Season"
  }

  if (date >= firstAdvent && date < christmas) {
    return "Advent"
  }

  const holyThursday = new Date(easter)
  holyThursday.setDate(easter.getDate() - 3)
  if (date >= ashWednesday && date <= holyThursday) {
    return "Lent"
  }

  if (date >= easter && date <= pentecost) {
    return "Easter Season"
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
      return "bg-blue-100 text-blue-800"
    case "meeting":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getEventTypeIcon(type: string) {
  switch (type) {
    case "service":
      return <Calendar className="h-3 w-3" />
    case "meeting":
      return <Users className="h-3 w-3" />
    default:
      return <Clock className="h-3 w-3" />
  }
}

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

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function MonthlyLiturgicalCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentMonth + (direction === "next" ? 1 : -1))
    setCurrentDate(newDate)
  }

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const handleAddEvent = (newEvent: EventData) => {
    console.log("New event added:", newEvent)
  }

  const openModal = (date?: Date) => {
    setSelectedDate(date)
    setIsModalOpen(true)
  }

  // Get current liturgical season
  const firstOfMonth = new Date(currentYear, currentMonth, 1)
  const liturgicalSeason = getLiturgicalSeason(firstOfMonth)

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 lg:h-32 border border-gray-200 bg-gray-50" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const dateKey = formatDateKey(date)
      const dayEvents = sampleEvents[dateKey] || []
      const liturgicalColor = getLiturgicalColor(date)
      const colorClass = getColorClass(liturgicalColor)
      const isToday = date.toDateString() === new Date().toDateString()

      days.push(
        <div
          key={day}
          className={`h-24 lg:h-32 border border-gray-200 bg-white p-1 overflow-hidden ${
            isToday ? "ring-2 ring-blue-500" : ""
          }`}
        >
          {/* Day header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <span className={`text-sm font-medium ${isToday ? "text-blue-600" : "text-gray-900"}`}>{day}</span>
              <div
                className={`w-2 h-2 rounded-full ${colorClass}`}
                title={`${liturgicalColor.charAt(0).toUpperCase() + liturgicalColor.slice(1)}`}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 hover:opacity-100"
              onClick={() => openModal(date)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Events */}
          <div className="space-y-0.5">
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="text-xs p-1 rounded cursor-pointer hover:bg-gray-50 truncate"
                title={`${event.time} - ${event.title}`}
              >
                <div className="flex items-center gap-1">
                  <div className={`inline-flex items-center rounded-full px-1 py-0.5 ${getEventTypeColor(event.type)}`}>
                    {getEventTypeIcon(event.type)}
                  </div>
                  <span className="text-xs text-gray-600">{event.time}</span>
                </div>
                <div className="font-medium text-gray-900 truncate text-xs mt-0.5">{event.title}</div>
              </div>
            ))}
            {dayEvents.length > 3 && <div className="text-xs text-gray-500 px-1">+{dayEvents.length - 3} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4">

      <MainHeader 
        breadcrumbs={[
          { label: "Building Your Application", href: "#" },
          { label: "Data Fetching", active: true }
        ]}
      />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Liturgy Planning</h1>
            <div className="flex items-center gap-2">
              <p className="text-gray-600">Monthly Calendar</p>
              <Badge variant="outline" className="text-xs">
                {liturgicalSeason}
              </Badge>
            </div>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="min-w-[150px] text-center font-medium text-lg">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button size="sm" onClick={() => openModal()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Legend */}
        <Card className="mb-6">
          <CardContent className="py-3">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="font-medium text-gray-700">Liturgical Colors:</span>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>Ordinary Time</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span>Advent & Lent</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-100 border border-gray-400" />
                <span>Christmas & Easter</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>Special Feasts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card>
          <CardHeader className="pb-3">
            <div className="grid grid-cols-7 gap-1">
              {dayNames.map((day) => (
                <div key={day} className="text-sm font-medium text-gray-500 text-center py-2">
                  {day}
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-7 gap-0 group">{renderCalendar()}</div>
          </CardContent>
        </Card>

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

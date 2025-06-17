"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MainHeader } from "@/components/main-header"

// Liturgical color definitions
const LITURGICAL_COLORS = {
  GREEN: "green", // Ordinary Time
  PURPLE: "purple", // Advent, Lent
  WHITE: "white", // Christmas, Easter, major feasts
  RED: "red", // Palm Sunday, Pentecost, martyrs
} as const

type LiturgicalColor = (typeof LITURGICAL_COLORS)[keyof typeof LITURGICAL_COLORS]

// Helper function to get Easter date for a given year
function getEasterDate(year: number): Date {
  // Using the algorithm for Western Easter
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

// Helper function to get Ash Wednesday date
function getAshWednesday(year: number): Date {
  const easter = getEasterDate(year)
  const ashWednesday = new Date(easter)
  ashWednesday.setDate(easter.getDate() - 46) // 46 days before Easter
  return ashWednesday
}

// Helper function to get first Sunday of Advent
function getFirstAdvent(year: number): Date {
  const christmas = new Date(year, 11, 25) // December 25
  const dayOfWeek = christmas.getDay()
  const daysToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek
  const fourthAdvent = new Date(christmas)
  fourthAdvent.setDate(25 - daysToSunday)

  const firstAdvent = new Date(fourthAdvent)
  firstAdvent.setDate(fourthAdvent.getDate() - 21) // 3 weeks before 4th Sunday
  return firstAdvent
}

// Function to determine liturgical color for a given date
function getLiturgicalColor(date: Date): LiturgicalColor {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const dayOfYear = Math.floor((date.getTime() - new Date(year, 0, 0).getTime()) / (1000 * 60 * 60 * 24))

  // Get key liturgical dates
  const easter = getEasterDate(year)
  const ashWednesday = getAshWednesday(year)
  const firstAdvent = getFirstAdvent(year)
  const christmas = new Date(year, 11, 25)
  const pentecost = new Date(easter)
  pentecost.setDate(easter.getDate() + 49) // 49 days after Easter

  // Baptism of the Lord (first Sunday after January 6)
  const epiphany = new Date(year, 0, 6)
  const baptismOfLord = new Date(epiphany)
  const daysAfterEpiphany = epiphany.getDay() === 0 ? 7 : 7 - epiphany.getDay()
  baptismOfLord.setDate(6 + daysAfterEpiphany)

  // Palm Sunday (Sunday before Easter)
  const palmSunday = new Date(easter)
  palmSunday.setDate(easter.getDate() - 7)

  // Christmas Season (Dec 25 - Baptism of the Lord)
  if ((month === 11 && day >= 25) || (month === 0 && date <= baptismOfLord)) {
    return LITURGICAL_COLORS.WHITE
  }

  // Advent Season
  if (date >= firstAdvent && date < christmas) {
    return LITURGICAL_COLORS.PURPLE
  }

  // Lent (Ash Wednesday to Holy Thursday)
  const holyThursday = new Date(easter)
  holyThursday.setDate(easter.getDate() - 3)
  if (date >= ashWednesday && date <= holyThursday) {
    return LITURGICAL_COLORS.PURPLE
  }

  // Easter Season (Easter to Pentecost)
  if (date >= easter && date <= pentecost) {
    // Special days in Easter season
    if (date.getTime() === pentecost.getTime()) {
      return LITURGICAL_COLORS.RED // Pentecost
    }
    return LITURGICAL_COLORS.WHITE
  }

  // Palm Sunday
  if (date.getTime() === palmSunday.getTime()) {
    return LITURGICAL_COLORS.RED
  }

  // Good Friday
  const goodFriday = new Date(easter)
  goodFriday.setDate(easter.getDate() - 2)
  if (date.getTime() === goodFriday.getTime()) {
    return LITURGICAL_COLORS.RED
  }

  // Major feasts (simplified - you can expand this)
  const majorFeasts = [
    { month: 0, day: 1 }, // New Year's Day - Mary, Mother of God
    { month: 0, day: 6 }, // Epiphany
    { month: 7, day: 15 }, // Assumption
    { month: 10, day: 1 }, // All Saints
  ]

  for (const feast of majorFeasts) {
    if (month === feast.month && day === feast.day) {
      return LITURGICAL_COLORS.WHITE
    }
  }

  // Default to Ordinary Time (Green)
  return LITURGICAL_COLORS.GREEN
}

// Get color class for dot
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

export default function YearlyPage() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const navigateYear = (direction: "prev" | "next") => {
    setCurrentYear((prev) => prev + (direction === "next" ? 1 : -1))
  }

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderMonth = (monthIndex: number) => {
    const daysInMonth = getDaysInMonth(currentYear, monthIndex)
    const firstDay = getFirstDayOfMonth(currentYear, monthIndex)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, monthIndex, day)
      const liturgicalColor = getLiturgicalColor(date)
      const colorClass = getColorClass(liturgicalColor)
      const isToday = date.toDateString() === new Date().toDateString()

      days.push(
        <div
          key={day}
          className={`relative h-8 flex items-center justify-center text-sm ${
            isToday ? "bg-blue-100 rounded-md font-bold text-blue-700" : ""
          }`}
        >
          <span className="text-gray-700">{day}</span>
          <div
            className={`absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full ${colorClass}`}
            title={`${liturgicalColor.charAt(0).toUpperCase() + liturgicalColor.slice(1)} - ${date.toDateString()}`}
          />
        </div>,
      )
    }

    return (
      <Card key={monthIndex} className="h-fit">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-center">{monthNames[monthIndex]}</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-xs font-medium text-gray-500 text-center py-1">
                {day}
              </div>
            ))}
          </div>
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">{days}</div>
        </CardContent>
      </Card>
    )
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
            <h1 className="text-3xl font-bold text-gray-900">Liturgical Calendar</h1>
            <p className="text-gray-600">Year {currentYear}</p>
          </div>

          {/* Year Navigation */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateYear("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="min-w-[100px] text-center font-medium text-lg">{currentYear}</span>
              <Button variant="outline" size="sm" onClick={() => navigateYear("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Liturgical Colors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <span className="text-sm">Ordinary Time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-500" />
                <span className="text-sm">Advent & Lent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-100 border border-gray-400" />
                <span className="text-sm">Christmas & Easter</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500" />
                <span className="text-sm">Special Feasts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }, (_, i) => renderMonth(i))}
        </div>
      </div>
    </div>
  )
}

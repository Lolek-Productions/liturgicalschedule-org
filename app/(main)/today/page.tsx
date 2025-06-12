import { CalendarDays, Users, BookOpen, Settings, Bell, Church } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LiturgyCalendar } from "@/components/liturgy-calendar"
import { MinisterSchedule } from "@/components/minister-schedule"
import { ReadingsManager } from "@/components/readings-manager"
import { MassPlanning } from "@/components/mass-planning"

export default function LiturgyPlanner() {
  const upcomingLiturgies = [
    {
      date: "2024-01-07",
      title: "Epiphany of the Lord",
      type: "Solemnity",
      masses: ["8:00 AM", "10:30 AM", "6:00 PM"],
      presider: "Fr. Michael",
      status: "Complete",
    },
    {
      date: "2024-01-14",
      title: "Second Sunday in Ordinary Time",
      type: "Sunday",
      masses: ["8:00 AM", "10:30 AM", "6:00 PM"],
      presider: "Fr. John",
      status: "Needs Ministers",
    },
    {
      date: "2024-01-21",
      title: "Third Sunday in Ordinary Time",
      type: "Sunday",
      masses: ["8:00 AM", "10:30 AM", "6:00 PM"],
      presider: "TBD",
      status: "Planning",
    },
  ]

  const ministeringNeeds = [
    { role: "Lector 1", mass: "10:30 AM Sunday", date: "Jan 14" },
    { role: "Extraordinary Minister", mass: "6:00 PM Sunday", date: "Jan 14" },
    { role: "Altar Server", mass: "8:00 AM Sunday", date: "Jan 21" },
    { role: "Cantor", mass: "10:30 AM Sunday", date: "Jan 21" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Church className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">St. Mary's Parish</h1>
                <p className="text-sm text-muted-foreground">Liturgy Planning System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week's Masses</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ministers Needed</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Urgent assignments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Readings Prepared</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground">Next 4 weeks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Special Liturgies</CardTitle>
              <Church className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Liturgies</CardTitle>
              <CardDescription>Next liturgical celebrations requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingLiturgies.map((liturgy, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{liturgy.title}</h3>
                        <Badge variant={liturgy.type === "Solemnity" ? "default" : "secondary"}>{liturgy.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(liturgy.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm">
                        Masses: {liturgy.masses.join(", ")} | Presider: {liturgy.presider}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          liturgy.status === "Complete"
                            ? "default"
                            : liturgy.status === "Needs Ministers"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {liturgy.status}
                      </Badge>
                      <div className="mt-2">
                        <Button size="sm" variant="outline">
                          Plan Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Minister Assignments Needed</CardTitle>
              <CardDescription>Urgent scheduling requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ministeringNeeds.map((need, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{need.role}</p>
                      <p className="text-xs text-muted-foreground">
                        {need.mass} - {need.date}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Assign
                    </Button>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                View All Assignments
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="calendar" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendar">Liturgical Calendar</TabsTrigger>
            <TabsTrigger value="ministers">Minister Schedule</TabsTrigger>
            <TabsTrigger value="readings">Readings Manager</TabsTrigger>
            <TabsTrigger value="planning">Mass Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <LiturgyCalendar />
          </TabsContent>

          <TabsContent value="ministers" className="space-y-4">
            <MinisterSchedule />
          </TabsContent>

          <TabsContent value="readings" className="space-y-4">
            <ReadingsManager />
          </TabsContent>

          <TabsContent value="planning" className="space-y-4">
            <MassPlanning />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

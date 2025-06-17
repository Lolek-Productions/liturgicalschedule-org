"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Menu, X, SkipBack, SkipForward, CheckCircle2, Circle } from "lucide-react"
import { MainHeader } from "@/components/main-header"

// Sample video data structure
const videoModules = [
  {
    id: "module-1",
    title: "Getting Started",
    videos: [
      {
        id: "video-1",
        title: "Introduction to the Platform",
        duration: "5:30",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: "video-2",
        title: "Setting Up Your Account",
        duration: "8:15",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      },
      {
        id: "video-3",
        title: "Navigation Basics",
        duration: "6:45",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
    ],
  },
  {
    id: "module-2",
    title: "Core Features",
    videos: [
      {
        id: "video-4",
        title: "Dashboard Overview",
        duration: "12:20",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      },
      {
        id: "video-5",
        title: "Creating Your First Project",
        duration: "15:30",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      },
      {
        id: "video-6",
        title: "Managing Team Members",
        duration: "9:10",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      },
    ],
  },
  {
    id: "module-3",
    title: "Advanced Topics",
    videos: [
      {
        id: "video-7",
        title: "Advanced Settings",
        duration: "18:45",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      },
      {
        id: "video-8",
        title: "Integration Setup",
        duration: "22:15",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      },
      {
        id: "video-9",
        title: "Best Practices",
        duration: "14:30",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      },
    ],
  },
]

export default function VideoTrainingModule() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState("video-1")
  const [completedVideos, setCompletedVideos] = useState<Set<string>>(new Set())

  // Get all videos flattened
  const allVideos = videoModules.flatMap((module) => module.videos)
  const totalVideos = allVideos.length
  const completedCount = completedVideos.size
  const progressPercentage = (completedCount / totalVideos) * 100

  // Get current video
  const currentVideo = allVideos.find((video) => video.id === currentVideoId)
  const currentVideoIndex = allVideos.findIndex((video) => video.id === currentVideoId)

  const toggleVideoCompletion = (videoId: string) => {
    const newCompleted = new Set(completedVideos)
    if (newCompleted.has(videoId)) {
      newCompleted.delete(videoId)
    } else {
      newCompleted.add(videoId)
    }
    setCompletedVideos(newCompleted)
  }

  const navigateToVideo = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" ? currentVideoIndex - 1 : currentVideoIndex + 1
    if (newIndex >= 0 && newIndex < allVideos.length) {
      setCurrentVideoId(allVideos[newIndex].id)
    }
  }

  const markCurrentAsComplete = () => {
    if (currentVideo) {
      toggleVideoCompletion(currentVideo.id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4">
    
      <MainHeader 
        breadcrumbs={[
          { label: "Building Your Application", href: "#" },
          { label: "Data Fetching", active: true }
        ]}
      />
      
      {/* Header with Progress */}
      <div className="bg-white border-b px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden"
              >
                {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
              <h1 className="text-2xl font-bold">Video Training</h1>
            </div>
            <Badge variant="secondary" className="text-sm">
              {completedCount} of {totalVideos} completed
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Overall Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <div
          className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r
          overflow-y-auto
        `}
        >
          <div className="p-4 pt-20 lg:pt-4">
            <h2 className="font-semibold text-lg mb-4">Training Modules</h2>

            {videoModules.map((module) => (
              <div key={module.id} className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  {module.title}
                  <Badge variant="outline" className="text-xs">
                    {module.videos.filter((v) => completedVideos.has(v.id)).length}/{module.videos.length}
                  </Badge>
                </h3>

                <div className="space-y-2">
                  {module.videos.map((video) => (
                    <div
                      key={video.id}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                        ${currentVideoId === video.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"}
                      `}
                      onClick={() => {
                        setCurrentVideoId(video.id)
                        setIsSidebarOpen(false)
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {completedVideos.has(video.id) ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          )}
                          <span
                            className={`text-sm font-medium truncate ${
                              currentVideoId === video.id ? "text-blue-700" : "text-gray-900"
                            }`}
                          >
                            {video.title}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{video.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          {currentVideo && (
            <div className="max-w-4xl mx-auto">
              {/* Video Player */}
              <Card className="mb-6">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                    <video
                      className="w-full h-full"
                      controls
                      src={currentVideo.url}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{currentVideo.title}</h2>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Duration: {currentVideo.duration}</span>
                          <span>•</span>
                          <span>
                            Video {currentVideoIndex + 1} of {totalVideos}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={markCurrentAsComplete}
                        variant={completedVideos.has(currentVideo.id) ? "default" : "outline"}
                        className="flex items-center gap-2"
                      >
                        {completedVideos.has(currentVideo.id) ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Circle className="w-4 h-4" />
                            Mark Complete
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={() => navigateToVideo("prev")}
                        disabled={currentVideoIndex === 0}
                        className="flex items-center gap-2"
                      >
                        <SkipBack className="w-4 h-4" />
                        Previous
                      </Button>

                      <div className="text-sm text-gray-600">
                        {currentVideoIndex + 1} / {totalVideos}
                      </div>

                      <Button
                        variant="outline"
                        onClick={() => navigateToVideo("next")}
                        disabled={currentVideoIndex === totalVideos - 1}
                        className="flex items-center gap-2"
                      >
                        Next
                        <SkipForward className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Module Progress */}
              {/* <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Module Progress</h3>
                  <div className="space-y-4">
                    {videoModules.map((module) => {
                      const moduleCompleted = module.videos.filter((v) => completedVideos.has(v.id)).length
                      const moduleTotal = module.videos.length
                      const moduleProgress = (moduleCompleted / moduleTotal) * 100

                      return (
                        <div key={module.id}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">{module.title}</span>
                            <span className="text-gray-600">
                              {moduleCompleted}/{moduleTotal}
                            </span>
                          </div>
                          <Progress value={moduleProgress} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card> */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import { FileText, MessageSquare, Users } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "document",
      title: "Uploaded 'Research Paper Draft'",
      time: "2 hours ago",
      icon: FileText,
    },
    {
      id: 2,
      type: "message",
      title: "Commented on Sarah's question",
      time: "Yesterday",
      icon: MessageSquare,
    },
    {
      id: 3,
      type: "session",
      title: "Joined 'Biology Study Group'",
      time: "2 days ago",
      icon: Users,
    },
    {
      id: 4,
      type: "document",
      title: "Downloaded 'Lecture Notes'",
      time: "3 days ago",
      icon: FileText,
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <activity.icon className="h-5 w-5 text-primary" />
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.title}</p>
            <p className="text-sm text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

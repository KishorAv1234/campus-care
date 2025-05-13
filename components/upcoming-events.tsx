import { CalendarDays, Users } from "lucide-react"

export function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: "Calculus Study Group",
      date: "Today, 3:00 PM",
      participants: 4,
    },
    {
      id: 2,
      title: "Physics Lab Prep",
      date: "Tomorrow, 2:00 PM",
      participants: 3,
    },
    {
      id: 3,
      title: "Computer Science Project",
      date: "Friday, 4:30 PM",
      participants: 5,
    },
  ]

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{event.title}</p>
            <p className="text-sm text-muted-foreground">{event.date}</p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{event.participants}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { InteractiveEvents } from "@/components/interactive-events"
import { InteractiveDietPlan } from "@/components/interactive-diet-plan"
import { InteractiveNotes } from "@/components/interactive-notes"

export default function DashboardClientPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Left) */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="mt-2 text-lg font-semibold">John Doe</h2>
          <p className="text-sm text-gray-500">john.doe@example.com</p>
        </div>
        <hr className="my-2" />
        <nav>
          <ul>
            <li className="p-4 hover:bg-gray-100">
              <a href="#" className="block">
                Dashboard
              </a>
            </li>
            <li className="p-4 hover:bg-gray-100">
              <a href="#" className="block">
                Profile
              </a>
            </li>
            <li className="p-4 hover:bg-gray-100">
              <a href="#" className="block">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content (Right) */}
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Client Dashboard</h1>
          <div className="space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Actions <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>New Event</DropdownMenuItem>
                <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="events" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="diet">Diet Plan</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="events" className="space-y-6">
            <InteractiveEvents />
          </TabsContent>
          <TabsContent value="diet" className="space-y-6">
            <InteractiveDietPlan />
          </TabsContent>
          <TabsContent value="notes" className="space-y-6">
            <InteractiveNotes />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

import { CalendarIcon, ChevronDownIcon } from "@radix-ui/react-icons"

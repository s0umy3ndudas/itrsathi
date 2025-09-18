import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, File, AlertTriangle, DollarSign, FileCheck, Scale } from "lucide-react";
import SearchableAssesseeDropdown from "@/components/SearchDropdown";

export default function UserCalendar( ) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventCounts, setEventCounts] = useState({
    notices: 0,
    demands: 0,
    itrs: 0,
    audits: 0
  });
// Default to "ALL"
const [selectedAssessee, setSelectedAssessee] = useState("ALL");
  
useEffect(() => {
  async function fetchEvents() {
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "null");
      const token = auth?.accessToken;

      console.log("token:", token);

      if (!token) throw new Error("No access token found");

      let url;
      if (selectedAssessee === "ALL") {
        // All PANs for this user
        url = `${import.meta.env.VITE_API_BASE_URL}/api/users/calendar/pan/ALL`;
      } else if (selectedAssessee && selectedAssessee.pan) {
        // Specific PAN
        url = `${import.meta.env.VITE_API_BASE_URL}/api/users/calendar/pan/${selectedAssessee.pan}`;
      } else {
        // fallback (shouldn't happen)
        url = `${import.meta.env.VITE_API_BASE_URL}/api/users/calendar`;
      }

      console.log("Fetching from:", url);

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();

      const processedEvents = data.map((event) => ({
        id: Math.random().toString(36).substr(2, 9),
        title: event.title,
        start: event.start,
        backgroundColor: event.color,
        borderColor: event.color,
        textColor: "#ffffff",
        extendedProps: {
          type: event.type,
          description: event.title,
          eventData: event.eventData,
        },
      }));

      const counts = {
        notices: data.filter((e) => e.type === "notice" || e.type === "notice_due").length,
        demands: data.filter((e) => e.type === "demand").length,
        itrs: data.filter((e) => e.type === "itr").length,
        audits: data.filter((e) => e.type === "audit").length,
      };

      setEvents(processedEvents);
      setEventCounts(counts);
    } catch (err) {
      console.error("Failed to fetch calendar events:", err);
    } finally {
      setLoading(false);
    }
  }

  fetchEvents();
}, [selectedAssessee]);

  const getEventType = (title) => {
    if (title.includes('Notice')) return 'notice';
    if (title.includes('Demand')) return 'demand';
    if (title.includes('ITR')) return 'itr';
    if (title.includes('Audit')) return 'audit';
    return 'other';
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'notice': return <File className="h-4 w-4" />;
      case 'demand': return <DollarSign className="h-4 w-4" />;
      case 'itr': return <FileCheck className="h-4 w-4" />;
      case 'audit': return <Scale className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const handleEventClick = (info) => {
    setSelectedEvent({
      title: info.event.title,
      date: info.event.start,
      type: info.event.extendedProps.type,
      description: info.event.extendedProps.description
    });
  };

  const handleDateClick = (info) => {
    const eventsOnDate = events.filter(event => 
      new Date(event.start).toDateString() === info.date.toDateString()
    );
    
    if (eventsOnDate.length > 0) {
      alert(`${eventsOnDate.length} event(s) on ${info.dateStr}:\n${eventsOnDate.map(e => e.title).join('\n')}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading calendar events...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Event Summary Cards */}

        <label className="block mb-2 font-semibold text-lg text-white">Select Assessee</label>
        <SearchableAssesseeDropdown  onSelect={setSelectedAssessee} selectedAssessee={selectedAssessee}/>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <File className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-700">{eventCounts.notices}</div>
            <div className="text-sm text-red-600">Notices</div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-700">{eventCounts.demands}</div>
            <div className="text-sm text-yellow-600">Demands</div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <FileCheck className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-700">{eventCounts.itrs}</div>
            <div className="text-sm text-green-600">ITR Filings</div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Scale className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-700">{eventCounts.audits}</div>
            <div className="text-sm text-blue-600">Audits</div>
          </CardContent>
        </Card>

      
      </div>

      {/* Main Calendar */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Tax Events Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,dayGridDay",
            }}
            events={events}
            height="auto"
            eventClick={handleEventClick}
            dateClick={handleDateClick}
            eventDisplay="block"
            dayMaxEvents={3}
            moreLinkClick="popover"
            eventDidMount={(info) => {
              // Add tooltip on hover
              info.el.setAttribute('title', info.event.title);
            }}
            eventClassNames="cursor-pointer hover:opacity-80 transition-opacity"
          />
        </CardContent>
      </Card>

      {/* Event Details Modal/Popup (Simple version) */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedEvent(null)}>
          <Card className="max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getEventIcon(selectedEvent.type)}
                Event Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge variant="outline" className="mb-2">
                  {selectedEvent.type.toUpperCase()}
                </Badge>
                <h3 className="font-semibold text-lg">{selectedEvent.title}</h3>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-medium">
                  {selectedEvent.date ? new Date(selectedEvent.date).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Date not available'}
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Event Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm">Notices</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm">Demands</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">ITR Filings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm">Audits</span>
            </div>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
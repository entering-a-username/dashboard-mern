// import React, { useState } from 'react';
// import FullCalendar, { formatDate } from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import listPlugin from "@fullcalendar/list";
// import interactionPlugin from "@fullcalendar/interaction";
// import {Box, List, ListItem, ListItemText, Typography} from "@mui/material";

// export default function Calendar() {
//     const [currentEvents, setCurrentEvents] = useState([]);

//     function handleDateClick(selected) {
//         const title = prompt("Please enter a new title for your event");
//         const calendarAPI = selected.view.calendar;
//         calendarAPI.unselect();

//         if (title) {
//             calendarAPI.addEvent({
//                 id: `${selected.dateStr}-${title}`,
//                 title,
//                 start: selected.startStr,
//                 end: selected.endStr,
//                 allDay: selected.allDay,
//             })
//         }
//     }

//     function handleEventClick(selected) {
//         if (window.confirm(`Are you sure you want to delete the event? '${selected.event.title}'`)) {
//             selected.event.remove();
//         }

//         return (
//             <Box m="20px">
//             <h1>Calendar</h1>
//             <h2>Full Calendar Interactive page</h2>

//             <Box display="flex" justifyContent="space-between">
//                 <Box flex="1 1 20%" p="15px" borderRadius="4px">
//                     <Typography>Events</Typography>
//                     <List>
//                         {currentEvents.map((event) => (
//                             <ListItem key={event.id} >
//                                 <ListItemText primary={event.title}
//                                 secondary={
//                                     <Typography>
//                                         {formatDate(event.start,
//                                         {
//                                             year: "numeric",
//                                             month: "short",
//                                             day: "numeric",
//                                         })}
//                                     </Typography>
//                                 }>

//                                 </ListItemText>
//                             </ListItem>
//                         ))}
//                     </List>
//                 </Box>
//             </Box>
//         </Box>
//         )
//     }
//   return (
//     <div>Calendar</div>
//   )
// }
 
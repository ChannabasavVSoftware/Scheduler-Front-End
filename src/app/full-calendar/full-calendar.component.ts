// import { Component } from '@angular/core';
// import {  signal, ChangeDetectorRef } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';
// import { FullCalendarModule } from '@fullcalendar/angular';
// import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
// import interactionPlugin from '@fullcalendar/interaction';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
// // import { INITIAL_EVENTS, createEventId } from './event-utlis';
// import { EventInput } from '@fullcalendar/core';
// import { CommonService } from '../services/common.service';
// import { CommunicationService } from '../services/communication.service';



































// @Component({
//   selector: 'app-full-calendar',
//   templateUrl: './full-calendar.component.html',
//   styleUrl: './full-calendar.component.less'
// })

// export class FullCalendarComponent {

//   constructor(private changeDetector: ChangeDetectorRef,private _CommonService:CommonService,private _CommunicationService:CommunicationService) {



//   }

//   ngOnInit(){
//     this.PatientId = this._CommonService.SelectedPatient;

//     this._CommunicationService.GetDoctorAppointmentHistory("1").subscribe({
//       next:(response:any)=>{
//         this.AppointmentHistory=response;
//         this.AddEvent()
//         console.log(this.INITIAL_EVENTS);

//       },error:(error:any)=>{
//         console.log("Error Occured : "+error);
//       }
//     })

//   }

//   AppointmentHistory:any;
//   PatientId:any;

//   eventGuid = 0;
//   TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today


//   INITIAL_EVENTS: EventInput[]
//    = [
//     {
//       id: this.createEventId(),
//       title: 'All-day event',
//       start: this.TODAY_STR
//     },
//     {
//       id: this.createEventId(),
//       title: 'Timed event',
//       start: this.TODAY_STR + 'T00:00:00',
//       end: this.TODAY_STR + 'T03:00:00'
//     },
//     {
//       id: this.createEventId(),
//       title: 'Timed event',
//       start: this.TODAY_STR + 'T12:00:00',
//       end: this.TODAY_STR + 'T15:00:00'
//     },
//     {
//       id:this.createEventId(),
//       title:'Santosh Appointment',
//       start: this.TODAY_STR + 'T12:00:00',
//      end: this.TODAY_STR + 'T18:00:00'
//     }

//   ];
//   calendarVisible = signal(true);
//   calendarOptions = signal<CalendarOptions>({
//     plugins: [
//       interactionPlugin,
//       dayGridPlugin,
//       timeGridPlugin,
//       listPlugin,
//     ],
//     headerToolbar: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
//     },
//     initialView: 'dayGridMonth',
//     initialEvents: this.INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
//     weekends: true,
//     editable: true,
//     selectable: true,
//     selectMirror: true,
//     dayMaxEvents: true,
//     select: this.handleDateSelect.bind(this),
//     eventClick: this.handleEventClick.bind(this),
//     eventsSet: this.handleEvents.bind(this),
//     // events:this.currentEvents

//     /* you can update a remote database when these fire:
//     eventAdd:
//     eventChange:
//     eventRemove:
//     */
//   });


//   currentEvents = signal<EventApi[]>([]);
//   AddEvent(){

//     let e:EventApi[];
//     this.AppointmentHistory.forEach(a => {

//       let AppointmentDateTime = new Date(a.appointmentDate);

//       const [hours,minutes,seconds] = a.appointmentTime.split(':');

//       AppointmentDateTime.setHours(parseInt(hours,10));
//       AppointmentDateTime.setMinutes(parseInt(minutes,10));
//       AppointmentDateTime.setSeconds(parseInt(seconds,10));

//       let EndTime = new Date (AppointmentDateTime);
//       EndTime.setMinutes(EndTime.getMinutes()+30);

//       this.INITIAL_EVENTS.push(
//         {
//           id:this.createEventId(),
//           title:'Appointment',
//           start:AppointmentDateTime.toISOString(),
//           end:EndTime.toISOString(),

//         } 
//       );
//     });
//     this.handleEvents(e);
//   }

//   createEventId() {
//     return String(this.eventGuid++);
//   }
//   handleCalendarToggle() {
//     this.calendarVisible.update((bool) => !bool);
//   }

//   handleWeekendsToggle() {
//     this.calendarOptions.update((options) => ({
//       ...options,
//       weekends: !options.weekends,
//     }));
//   }

//   handleDateSelect(selectInfo: DateSelectArg) {
//     const title = prompt('Please enter a new title for your event');
//     const calendarApi = selectInfo.view.calendar;

//     calendarApi.unselect(); // clear date selection

//     if (title) {
//       calendarApi.addEvent({
//         id: this.createEventId(),
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay
//       });
//     }
//   }

//   handleEventClick(clickInfo: EventClickArg) {
//     if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//       clickInfo.event.remove();
//     }
//   }

//   handleEvents(events: EventApi[]) {
//     this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
//     this.currentEvents.set(events)
//   }




// }




import { Component } from '@angular/core';
import { signal, ChangeDetectorRef } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CommonService } from '../services/common.service';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.less']
})
export class FullCalendarComponent {
  eventGuid = 0;
  AppointmentHistory: any = [];
  currentEvents = signal<EventInput[]>([]);

  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    events: this.fetchEvents.bind(this), // Bind fetchEvents method
    weekends: true,
    editable: false,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
  });

  constructor(
    private changeDetector: ChangeDetectorRef,
    private _CommonService: CommonService,
    private _CommunicationService: CommunicationService
  ) {

  }

  ngOnInit() {
  }

  fetchEvents(fetchInfo: any, successCallback: Function) {

    let additionalEvents;
    this._CommunicationService.GetDoctorAppointmentHistory("1").subscribe({
      next: (response: any) => {

        this.AppointmentHistory = response;
        additionalEvents = this.addEvents(); // Call to add events from the appointment history
        successCallback(additionalEvents)

      },
      error: (error: any) => {
        console.log("Error Occurred: " + error);
      }
    });

  }

  addEvents() {
    const additionalEvents: EventInput[] = this.AppointmentHistory.map(a => {
      let appointmentDateTime = new Date(a.appointmentDate);
      const [hours, minutes] = a.appointmentTime.split(':');
      appointmentDateTime.setHours(parseInt(hours, 10));
      appointmentDateTime.setMinutes(parseInt(minutes, 10));

      let endTime = new Date(appointmentDateTime);
      endTime.setMinutes(endTime.getMinutes() + 30);

      return {
        id: this.createEventId(),
        title: 'Appointment',
        start: appointmentDateTime,
        end: endTime,
        allDay: false,
        
      };
    });

    // Update currentEvents with additional events
    // this.currentEvents.set(additionalEvents);

    return additionalEvents;

    
  }

  createEventId() {
    return String(this.eventGuid++);
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // Clear date selection

    if (title) {
      const newEvent: EventInput = {
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };

      // Update events with the new event
      const updatedEvents = [...this.currentEvents(), newEvent];
      this.currentEvents.set(updatedEvents);
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }
}

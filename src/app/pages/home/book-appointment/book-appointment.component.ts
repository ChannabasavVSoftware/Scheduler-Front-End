import { Component } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.less'
})

export class BookAppointmentComponent {

  constructor(private _CS: CommunicationService, private datePipe: DatePipe, public _CommonService: CommonService, private notification: NzNotificationService) {

    
  }
  
  ngOnInit() {
    
    this._CommonService.DoctorDetails$.subscribe(value=>{
      this.DoctorDetails = value;
    })
    
    this._CommonService.PatientDetails$.subscribe(value=>{
      this.PatientDetails = value;
    })
    
    this._CommonService.SelectedPatient$.subscribe(value=>{
      this.SelectedPatient=value;
      this.PatientName=value.name?value.name:null;
      
    })
    
    this.FetchUserDetails();
    
  }

  showNotification(title: string, message: string): void {
    this.notification
      .blank(
        title,
        message
      )
      .onClick.subscribe(() => {
        console.log('notification clicked!');
      });
  }

  clearInput() {
    this.DoctorName = null;
    this.selectedDate = null;
    this.SelectedSlotId = null;
    this.Slots=null;
  }

  FetchUserDetails() {

    this._CS.GetUserDetails(localStorage.getItem('username')).subscribe({
      next: (response: any) => {
        
        
        const PatientId = localStorage.getItem('SelectedPatient');
        // // this._CommonService.PatientDetails = response.patient;
        // // this._CommonService.DoctorDetails = response.doctor;
        this._CommonService.SelectedPatient = response.patient.find(p => p.patientId == PatientId)
        
        // this.GetPatientAppointmentHistory();
        
        // this.PatientDetails = this._CommonService.PatientDetails;
        // this.DoctorDetails = this._CommonService.DoctorDetails;
        // this.PatientName = this._CommonService.SelectedPatient.name;
        
        this._CommonService.PatientDetailsSubject.next(response.patient);
        this._CommonService.DoctorDetailsSubject.next(response.doctor);
        this._CommonService.SelectedPatientSubject.next(response.patient.find(p=>p.patientId == PatientId))
        
        console.log("Patient Details ",this.PatientDetails);
        

      }
    })
  }

  PatientName: string;
  DoctorId: string;
  DoctorName: any;
  selectedDate: any = null;
  SelectedSlot: any;
  SelectedSlotId: any;
  AppointmentTime: any;
  SelectedPatient : any;

  UserDetailsResponse: any;
  PatientDetails: any;
  DoctorDetails: any;
  Slots: any;

  footerRender = (): string => '';

  // DisabledDate = (current: Date): boolean => {
  //   return current < new Date()
  // }
  DisabledDate = (current: Date): boolean => { 
    return current < new Date(new Date().setHours(0, 0, 0, 0));
}

  GetSlots() {
    this.selectedDate = this.datePipe.transform(this.selectedDate, 'fullDate');
    const Doctor = this.DoctorDetails.find(d => d.name == this.DoctorName);

    this._CS.GetDoctorSlots(this.selectedDate, Doctor.doctorId).subscribe({
      next: (response: any) => {
        this.Slots = response;
      },
      error: (error) => {

        console.log(error.error.status);
        if (error.error.status == "Leave") {
          this.showNotification("Doctor is on Leave...", "")
        } else if (error.error.status == "NotScheduled") {
          this.showNotification("Doctor is not scheduled on the selected date...", "Please select another date.")
        }
        this.clearInput();
      }
    })
  }

  BookAppointment(modalVariableName: string): void {

    this.selectedDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');

    const doctor = this.DoctorDetails.find(d => d.name == this.DoctorName);
    const patientId = this._CommonService.SelectedPatient.patientId;
    this.AppointmentTime = this.SelectedSlotId.split(' ')[2];

    const Appointment = {
      doctorId: doctor.doctorId,
      patientId: patientId,
      appointmentDate: this.selectedDate,
      appointmentTime: this.AppointmentTime
    }

    this._CS.BookAppointment(Appointment).subscribe({
      next: (response: any) => {
        console.log(response);
        this.showNotification("Appointment booked sucessfully", `Your appointment ID is ${response.appointmentId}.`)
        this.GetSlots();
        this.clearInput(); 
      },
      error: (error) => {
        console.log(error);
        this.showNotification("Appointment booking failed...",error.error)


      }
    });
  }

  onIsVisibleChange(modalVariableName: string, isVisible: boolean): void {
    this[modalVariableName] = isVisible;
  }

  SelectedDoctor(Doctor: any) {
    this.DoctorId = Doctor.doctorId;
    this.DoctorName = Doctor.name;
  }

  AddSlot(Slot) {
    if(Slot.status!="Unavailable"){
      this.SelectedSlot = Slot;
      this.AppointmentTime = Slot.startTime;
      this.SelectedSlotId = `${Slot.slotId} - ${Slot.startTime}`;
    }
  }


  private convertToISODate(dateString: string): string {

    const [dayOfWeek, monthDayYear] = dateString.split(', ');
    const [month, day, year] = monthDayYear.split(' ');

    const monthIndex = new Date(Date.parse(month + " 1, 2021")).getMonth();
    const date = new Date(Number(year), monthIndex, Number(day));

    return date.toISOString();
  }

}


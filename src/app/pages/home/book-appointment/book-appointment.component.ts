import { Component } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
interface Appointment{
  PatientId:string;
  DoctorId:string;
  AppointmentDate:Date;
  AppointmentTime:string;
}

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.less'
})

export class BookAppointmentComponent {

  constructor(private _CS:CommunicationService,private datePipe:DatePipe){
    
    
  }
  
  UserAppointment:Appointment;
  PatientPhoneNumber:number;
  PatientName:string;
  DoctorId:string;
  DoctorName:any;
  selectedDate:any=null;
  SelectedSlot:any;
  SelectedSlotId:any;
  AppointmentTime:any;
  
  AppointmentID:string="APP123";
  
  ShowSlots:boolean=true;
  isModalVisible = false;
  isModalTestVisible = false;
  
  UserDetailsResponse:any;
  PatientDetails:any;
  DoctorDetails:any;
  Slots:any;

  footerRender = (): string => '';
  
GetPatientDetails(){
  this._CS.GetUserDetails(this.PatientPhoneNumber).subscribe({
    next: (response:any) => {
      this.UserDetailsResponse = response;
      console.log('User Details:', this.UserDetailsResponse);
      this.PatientDetails=response.patient;
      this.DoctorDetails=response.doctor;
      console.log("Patient details :"+this.PatientDetails);
      console.log("Patient details :"+this.DoctorDetails);
      
    },
    error: (error) => {
      console.error('Error fetching user details:', error);
    }
  });
}

GetSlots(){
  this.selectedDate = this.datePipe.transform(this.selectedDate, 'fullDate');
    
  this._CS.GetDoctorSlots(this.selectedDate,this.DoctorId).subscribe({
    next:(response:any)=>{
      this.Slots=response;
    },
    error:(error)=>{

    }
  })
}


  openModal(modalVariableName:string): void {
    
    const GetPatient=  this.PatientDetails.find(p=>p.name==this.PatientName)

    this.selectedDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
    
    const Appointment = {
      doctorId:this.DoctorId,
      patientId:GetPatient.patientId,
      appointmentDate:this.selectedDate,
      appointmentTime:this.AppointmentTime
    }
    
    this._CS.BookAppointment(Appointment).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.AppointmentID=response.appointmentId;
      },
      error: (error)=>{
        console.log(error);
        
      }
    });
    this[modalVariableName] = true;
  }
  
  onIsVisibleChange(modalVariableName:string,isVisible: boolean): void {
    this[modalVariableName] = isVisible;
  }

  SelectedDoctor(Doctor:any){
    this.DoctorId=Doctor.doctorId;
    this.DoctorName=Doctor.name;
  }

  AddSlot(Slot){
    this.SelectedSlot=Slot;
    this.SelectedSlotId=Slot.slotId;
    this.AppointmentTime=Slot.startTime;
  }


  private convertToISODate(dateString: string): string {
    // Split the date string and extract the necessary parts
    const [dayOfWeek, monthDayYear] = dateString.split(', ');
    const [month, day, year] = monthDayYear.split(' ');

    // Create a new Date object from the extracted parts
    const monthIndex = new Date(Date.parse(month + " 1, 2021")).getMonth(); // Get month index
    const date = new Date(Number(year), monthIndex, Number(day));

    // Convert to ISO string
    return date.toISOString();
  }
















  DummyArray:any=[
    {
      SlotId:"S1",
      Timing:"9:00-9:30"
    },
    {
      SlotId :"S2",
      Timing :"9:30-10:00"

    }
  ]

  Patients:any=[
    {
      PatientName:"Patient One"
    }
    ,
    {
      PatientName:"Patient Two"
    }
  ]
    
  DoctorList :any=[
    {
      DoctorId:1,
      DoctorName:"Dr.AnandKumar Sajjan",
      DoctorSpecialization:"Maxofacial Surgeon"
    },
    {
      DoctorId: 1,
      DoctorName: "Dr. Anil Sharma",
      DoctorSpecialization: "Cardiologist"
    },
    {
      DoctorId: 2,
      DoctorName: "Dr. Priya Patel",
      DoctorSpecialization: "Gynecologist"
    },
    {
      DoctorId: 3,
      DoctorName: "Dr. Rajesh Kumar",
      DoctorSpecialization: "Orthopedic Surgeon"
    },
    {
      DoctorId: 4,
      DoctorName: "Dr. Neha Singh",
      DoctorSpecialization: "Pediatrician"
    },
    {
      DoctorId: 5,
      DoctorName: "Dr. Arvind Gupta",
      DoctorSpecialization: "Dermatologist"
    },
    {
      DoctorId: 6,
      DoctorName: "Dr. Anushka Reddy",
      DoctorSpecialization: "Ophthalmologist"
    },
    {
      DoctorId: 7,
      DoctorName: "Dr. Vikram Sharma",
      DoctorSpecialization: "Neurologist"
    },
    {
      DoctorId: 8,
      DoctorName: "Dr. Aarti Desai",
      DoctorSpecialization: "Endocrinologist"
    },
    {
      DoctorId: 9,
      DoctorName: "Dr. Ravi Menon",
      DoctorSpecialization: "Urologist"
    },
    {
      DoctorId: 10,
      DoctorName: "Dr. Suman Sharma",
      DoctorSpecialization: "General Physician"
    }
  ]  
}


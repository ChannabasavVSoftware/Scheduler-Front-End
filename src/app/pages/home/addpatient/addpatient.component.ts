import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommunicationService } from 'src/app/services/communication.service';
import { DatePipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrl: './addpatient.component.less'
})
export class AddpatientComponent {

  constructor(private _CS: CommunicationService, private datePipe: DatePipe, private message: NzMessageService) { }

  PatientID: any;
  Name: string;
  DOB: any;
  ContactNumber: string;
  Email: string;
  selectedGender: number;

  addPatient(): void {
    this.DOB = this.datePipe.transform(this.DOB, 'yyyy-MM-dd');

    const patient = {
      patientId: 0,
      name: this.Name,
      dateOfBirth: this.DOB,
      gender: Number(this.selectedGender),
      contactNumber: this.ContactNumber,
      email: this.Email
    }

    this._CS.AddPatient(patient).subscribe({
      next: (response: any) => {
        console.log(response);
        this.PatientID = response.patientId;
        this.resetForm();
        this.createMessage('success','Patient Added Sucessfully');
        // this.AddPatirntSuccessMessage();
      },
      error: (error) => {
        console.log(error.error);
        
        this.createMessage('error', error.error)
        // this.AddPatirntErrorMessage();
      }

    });
  }

  resetForm(): void {
    this.Name = '';
    this.DOB = null;
    this.ContactNumber = null;
    this.Email = null;
    this.selectedGender = null;
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, `${msg}`,{
      nzDuration: 10000
    });
  }

}

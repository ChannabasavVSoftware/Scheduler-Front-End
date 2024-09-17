import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommunicationService } from 'src/app/services/communication.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrl: './addpatient.component.less'
})
export class AddpatientComponent {

  constructor(private _CS: CommunicationService, private datePipe: DatePipe) { }

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
      },
      error: (error) => {
        console.log(error);

      }

    });
  }
  // constructor(private notification: NzNotificationService) {

  // }


  // createBasicNotification(): void {
  //   this.notification
  //     .blank(
  //       'Notification Title',
  //       'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
  //     )
  //     .onClick.subscribe(() => {
  //       console.log('notification clicked!');
  //     });
  // }  


}

import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menuitems: any = [
    {
      name: "home",
      id: 101,
      index: 0,
      nzicon: "home",
      DisplayName: "Home",
      isVisible: true,
      expandStatus: false,
    },
    {
      name: "bookappointment",
      id: 102,
      index: 1,
      nzicon: "dashboard",
      DisplayName: "Book Appointment",
      isVisible: true,
      expandStatus: false,
    },
    {
      name: 'addpatient',
      id: 104,
      index: 2,
      nzicon: "area-chart",
      DisplayName: "Add Patient",
      isVisible: true,
      expandStatus: false,
    },  
    {
      name: 'appointmenthistory',
      id: 103,
      index: 2,
      nzicon: "area-chart",
      DisplayName: "Appointment History",
      isVisible: true,
      expandStatus: false,
    },
    {
      name: 'schedules',
      id: 106,
      index: 2,
      nzicon: "area-chart",
      DisplayName: "Schedules",
      isVisible: true,
      expandStatus: false,
    },
    {
      name: 'scheduledappointment',
      id: 105,
      index: 2,
      nzicon: "area-chart",
      DisplayName: "Scheduled Appointment",
      isVisible: true,
      expandStatus: false,
    },
    {
      name: 'leaves',
      id: 107,
      index: 2,
      nzicon: "area-chart",
      DisplayName: "Leaves",
      isVisible: true,
      expandStatus: false,
    },


    
  ]

  constructor(
    public _commonService: CommonService
  ){}

  public openHandler(index: number, openStatus: boolean = false): void {
    if(openStatus){
      this.menuitems[index].expandStatus = true;
    }
    if(index == 2 && this._commonService.isSidebarCollapsed){
      this.menuitems[index].expandStatus = false;
    }


    this.menuitems.forEach(menu => {
      if (menu.index != index) {
        this.menuitems[menu.index].expandStatus = false;
      }
    });
  }
 
}

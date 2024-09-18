import { DatePipe, formatDate, Time } from '@angular/common';
import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.less'
})

export class LeavesComponent {

  listOfLeave: any[] = [];
  listOfHolidays: any[] = [];

  leaveTypeFilters = [
    { text: 'Full Day', value: 0 },
    { text: 'Partial Day', value: 1 }
  ];

  takenTimes: { date: Date, startTimes: number[], endTimes: number[] }[] = [];

  createBasicMessage(): void {
    this.message.success('Leave added Successfully', {
      nzDuration: 5000
    });
  }

  constructor(private _CS: CommunicationService, private datePipe: DatePipe, private message: NzMessageService) {
    this.updateTable();
    this.GetListOfHolidays()
  }


  dcotorId: number = 1;  // for now it is hardcoded later we have to align with login in docterid.

  startDate: Date;
  endDate: Date;
  startTime: string = "0000-00-00T00:00:00";
  endTime: string = "0000-00-00T00:00:00";
  leaveType: number;
  description: string;
  dateRange: Date[] = [];
  partialDate: Date;

  time: Date | null = null;
  size: 'large' | 'small' | 'default' = 'default';

  addLeave(event: Event): void {
    event.preventDefault();

    const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    const formattedStartTime = this.datePipe.transform(this.startTime, 'HH:mm:ss');
    const formattedEndTime = this.datePipe.transform(this.endTime, 'HH:mm:ss');

    const leave = {
      leaveId: 0,
      doctorId: 1,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      leaveType: Number(this.leaveType),
      description: this.description
    }

    this._CS.AddLeave(leave).subscribe({
      next: (response: any) => {
        this.resetForm();
        this.updateTable();
        this.createBasicMessage();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  resetForm(): void {
    this.leaveType = null;
    this.dateRange = null;
    this.partialDate = null;
    this.startTime = null;
    this.endTime = null;
    this.description = '';
  }

  updateTable(): void {
    this._CS.GetDoctorLeaveById(this.dcotorId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.listOfLeave = response.sort((a: any, b: any) => {
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });
        // this.populateTakenTimes();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  GetListOfHolidays(): void {
    this._CS.GetHolidays().subscribe({
      next: (response: any) => {
        this.listOfHolidays = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterByType = (list: number[], item: any): boolean => {
    return list.length ? list.includes(item.leaveType) : true;
  };

  onLeaveTypeChange(value: number): void {
    this.leaveType = value;
  }

  // disableLeaveDates = (current: Date): boolean => {
  //   const isHoliday = this.checkHoliday(current);
  //   const isLeave = this.listOfLeave.some(leave => {
  //     const startDate = new Date(leave.startDate);
  //     const endDate = new Date(leave.endDate);
  //     return current >= startDate && current <= endDate;
  //   });

  //   return isLeave || isHoliday; 
  // };


  // Disable dates that overlap with leaves or holidays
  disableLeaveDates = (current: Date): boolean => {
    const isHoliday = this.checkHoliday(current);

    // Check if the leave is a full-day leave
    const isFullDayLeave = this.listOfLeave.some(leave => {
      const startDate = new Date(leave.startDate);
      const endDate = new Date(leave.endDate);
      return current >= startDate && current <= endDate && leave.leaveType == 0;
    });

    const isPartialDayLeave = this.listOfLeave.some(leave => {
      const startDate = new Date(leave.startDate);
      const endDate = new Date(leave.endDate);
      return current >= startDate && current <= endDate && leave.leaveType == 0 && leave.leaveType != 1;
    });
    console.log("eleave type : " + this.leaveType)
    console.log("isFullDayLeave : " + isFullDayLeave);
    console.log("isPartialDayLeave : " + isPartialDayLeave);
    return (this.leaveType == 0 ? isFullDayLeave : isPartialDayLeave) || isHoliday; // Disable only if it's a full-day leave or holiday
  };



  // Disable specific time slots for partial day leaves (leaveType === 1)
  disableTimeSlots = (): { nzDisabledHours: () => number[], nzDisabledMinutes: (hour: number) => number[] } => {
    if (!this.startDate) return { nzDisabledHours: () => [], nzDisabledMinutes: () => [] };

    const selectedDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');

    // Find partial day leaves for the selected date
    const partialLeaveForSelectedDate = this.listOfLeave.find(leave =>
      this.datePipe.transform(leave.startDate, 'yyyy-MM-dd') === selectedDate && leave.leaveType == 1
    );

    if (partialLeaveForSelectedDate) {
      const startTime = new Date(partialLeaveForSelectedDate.startTime);
      const endTime = new Date(partialLeaveForSelectedDate.endTime);

      return {
        nzDisabledHours: () => [startTime.getHours()],
        nzDisabledMinutes: (hour: number) => hour === startTime.getHours() ? this.getDisabledMinutes(startTime, endTime) : []
      };
    }

    return { nzDisabledHours: () => [], nzDisabledMinutes: () => [] };
  };

  // Get disabled minutes based on leave start and end times
  getDisabledMinutes = (startTime: Date, endTime: Date): number[] => {
    const minutes: number[] = [];
    for (let i = startTime.getMinutes(); i <= endTime.getMinutes(); i++) {
      minutes.push(i);
    }
    return minutes;
  };





  checkHoliday = (current: Date): boolean => {
    return this.listOfHolidays.some(holiday => {
      const holidayDate = new Date(holiday.holidayDate);
      return current.getTime() === holidayDate.getTime();
    });
  };

  onDateChange(result: Date | Date[]): void {
    if (this.leaveType == 0) {
      if (Array.isArray(result) && result.length === 2) {
        this.startDate = result[0];
        this.endDate = result[1];
      }
    } else if (this.leaveType == 1) {
      if (result instanceof Date) {
        this.startDate = result;
        this.endDate = result;
      }
    }
  }



  // populateTakenTimes(): void {
  //   // Here you would populate `takenTimes` based on the leave data from the response.
  //   this.listOfLeave.forEach(leave => {
  //     const leaveDate = new Date(leave.startDate);
  //     this.takenTimes.push({
  //       date: leaveDate,
  //       startTimes: [leave.startTime],  // convert startTime and endTime to numbers or proper format
  //       endTimes: [leave.endTime]
  //     });
  //   });
  // }

  // // Disable times for the selected date
  // disableTime = (): { nzDisabledHours: () => number[], nzDisabledMinutes: (hour: number) => number[] } => {
  //   if (!this.startDate) return { nzDisabledHours: () => [], nzDisabledMinutes: () => [] };

  //   const selectedDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
  //   const takenTimeForSelectedDate = this.takenTimes.find(t => this.datePipe.transform(t.date, 'yyyy-MM-dd') === selectedDate);

  //   if (takenTimeForSelectedDate) {
  //     return {
  //       nzDisabledHours: () => takenTimeForSelectedDate.startTimes.map(time => new Date(time).getHours()),
  //       nzDisabledMinutes: (hour: number) => takenTimeForSelectedDate.startTimes.filter(time => new Date(time).getHours() === hour).map(time => new Date(time).getMinutes())
  //     };
  //   }

  //   return { nzDisabledHours: () => [], nzDisabledMinutes: () => [] };
  // };


}

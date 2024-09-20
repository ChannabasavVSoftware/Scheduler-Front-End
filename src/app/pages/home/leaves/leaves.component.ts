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
      // console.log("isfulldayleave (true/false): " + (current >= startDate && current <= endDate && leave.leaveType == 0))
      return current >= startDate && current <= endDate && leave.leaveType == 0;
    });

    return isFullDayLeave || isHoliday; // Disable only if it's a full-day leave or holiday
  };



// Disable specific time slots for partial day leaves (leaveType === 1)
disableTimeSlots = (): { nzDisabledHours: () => number[], nzDisabledMinutes: (hour: number) => number[] } => {
  if (!this.partialDate) return { nzDisabledHours: () => [], nzDisabledMinutes: () => [] };

  // Format the selected date to compare it with leave data
  const selectedDate = this.datePipe.transform(this.partialDate, 'yyyy-MM-dd');
  
  // Find partial day leaves for the selected date
  const partialLeave = this.listOfLeave.find(leave => 
    this.datePipe.transform(leave.startDate, 'yyyy-MM-dd') === selectedDate && leave.leaveType == 1
  );

  if (partialLeave) {
    // Parse the start and end times of the partial leave
    const [startHour, startMinute] = partialLeave.startTime.split(':').map(Number);
    const [endHour, endMinute] = partialLeave.endTime.split(':').map(Number);

    return {
      nzDisabledHours: () => {
        const disabledHours: number[] = [];
        for (let i = startHour; i <= endHour; i++) {
          disabledHours.push(i); // Disable the hours in the leave range
        }
        return disabledHours;
      },
      nzDisabledMinutes: (hour: number) => {
        if (hour === startHour) {
          // Disable minutes within the start hour range
          const minutes: number[] = [];
          for (let i = startMinute; i < 60; i++) {
            minutes.push(i);
          }
          return minutes;
        } else if (hour === endHour) {
          // Disable minutes within the end hour range
          const minutes: number[] = [];
          for (let i = 0; i <= endMinute; i++) {
            minutes.push(i);
          }
          return minutes;
        }
        return [];
      }
    };
  }

  return { nzDisabledHours: () => [], nzDisabledMinutes: () => [] }; // No partial leave found
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

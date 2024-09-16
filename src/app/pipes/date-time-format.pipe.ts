import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(inputDate: any): string {
    const dateObj = new Date(inputDate);
    const day = String(dateObj.getDate()).padStart(2, '0');
    // const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    // const year = String(dateObj.getFullYear()).padStart(4, '0'); // Ensure year has 4 digits
    const month = dateObj.toLocaleString('en-us', { month: 'short' });
    const year = String(dateObj.getFullYear() % 100).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    const meridian = dateObj.getHours() < 12 ? 'AM' : 'PM';
    // const formattedTime = `${hours}:${minutes}:${seconds} ${meridian}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const formattedDate = `${day}-${month}-${year} ${formattedTime}`;
    return formattedDate;
  }
}

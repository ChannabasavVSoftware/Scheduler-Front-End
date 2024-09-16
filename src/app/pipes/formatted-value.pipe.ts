import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedValue'
})
export class FormattedValuePipe implements PipeTransform {


    
  transform(well: any, header: any): string {
    if (!well || !header) {
      return '';
    }
    
    const value = well[header.Variable];
    
    if (header.columnKey === 'Locked') {
      return value ? 'Yes' : 'No';
    }
    
    if (header.IsDateFormat) {
      return this.dateFormat(value);
    }
    
    if (header.EnumName) {
      return this.getEnumName(header.EnumName, value);
    }
    
    if (header.FormatType !== undefined && header.FormatType !== null) {
      return typeof value === 'number' ? value.toFixed(header.FormatType) : value;
    }
    
    if (header.columnKey === 'Locked') {
        return well[header.Variable] ? 'Yes' : 'No';
      } 
      
     if (header.Variable === 'Run.RunNumber') {
        return well.Run ? well.Run.RunNumber : '';
      } 
      
      if (header.Variable === 'Run.SerialNumber') {
        return well.Run ? well.Run.SerialNumber : '';
      }

    return value !== undefined && value !== null ? value : '';
  }

  private dateFormat(value: any): string {
    // Implement your date formatting logic here
    return this.formatDate(value);
  }

  formatDate(inputDate: any): string {
    const dateObj = new Date(inputDate);
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = String(dateObj.getFullYear()).padStart(4, '0'); // Ensure year has 4 digits
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    const meridian = dateObj.getHours() < 12 ? 'AM' : 'PM';
    const formattedTime = `${hours}:${minutes}:${seconds} ${meridian}`;
    const formattedDate = `${day}/${month}/${year} ${formattedTime}`;
    return formattedDate;
  }
  
  private getEnumName(enumName: string, value: any): string {
    for (const key in this[enumName]) {
      if (this[enumName].hasOwnProperty(key)) {
        if (this[enumName][key] === value) {
          return key;
        }
      }
    }
    return '';
  }
}

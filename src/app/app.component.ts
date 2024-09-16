import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { authService } from './services/auth.service';
import { CommonService } from './services/common.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'template';
  siderWidth = 180;

  constructor(public _commonService : CommonService){

  }

  ngOnInit(): void {
    
  }
  ngAfterViewInit() {
  }

}

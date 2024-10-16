import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ThemeService } from 'src/app/services/theme.service';
import { authService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { SidebarService } from '../sidebar/sidebar.service';

type ThemeType = 'dark' | 'default' | 'blue' | 'green';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',

})



export class HeaderComponent implements OnInit, OnDestroy {

  public environment = environment;
  selectedTheme: ThemeType = 'blue';
  public serverConnectionStatus: boolean;
  PatientDetails: any;
  SelectedPatient: any;


  themeOptions = [
    { label: 'Dark Theme', value: 'dark' },
    { label: 'Default Theme', value: 'default' },
    { label: 'Blue Theme', value: 'blue' },
    { label: 'Green Theme', value: 'green' },
  ];
  constructor(public _authService: authService,
    public _commonService: CommonService,
    private themeService: ThemeService,
    public sidebarservice: SidebarService) {

    this.PatientDetails = _commonService.PatientDetails;
  }

  ngOnInit(): void {
    this.loadTheme()

    this._commonService.SelectedPatient$.subscribe(value => {
      this.SelectedPatient = value;
    })
    
  }

  updateSidebar() {
    this._commonService.isSidebarCollapsed = !this._commonService.isSidebarCollapsed
  }


  loadTheme() {
    const selectedTheme = this.selectedTheme as ThemeType;
    this.themeService.currentTheme = selectedTheme;
    this.themeService.loadTheme();

    // Store the selected theme in localStorage
    const uiSettings = { theme: selectedTheme };
    localStorage.setItem('uiSettings', JSON.stringify(uiSettings));
  }



  ngOnDestroy() {

  }


  ChangeUser(Patient: any) {
    this._commonService.SelectedPatient = Patient;
  }
}







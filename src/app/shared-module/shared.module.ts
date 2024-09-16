import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { EnumKeyValueListPipe } from '../pipes/enum-key-value.pipe';
import { DateFormatPipe } from '../pipes/date-time-format.pipe';
import { FormattedValuePipe } from '../pipes/formatted-value.pipe';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';

@NgModule({
  declarations: [
    EnumKeyValueListPipe,
    DateFormatPipe,
    FormattedValuePipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgZorroAntdModule,
    // NgxEchartsModule.forRoot({
    //   echarts: () => import('echarts')
    // }),
    FormsModule,
    ReactiveFormsModule,
    // GridstackModule.forRoot(),
    // FilterPipe
  ],
  exports: [
    NgZorroAntdModule,
    NzColorPickerModule ,
    FormsModule,
    ReactiveFormsModule,
    EnumKeyValueListPipe,
    DateFormatPipe,
    FormattedValuePipe,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, DatePipe]
})
export class SharedModule {}

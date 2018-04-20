import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { StaticWeekComponent } from './static-week/static-week.component';
import { StaticDayComponent } from './static-day/static-day.component';
import { AppRoutingModule } from './/app-routing.module';
import { DpDatePickerModule } from 'ng2-date-picker'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CampaignsService } from './campaigns.service';

@NgModule({
  declarations: [
    AppComponent,
    StaticWeekComponent,
    StaticDayComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    AppRoutingModule,
    DpDatePickerModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [CampaignsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePickerComponent } from 'ng2-date-picker';
import { CampaignsService } from '../campaigns.service'
@Component({
  selector: 'app-static-day',
  templateUrl: './static-day.component.html',
  styleUrls: ['./static-day.component.css']
})
export class StaticDayComponent implements OnInit {
  selectedDate = "";
  constructor(private campaignService: CampaignsService) { }

  ngOnInit() {
  }

  @ViewChild('dayPicker') datePicker: DatePickerComponent;
 
  open() {
      this.datePicker.api.open();
  }

  close() {
       this.datePicker.api.close();
  }

  chooseDate(): void {
    this.campaignService.getCampaignDetails()
      .subscribe(data => console.log(data))
    console.log(this.selectedDate)
  }

} 

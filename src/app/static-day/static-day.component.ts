import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePickerComponent } from 'ng2-date-picker';
import { CampaignsService } from '../campaigns.service';
import { CampaignDetail } from '../campaign-detail';
@Component({
  selector: 'app-static-day',
  templateUrl: './static-day.component.html',
  styleUrls: ['./static-day.component.css']
})
export class StaticDayComponent implements OnInit {
  selectedDate = '';
  campaignsDetail = {};
  arrayOfKeys = [];
  constructor(private campaignService: CampaignsService) { }

  ngOnInit() {
    const today = new Date();
    let dateTimeSplit = today.toISOString().slice(0, 10).split('-');
    console.log(dateTimeSplit);
    let url = 'assets/data/sent/' + dateTimeSplit[0] + '-' + dateTimeSplit[1] + '-' + dateTimeSplit[2] + '.json';
    this.campaignService.getCampaignDetails(url)
      .subscribe(data => {
        this.campaignsDetail = data;
        console.log(data);
        this.arrayOfKeys = Object.keys(this.campaignsDetail);
        console.log(this.arrayOfKeys);
      });
  }

  // tslint:disable-next-line:member-ordering
  @ViewChild('dayPicker') datePicker: DatePickerComponent;
  open() {
      this.datePicker.api.open();
  }

  close() {
       this.datePicker.api.close();
  }

  chooseDate(dateTime) {
    if (dateTime === '') {
      return false;
    }
    // tslint:disable-next-line:prefer-const
    let dateTimeSplit = this.selectedDate.split('-');
    console.log(dateTimeSplit);
    let url = 'assets/data/sent/' + dateTimeSplit[2] + '-' + dateTimeSplit[1] + '-' + dateTimeSplit[0] + '.json';
    this.campaignService.getCampaignDetails(url)
      .subscribe(data => {
        this.campaignsDetail = data;
        console.log(data);
        this.arrayOfKeys = Object.keys(this.campaignsDetail);
        console.log(this.arrayOfKeys);
      });
  }
}

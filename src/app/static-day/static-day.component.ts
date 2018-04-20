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
    var todayTimeStamp = +new Date; // Unix timestamp in milliseconds
    var oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
    var diff = todayTimeStamp - oneDayTimeStamp;
    var yesterdayDate = new Date(diff);

    let dateTimeSplit = yesterdayDate.toISOString().slice(0, 10).split('-');
    this.selectedDate = dateTimeSplit[2] + '-' + dateTimeSplit[1] + '-' + dateTimeSplit[0] 
    var yesterdayDateConvert = dateTimeSplit[0] + '-' + dateTimeSplit[1] + '-' + dateTimeSplit[2];
    let url = 'assets/data/sent/' + yesterdayDateConvert + '.json';
    this.campaignService.getCampaignDetails(url)
      .subscribe(data => {
        this.campaignsDetail = data;
        // console.log(data);
        this.arrayOfKeys = Object.keys(this.campaignsDetail);
        // console.log(this.arrayOfKeys);
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
    try {
      var dateTimeSplit = this.selectedDate.split('-');
      // console.log(dateTimeSplit);
      var url = 'assets/data/sent/' + dateTimeSplit[2] + '-' + dateTimeSplit[1] + '-' + dateTimeSplit[0] + '.json';
    } catch (error) {
      console.log(error)
      url = "";
    }
    

    this.campaignService.getCampaignDetails(url)
      .subscribe(data => {
        this.campaignsDetail = data;
        // console.log(data);
        this.arrayOfKeys = Object.keys(this.campaignsDetail);
        // console.log(this.arrayOfKeys);
      });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePickerComponent } from 'ng2-date-picker';
import { CampaignsService } from '../campaigns.service';
import { CampaignDetail } from '../campaign-detail';
import { Http, Response} from '@angular/http';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-static-day',
  templateUrl: './static-day.component.html',
  styleUrls: ['./static-day.component.css']
})
export class StaticDayComponent implements OnInit {
  public selectedDate = '';
  public testDate = '';
  public campaignsDetail: any = [];
  public arrayOfKeys = [];
  public datePickerConfig = {
    'format': "DD-MM-YYYY"
  }
  constructor(private campaignService: CampaignsService, private http: Http, private httpClient: HttpClient) {
    let todayTimeStamp = +new Date; // Unix timestamp in milliseconds
    let oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
    let onDayBefore = todayTimeStamp - oneDayTimeStamp;
    let yesterdayDate = new Date(onDayBefore);
    let dateTimeSplit = yesterdayDate.toISOString().slice(0, 10).split('-');
    let yesterdayDateConvert = dateTimeSplit[0] + '_' + dateTimeSplit[1] + '_' + dateTimeSplit[2];
    this.selectedDate = dateTimeSplit[2] + '-' + dateTimeSplit[1] + '-' + dateTimeSplit[0];
   }

  ngOnInit() {

  }

  @ViewChild('dayPicker') datePicker: DatePickerComponent;
  open() {
      this.datePicker.api.open();
  }

  close() {
       this.datePicker.api.close();
  }

  public chooseDate() {
    // console.log(this.selectedDate);
    let _tmp;
    if (this.selectedDate == undefined){
      url = '';
    } else if  (this.selectedDate["_i"]) {
      _tmp = this.selectedDate["_i"];
    } else {
      _tmp = this.selectedDate;
    }
    try {
      var dateTimeSplit = _tmp.split('-');
      var url = this.campaignService.host + 'api/static-day?day=' + dateTimeSplit[2] + '-' + dateTimeSplit[1] + '-' + dateTimeSplit[0];
    } catch (error) {
      url = this.campaignService.host + 'api/static-day?day=' + "2018-04-23";
    }
    // console.log(url)
    this.httpClient.get(url).subscribe(
      data => {
        this.campaignsDetail = data;
        if (this.campaignsDetail.length <= 1) {
          alert("Không có dữ liệu...");
        }
      },
      error => {
        // this.campaignsDetail = this.campaignService.handleError(error)
        alert("Không có dữ liệu...")
      }
    )
  }
}

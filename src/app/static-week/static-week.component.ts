import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { CampaignsService } from '../campaigns.service'
import { StaticInjector } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-static-week',
  templateUrl: './static-week.component.html',
  styleUrls: ['./static-week.component.css']
})
export class StaticWeekComponent implements OnInit {

  chartOptions = {
		title: {
			display: true,
			text: 'Biểu đồ thể hiện tổng lượng campaign theo từng ngày'
		},
		responsive: true
  }

  chartData = [
		{ 
			data: [0, 0, 0, 0, 0, 0, 0],
			label: "ncid",
			borderColor: "#3e95cd",
			fill: false
		}, { 
			data: [0,0,0,0,0,0,0],
			label: "ndelivered",
			borderColor: "#8e5ea2",
			fill: false
		}, { 
			data: [0,0,0,0,0,0,0],
			label: "ndrop",
			borderColor: "#3cba9f",
			fill: false
		}, { 
			data: [0,0,0,0,0,0,0],
			label: "nclicked",
			borderColor: "#e8c3b9",
			fill: false
		}, { 
			data: [0,0,0,0,0,0,0],
			label: "nopened",
			borderColor: "#c45850",
			fill: false
		}, { 
			data: [0,0,0,0,0,0,0],
			label: "predicted",
			borderColor: "#c4fe50",
			fill: false
		}
  ];

  chartLabels = [];
  public getStaticsWeek(): any {
    let unixToDate = +new Date; // Unix timestamp in milliseconds
    let oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
    unixToDate = unixToDate - oneDayTimeStamp;
    let unixFromDate = unixToDate - 7 * oneDayTimeStamp;
    let fromDate = (new Date(unixFromDate)).toISOString().slice(0, 10)
    let toDate = (new Date(unixToDate)).toISOString().slice(0, 10)
    let url = '/api/static-week?from_date=' + fromDate + "&to_date=" + toDate;
    console.log(url);
    this.httpClient.get(url).subscribe(
      data => {
        console.log(data);
        this.chartLabels = data['chartLabels'];
        this.chartData = data['chartData'];
      },
      error => {
        alert("Loi khong load duoc")
      }
    )
  };


  public drawChart(data) {
    let chartData = []
    for (let i = 0; i < data[0].length; i++ ){
      let data_one = []
      let dic = { 
        data: [],
        label: '',
        fill: false
      }
      for (let j = 1; j < data.length; j++){
        data_one.push(data[j][i])
      }
      dic.data = data_one;
      dic.label = data[i][0]
      chartData.push(dic);
    }
    return chartData;
  }

  public onChartClick(event) {
    console.log(event);
	}

  constructor(private httpClient: HttpClient, private http: Http, private campaignService: CampaignsService) {
    let dateWeekAgo = []
    let todayTimeStamp = +new Date; // Unix timestamp in milliseconds
    let oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
    let oneWeekBefore = [];
    for(let i = 7; i >= 1; i--){
        oneWeekBefore.push(todayTimeStamp - i * oneDayTimeStamp);
    }
    for (let dateUnix of oneWeekBefore) {
      let dateAgo = new Date(dateUnix)
      let dateTimeSplit = dateAgo.toISOString().slice(0, 10)
      dateWeekAgo.push(dateTimeSplit);
    }
    this.chartLabels = dateWeekAgo;
   }

  ngOnInit() {
    this.getStaticsWeek()
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { CampaignsService } from '../campaigns.service'

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
  
  dataWeek = []
  // chartLabels = [];
  getStaticsWeek(): any {
    let url = 'assets/data/statics/static_day_2018_04_12.csv';
    this.http.get(url).subscribe(
      data => {
        this.dataWeek = this.campaignService.extractData(data);
        console.log(this.dataWeek);
        let test = this.drawChart(this.dataWeek)
        console.log(test);
        // this.chartLabels = test[0]
        // this.chartLabels = this.dataWeek[0];


      },
      error => {
        this.dataWeek = this.campaignService.handleError(error)
      }
    )
  };


  drawChart(data) {
    console.log(data[0])
    let dataChart = []
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
      dataChart.push(dic);
    }
    return [data[0], dataChart];
  }

  chartData = [
		{ 
			data: [9, 7, 12, 8, 13, 6, 15, 11, 4],
			label: "ncid",
			borderColor: "#3e95cd",
			fill: false
		}, { 
			 data: [2746,2986,15754,44,3041,24,11432,3232,125],
			label: "ndelivered",
			borderColor: "#8e5ea2",
			fill: false
		}, { 
			data: [45,84,15372,1,752,0,2981,1628,20],
			label: "ndrop",
			borderColor: "#3cba9f",
			fill: false
		}, { 
			data: [37,49,169,8,52,2,131,51,2],
			label: "nclicked",
			borderColor: "#e8c3b9",
			fill: false
		}, { 
			data: [380,606,815,32,713,18,1578,682,51],
			label: "nopened",
			borderColor: "#c45850",
			fill: false
		}, { 
			data: [509,2959,27894,18,1697,24,6298,4619,131],
			label: "predicted",
			borderColor: "#c4fe50",
			fill: false
		}
  ];

  chartLabels = ["02/04/2018","03/04/2018","04/04/2018","05/04/2018","06/04/2018","07/04/2018","09/04/2018","10/04/2018","11/04/2018"];

  onChartClick(event) {
    console.log(event);
	}

  constructor(private httpClient: HttpClient, private http: Http, private campaignService: CampaignsService) { }

  ngOnInit() {
    this.getStaticsWeek();
    var todayTimeStamp = +new Date; // Unix timestamp in milliseconds
    var oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
    var onWeekBefore = [todayTimeStamp - 7 * oneDayTimeStamp, todayTimeStamp - 6 * oneDayTimeStamp, todayTimeStamp - 5 * oneDayTimeStamp, todayTimeStamp - 4 * oneDayTimeStamp ,todayTimeStamp - 3 * oneDayTimeStamp ,todayTimeStamp - 2 * oneDayTimeStamp, todayTimeStamp - oneDayTimeStamp]
  }
}

import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}

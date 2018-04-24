import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CampaignsService {
  host = "http://localhost:3000/";

  constructor(private httpClient: HttpClient, private http: Http) { }
  url_campaigns = 'assets/data/sent/2018-04-17.json';

  getCampaignDetails(url) {
    return this.httpClient.get(url);
  }

  extractData(res: Response) {
    let csvData = res['_body'] || '';
    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];

    for ( let i = 0; i < allTextLines.length; i++) {
        let data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            let tarr = [];
            for ( let j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    return lines;
  }
  

  getSumDay(data) {
    let dataOneDay = this.extractData(data);
    // console.log(dataOneDay.length)
    let sumDay = [dataOneDay.length]
    for (let i = 2; i < dataOneDay[0].length; i++) {
      // console.log("run in i: " + i);
      let sum = 0;
      for (let j = 1; j < dataOneDay.length; j++) {
        // console.log(i, j)
        sum += parseInt(dataOneDay[j][i]);
      }
      sumDay.push(sum);
    }
    return sumDay;
  }

  handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return errMsg;
  }
}

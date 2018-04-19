import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class CampaignsService {

  constructor(private http: HttpClient) { }
  url_campaigns = 'assets/data/sent/2018-04-17.json';

  getCampaignDetails(url) {
    return this.http.get(url);
  }
}

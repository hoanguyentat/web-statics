const express = require('express');
const router = express.Router();
const fs = require('fs');
const Campaign = require('../models/Campaigns');


router.get('/', (req, res) => {
    res.send('app work');
})

router.get('/static-day', (req, res) => {
    var day = req.query.day;
    Campaign.find({'date': day}, function(err, campaigns){
        if (err) throw err;
        res.send(campaigns)
    })
})

router.get('/static-week', (req, res) => {
    fromDate = req.query.from_date;
    toDate = req.query.to_date;
    let data = {};
    let unixTimeFrom = +new Date(fromDate);
    let unixTimeTo = +new Date(toDate);
    let oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
    dateLength = (unixTimeTo - unixTimeFrom) / oneDayTimeStamp;
    dateBefore = []
    for(let i = dateLength; i >= 0; i--){
        let dateAgo = new Date(unixTimeTo - i * oneDayTimeStamp);
        let dateTimeSplit = dateAgo.toISOString().slice(0, 10);
        dateBefore.push(dateTimeSplit);
        data[dateTimeSplit] = {
            predict: 0,
            ndrop: 0,
            ndelivered: 0,
            nopened: 0,
            nclicked: 0,
            cid: 0
        }
    };
    Campaign.find({'date' : {
        '$gte': fromDate,
        '$lte': toDate
        }
    }, function(err, campaigns){
        if (err) throw err;
        for(let i = 0; i < campaigns.length; i++){
            day = campaigns[i]["date"]
            data[day]["predict"] += campaigns[i]["predict"];
            data[day]["ndrop"] += campaigns[i]["ndrop"];
            data[day]["ndelivered"] += campaigns[i]["ndelivered"];
            data[day]["nopened"] += campaigns[i]["nopened"];
            data[day]["nclicked"] += campaigns[i]["nclicked"];
            data[day]["cid"] += 1;
        }
        if (data == null){
            dataJson = {
                'chartLabels': [],
                'chartData': []
            }
        }
        else {
            chartData = drawChartFromDict(data)
            dataJson = {
                'chartLabels': dateBefore,
                'chartData': chartData
            }
        }
        res.send(JSON.stringify(dataJson));
    });
})

function getSumDay(dataOneDay) {
    let sumDay = [dataOneDay.length - 1]
    for (let i = 2; i < dataOneDay[0].length; i++) {
      let sum = 0;
      for (let j = 1; j < dataOneDay.length; j++) {
        sum += parseInt(dataOneDay[j][i]);
      }
      sumDay.push(sum);
    }
    return sumDay;
}

function drawChart(data) {
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
      dic.label = data[0][i]
      chartData.push(dic);
    }
    return chartData;
  }

  function drawChartFromDict(data) {
    console.log(data)
    days = Object.keys(data);
    console.log(days)
    if (days.length == 0){
        return days
    } else {
        attr = Object.keys(data[days[0]])
        let chartData = []
        for (let i = 0; i < attr.length; i++ ){
        let data_one = []
        let dic = { 
            data: [],
            label: attr[i],
            fill: false
        }
        for (let j = 0; j < days.length; j++){
            data_one.push(data[days[j]][attr[i]])
        }
        dic.data = data_one;
        chartData.push(dic);
        }
    }
    return chartData;
  }

module.exports = router;
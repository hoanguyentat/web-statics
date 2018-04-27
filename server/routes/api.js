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
    Campaign.find({'date' : {
        '$gte': fromDate,
        '$lte': toDate
        }
    }, function(err, campaigns){
        if (err) throw err;
        // console.log(campaigns)
        data = {}
        for(let i = 0; i < campaigns.length; i++){
            day = campaigns[i]["date"]
            if(!data.hasOwnProperty(day)){
                data[day] = {
                    predict: 0,
                    ndrop: 0,
                    ndelivered: 0,
                    nopened: 0,
                    nclicked: 0,
                    cid: 0
                }
            }
            data[day]["predict"] += campaigns[i]["predict"];
            data[day]["ndrop"] += campaigns[i]["ndrop"];
            data[day]["ndelivered"] += campaigns[i]["ndelivered"];
            data[day]["nopened"] += campaigns[i]["nopened"];
            data[day]["nclicked"] += campaigns[i]["nclicked"];
            data[day]["cid"] += 1;
        }
        console.log(data)
    });
    let pathData = "./server/data/statics/static_day_";
    let todayTimeStamp = +new Date; // Unix timestamp in milliseconds
    let oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
    let oneWeekBefore = [];
    for(let i = 7; i >= 1; i--){
        oneWeekBefore.push(todayTimeStamp - i * oneDayTimeStamp);
    }
    let dateWeekAgo = []
    let dataTets = [['ncid', 'ndelivered', 'ndrop', 'nclicked', 'nopened', 'predict']]
    for (let dateUnix of oneWeekBefore) {
        let dateAgo = new Date(dateUnix)
        let dateTimeSplit = dateAgo.toISOString().slice(0, 10).split('-');
        var dateConvert = dateTimeSplit[0] + '_' + dateTimeSplit[1] + '_' + dateTimeSplit[2];
        let url = pathData + dateConvert + ".csv";
        let content = fs.readFileSync(url, 'utf8');
        let dataTmp = []
        content = content.trim().split('\n')
        for(let line of content) {
            _tmp = line.trim().split(',');
            // console.log(_tmp);
            dataTmp.push(_tmp);
        }
        dataTets.push(getSumDay(dataTmp))
        dateWeekAgo.push(dateConvert);
    }
    chartData = drawChart(dataTets)
    dataJson = {
        'chartLabels': dateWeekAgo,
        'chartData': chartData
    }
    res.send(JSON.stringify(dataJson));
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
    // console.log(data)
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

module.exports = router;
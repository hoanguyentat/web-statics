const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    res.send('app work');
})

router.post('/static-day', (req, res) => {
    res.send('static day work')
})

router.get('/static-week', (req, res) => {
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
    let sumDay = [dataOneDay.length]
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
    console.log(data)
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
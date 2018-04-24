var mongoose = require('mongoose');

var campaignModel = function() {
    var campaignSchema = mongoose.Schema({
        'date': String,
        "predict": Number,
        "ndrop": Number,
        "ndelivered": Number,
        "nopened": Number,
        "nclicked": Number,
        "ncid": Number
    });
    return mongoose.model('Campaign', campaignSchema);
}

module.exports = new campaignModel();
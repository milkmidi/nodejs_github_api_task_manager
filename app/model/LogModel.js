var mongoose = require('mongoose');
var schema = new mongoose.Schema(
    {
        type: { type: String, require: true, index: true },
        message: {type:String},
        time_created    : { type: Date, default:Date.now },
    }
);
var model = mongoose.model( 'log', schema );
// model.DEFAULT_FIELD = '_id , name';
module.exports = model;

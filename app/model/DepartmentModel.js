var mongoose = require('mongoose');
var schema = new mongoose.Schema(
    {
        _id             : { type: String, unique: true, require: true },
        name            : { type: String, unique: true, require: true },
        time_created    : { type: Date, default:Date.now },
        time_modified   : { type: Date, default:Date.now },
    }
);
schema.statics.findWithRef = function ( options, cb ) {
    return this.find( options, model.DEFAULT_FIELD )
        .then( cb );
};
var model = mongoose.model( 'department', schema );
model.DEFAULT_FIELD = '_id , name';
module.exports = model;

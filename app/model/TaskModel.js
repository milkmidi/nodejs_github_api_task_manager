var mongoose = require('mongoose');
var schema = new mongoose.Schema(
    {
        name            : { type: String, require: true , index:true },  // 專案名稱
        description     : { type: String }, // 專案說明
        user_ref        : { type: mongoose.Schema.Types.ObjectId, ref: 'account' }, // 前端製作人員
        pm_ref          : { type: mongoose.Schema.Types.ObjectId, ref: 'account' }, // PM
        flag            : { type: Number, default: 1 , index:true},   // 1 啟用, 0 是不要出現
        github          : { type: String }, // github 連結
        date_due        : { type: Date }, // 上線日
        date_start      : { type: Date }, // 開工日
        date_end        : { type: Date }, // 結束日
        work_hours      : { type: Number }, // 工時
        complete        : { type: Boolean , default:false,index:true }, // 是否完工
        tags            : [ String ],
        time_created    : { type: Date, default:Date.now },
        time_modified   : { type: Date, default:Date.now },
        user_created    : { type: mongoose.Schema.Types.ObjectId, ref: 'account' }, 
        user_modified   : { type: mongoose.Schema.Types.ObjectId, ref: 'account' }, 
    }
);

schema.statics.findWithRef = function ( options, cb ) {
    return this.find( options, model.DEFAULT_FIELD )
        .populate( model.POPULATE ).then( cb );   
};
schema.statics.findOneWithRef = function ( options, cb ) {
    return this.findOne( options, model.DEFAULT_FIELD )
        .populate( model.POPULATE ).then( cb );
};
var model = mongoose.model( 'task', schema );
model.DEFAULT_FIELD = 'name description user_ref pm_ref github date_due date_start date_end work_hours complete tag time_modified';
model.POPULATE = [
    { path: 'user_ref', select: "name color" },
    { path: 'pm_ref', select: "name" },
];
module.exports = model;
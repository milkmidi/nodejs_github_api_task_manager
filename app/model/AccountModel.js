var mongoose = require( 'mongoose' );
var schema = new mongoose.Schema(
    {
        name            : { type: String, unique: true, require: true , index:true },
        email           : { type: String, unique: true },
        github_id       : { type: Number, unique: true },
        github_name     : { type: String, unique: true },        
        flag            : { type: Number, default: 1},   // 1 啟用, 0 是不要出現
        role            : { type: Number, default: 99 },  // 權限，預設 99 是麻瓜 0 是 admin, 1 是部門成員      
        department_ref  : { type: String, ref: 'department' , index:true },
        color           : { type: String, default:"#000000" },          
        tasks           : [ { type: mongoose.Schema.Types.ObjectId, ref: "task" }],
        time_last_login : { type: Date  , default:Date.now },   // 上次登入時間
        time_created    : { type: Date  , default:Date.now },
        time_modified   : { type: Date  , default:Date.now },
    }
);
schema.statics.findWithRef = function ( options, cb ) {
    return this.find( options, model.DEFAULT_FIELD )
        .populate( { path: 'department_ref', select: "name" }).then( cb );
};
// 'account' 會決定 Collections 的名稱, 但他一定會加 s
var model = mongoose.model( 'account', schema );
model.DEFAULT_FIELD = 'name email github_id github_name department_ref color time_last_login';
module.exports = model;

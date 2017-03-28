# 2016_07_github_api_node_js

## DB Name：interactive-load
>	mongodb 使用 mongoose 來寫  
	`__mongo_start.bat`：本機開發啟動本機的 mongodb  
	`__nodemon.cmd`：nodemon 執行 server/index.js  
	

#### Collections 
1. accounts 人員 `server/model/UserDBModel.js`
	```javascript
	{
        name            : { type: String, unique: true, require: true },
        user_id         : { type: Number, unique: true },
        email           : { type: String, unique: true },
        github_id       : { type: Number, unique: true },
        github_name     : { type: String, unique: true },
        department_ref  : { type: String, ref: 'department' },
        time_created    : { type: Date  , default:Date.now },
        time_modified   : { type: Date  , default:Date.now },
    }	
	```
2. departments 部門 `server/model/DepartmentDBModel.js`
	```javascript
	{
        _id             : { type: String, unique: true, require: true },        
        name            : { type: String, unique: true, require: true },
        time_created    : { type: Date, default:Date.now },
        time_modified   : { type: Date, default:Date.now },
    }
	```
3. tasks 專案 `server/model/TaskDBModel.js`
	```javascript
	 {
        name            : { type: String, require: true },
        description     : { type: String },
        user_ref        : { type: mongoose.Schema.Types.ObjectId, ref: 'account' },
        pm_ref          : { type: mongoose.Schema.Types.ObjectId, ref: 'account' },
        github          : { type: String },
        date_due        : { type: Date },
        date_start      : { type: Date },
        date_end        : { type: Date },
        work_hours      : { type: Number },
        complete        : { type: Boolean , default:false },
        tag             : [ String ],
        time_created    : { type: Date, default:Date.now },
        time_modified   : { type: Date, default:Date.now },
    }
	```

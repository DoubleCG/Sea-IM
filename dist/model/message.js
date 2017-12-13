var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    uid:String,
    mess:Object,
    // "mess" : {
    //     "0" : "0",
    //     "userId" : [
    //         {
    //             "uid" : "z00003",
    //             "to" : Same as the receiver,
    //             "type" : "recent",
    //             "headImg" : "/img/uploads/9a5945c63c48bad2290a1c19c2dc0359",
    //             "name" : "未命名",
    //             "time" : "10.7  11:4",
    //             "content" : "牙时拉你梁非凡",
    //             "introduce" : "这家伙很懒,什么也没有写."
    //         },
    //         ...
    //     ],
    //     ...
    // },

})

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;
const LIB = require('./lib');
const crypto = require('crypto')
const fs = require('fs')
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'dist/public/img/uploads/' });
const User = require('../model/user');
const Unread = require('../model/unread');
const Message = require('../model/message');
const Tmessage = require('../model/tmessage');
const People = require('../model/people');
const Team = require('../model/team');
const Loginlist = require('../model/loginlist');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json();
const router = express.Router();


router.post('/test',urlencodedParser,(req,res)=>{
	var data = JSON.parse(req.body.J_data);
	LIB.check(data,'test');
	var J_data = JSON.stringify({
		answer:'finish to test',
	});
	res.send(J_data);
})


//used by public/js/main-method.js
router.post('/unReadTo0', urlencodedParser, (req, res) => {
	var uid = req.body.uid;
	var to = req.body.to;
	var type = req.body.type;

	//处理用户的未读消息数
	Unread.find({ uid }, null, {limit:1}, (err, u) => {
		var unread;
		//根据不同的类型做出不同的处理
		if(type!=='team'){
			unread = u[0].punRead;
			unread[to] = 0;
			Unread.update({ uid }, {$set:{punRead:unread}}, (err)=>{});
		}else{
			unread = u[0].tunRead;
			unread[to] = 0;
			Unread.update({ uid }, {$set:{tunRead:unread}}, (err)=>{});
		}
	});
});

router.post('/unReadAdd1', urlencodedParser, (req, res) => {
	

});




router.get('/getInfo', (req,res) => {

	var type = req.query.type;

	if(data.type==='team'){
		Team.find({uid:data.uid}, null, {limit:1},(err,team)=>{
			res.send(team[0]);
		});
	}else{
		People.find({uid:data.uid},null,{limit:1},(err,person)=>{
			res.send(person[0]);
		});
	}
})


//used by public/js/main.js ,
router.post('/getMoreinfo',urlencodedParser,(req,res)=>{
	var data = JSON.parse(req.body.J_data);
	LIB.check(data,'getMoreinfo');
	var check_uid = data.check_uid;
	if(data.type==='team'){
		Team.find({uid:check_uid},null,{limit:1},(err,detail)=>{
			es.send(detail[0]);
		});
	}else{
		People.find({uid:check_uid},null,{limit:1},(err,detail)=>{
			res.send(detail[0]);
		});
	}
})


//used by public/js/main.js,
router.get('/getUnreadMess', (req,res) => {
	var data = req.query;
	var unrN = data.unreadNumber;
	var mess = [];

	if(data.type==='team'){
		Tmessage.find(
			{
				uid:data.get_uid
			},
			null,
			{	
				limit:1
			},
			function(err,detail){
				if(err) throw err;
				var m = detail[0].mess;
				while(unrN&&m){
					mess.unshift(m.pop());
					unrN -= 1;
				}
				res.send(mess);
			}
		);
	}else{
		Message.find(
			{
				uid:data.uid
			},
			null,
			{
				limit:1
			},
			function(err,detail){
				if(err) throw err;
				var mf = detail[0].mess[data.get_uid];
				while(unrN&&mf){
					mess.unshift(mf.pop());
					unrN -= 1;
				}
				res.send(mess);
			}
		);
	}
})


module.exports = router;

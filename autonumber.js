var http = require('http');
var util = require('util'); 
var url = 'http://www.kuaidi100.com/autonumber/autoComNum?text=';
var url2 = 'http://www.kuaidi100.com/query?type=%s&postid=%s';
var cheerio = require('cheerio');
var autonumber = function(num,callback){
	url += num;
	http.get(url,function(res){
		var msg  = '';
		res.on('data',function(data){
			msg += data;
		});
		res.on('end',function(){
			console.log('快递公司查询成功');
			callback(msg);
		});
	}).on('err',function(){
		console.log('获取信息出错');
	});
}
exports.autonumber = autonumber;

var query = function(num,callback){
	autonumber(num,function(data){
		var Jdata = JSON.parse(data);
		var re = '';
		var surl = util.format(url2,Jdata.auto[0].comCode,Jdata.num);
		http.get(surl,function(res){
			res.on('data',function(data){
				re += data;
			});
			res.on('end',function(){
				callback(re);
				console.log('查询快递详细成功');
			});
		}).on('err',function(){
			console.log('获取详细信息出错');
		});
	})
}
exports.query = query;
query('882821709626882127',function(data){
	console.log(data);
});

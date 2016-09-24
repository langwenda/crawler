var http = require('http');
var url = 'http://www.goagent.wang';
var cheerio = require('cheerio');
function filterChaperts(html,callback) {
	// body...
	var msg = {
	}
	var All = [];
	var Ajson = {
		status:200,
		data:[]
	}
	var $ = cheerio.load(html);
	var chapters = $('h5');
	chapters.each(function (item) {
		msg.title = $(this).find('strong').text();
		var Amsg =  $(this).nextAll('p');
		var body = [];
		Amsg.each(function (item) {
			body.push($(this).text());
		});
		msg.url = body[0];
		msg.port = body[1];
		msg.paw = body[2];
		msg.type = body[3];
		msg.status = body[4];
		All.push(msg);
	});
	Ajson.data = All;
	console.log('信息抓取完毕！');
	callback(Ajson);
	//retrun Ajson;
	//module.exports = Ajson;
}
///获取极光网的翻墙信息，数据为json
exports.getgoagert = function (callback) {
	http.get(url,function (res) {
	var html = '';

	res.on('data',function (data) {
		html += data.toString();
	});
	res.on('end',function () {
		console.log('极光网数据获取成功，下面开始分析');
		filterChaperts(html,function(data){
			if (data.status == 200) {
			   callback(data);
			}else{
				callback({status:404,msg:'404 not find'});
			}
		});
	})
}).on('err',function(){
	console.log('获取信息出错');
});
}
///回调测试
exports.text = function (text,callback) {
	// body...
	// 
	callback(text);
}
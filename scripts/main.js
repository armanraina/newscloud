function weightCalc(list){
var max = 0;
for (var i=list.length-1;i>=0;i--){
	if (max < list[i][1])
	{
		max = list[i][1]
	}	
}
	return 50/max;
}

function filterList(list,paper){
	var forbid = {
	"jbn":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Fall","Winter","Spring","Summer","Subscribe","back"],
	"nyt":["AM","ET","Comments","Comment","New","PM","time","site"],
	"dmk":[],
	"gdn":["world","after","Edit","amp","home"],
	"bbt":["comments","sign","up"],
	"cbc":["ET","PM","comments","read"]
	};	
	var rule = function(freq){return (forbid[paper].indexOf(freq[0])===-1);}
	
	return list.filter(rule);
}


var news = [];
var data = {};

    var oReq = new XMLHttpRequest(); //New request object
    oReq.onload = function() {
        data = JSON.parse(this.responseText);
        console.log(data);
	news = Object.keys(data);
    };
    oReq.open("get", "get-data.php", false);
    oReq.send();

for (let value of news) {

    var content = data[value];
    content = content.replace(/(\\r\\n|\\n|\\r|\\u|\\t|nbsp|raquo|2019s|2019t|201d|00bb|ndash|rsquo)/gm, ' ');
    var newCanvas = document.createElement('canvas');
    newCanvas.id = value;
    newCanvas.width = 400;
    newCanvas.height = 250;
    document.getElementById("myDiv").appendChild(newCanvas);
// Create an options object for initialization
var options = {
  workerUrl: 'scripts/wordfreq.worker.js' };
// Initialize and run process() function
var wordfreq = WordFreq(options).process(content, function (list) {
  // console.log the list returned in this callback.
	list = filterList(list,value);
	WordCloud(document.getElementById(value), { list: list, weightFactor:weightCalc(list)});
});

}


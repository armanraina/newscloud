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


var nyt ="orem ipsum dolor sit amet, consectetur adipiscing elit. Mauris interdum diam dui. Maecenas id sapien a mi blandit feugiat. Sed cursus, erat a laoreet maximus, tortor urna pretium neque, sed suscipit elit nisl eleifend turpis. Aenean lectus mauris, mollis non posuere nec, rhoncus mattis felis. Curabitur gravida, metus vitae laoreet condimentum, est lacus venenatis massa, non scelerisque leo est sit amet metus. Pellentesque ac sapien ut elit accumsan aliquet. Cras urna felis, mattis sed turpis a, vestibulum hendrerit elit. Nulla dapibus sem ut nisi pulvinar, nec lobortis massa porta. Etiam porta vulputate lacus, quis malesuada augue vestibulum at. Vivamus pellentesque gravida lorem, in convallis diam tristique sed. Etiam pretium sed urna sit amet mollis. Vestibulum varius ipsum ut erat convallis ornare. Pellentesque bibendum auctor augue nec tempus. Nunc nisi odio, mollis vel fringilla vel, volutpat id felis. Vivamus scelerisque lacinia leo, vitae rutrum risus. Maecenas pretium sapien non efficitur dictum.";

var news = [];
var Data ={};

    var oReq = new XMLHttpRequest(); //New request object
    oReq.onload = function() {
        Data = JSON.parse(this.responseText);
        console.log(Data);
	news = Object.keys(Data);
    };
    oReq.open("get", "get-data.php", false);
    oReq.send();

for (let value of news) {

    var content = Data[value];
    content = content.replace(/(\\r\\n|\\n|\\r|\\u|\\t|nbsp|raquo|2019s|2019t|201d|00bb|ndash)/gm, ' ');
    var newCanvas = document.createElement('canvas');
    newCanvas.id = value;
    document.getElementById("myDiv").appendChild(newCanvas);
// Create an options object for initialization
var options = {
  workerUrl: 'scripts/wordfreq.worker.js' };
// Initialize and run process() function
var wordfreq = WordFreq(options).process(content, function (list) {
  // console.log the list returned in this callback.
	WordCloud(document.getElementById(value), { list: list, weightFactor:weightCalc(list)});
});

}


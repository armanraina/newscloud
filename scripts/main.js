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
	"nyt":["AM","ET","Comments","Comment","New","PM","time","site","comment","Site"],
	"dmk":[],
	"gdn":["world","after","Edit","amp","home"],
	"bbt":["comments","sign","up","SIGN"],
	"cbc":["ET","PM","comments","read","AM","video"]
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
    /*
  <!-- Project One -->
        <div class="row">
            <div class="col-md-7">
                <a href="#">
                    <img class="img-responsive" src="http://placehold.it/700x300" alt="">
                </a>
            </div>
            <div class="col-md-5">
                <h3>Project One</h3>
                <h4>Subheading</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate. Labore, voluptates totam at aut nemo deserunt rem magni pariatur quos perspiciatis atque eveniet unde.</p>
                <a class="btn btn-primary" href="#">View Project <span class="glyphicon glyphicon-chevron-right"></span></a>
            </div>
        </div>
        <!-- /.row -->

        <hr> */
	var full = {
	"jbn":"Jacobin",
	"nyt":"New York Times",
	"dmk":"Daily Maverick",
	"gdn":"Gaurdian",
	"bbt":"Breitbart",
	"cbc":"CBC News"
	};	
for (let value of news) {

    var content = data[value];
    content = content.replace(/(\\r\\n|\\n|\\r|\\u|\\t|nbsp|raquo|2019s|2019t|201d|00bb|ndash|rsquo)/gm, ' ');
    var row = document.createElement('div');
    row.className = "row";
    
    var leftcol = document.createElement('div');
    leftcol.className="col-md-7";
    row.appendChild(leftcol);
	    	
    var newCanvas = document.createElement('canvas');
    newCanvas.id = value;
    newCanvas.width = 700;
    newCanvas.height = 300;
    leftcol.appendChild(newCanvas);

    var rightcol = document.createElement('div');
    rightcol.className="col-md-5";
    row.appendChild(rightcol);

    var heading = document.createElement('h3');
    heading.innerText = full[value];
    rightcol.appendChild(heading);

    var endline = document.createElement('hr');    
    document.getElementById("myDiv").appendChild(row);
    document.getElementById("myDiv").appendChild(endline);
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


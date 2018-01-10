var display = document.getElementById('superDiv');

dataBar=new Object();
//(255).toString(16) == 'ff'
//max decimal=16777215
dataBar.name="name";
dataBar.color=(10555255).toString(16);
dataBar.height=1;
dataBar.width=1;
dataBar.xPos=0;
dataBar.yPos=0;
dataBar.ID=0;
dataBar.zIndex=9;
dataBar.htmlList=[];
dataBar.htmlExample = '<div style="z-index:'+dataBar.zIndex+';background-color:#'+dataBar.color+';left:'+dataBar.xPos+'px;top:'+dataBar.yPos+'px;width:'+dataBar.width+'px;height:'+dataBar.height+'px;"; id="dataBar'+dataBar.ID+'" class="dataBar"></div>';	

rawData=new Object();
rawData.dataList=[112073,96046,95809,87280,78630,69966,67579,61584,58685,41027,25942,25900,20814,18560,18156,16142,15301,12970,12602,12475,12371,12245,11917,12217,11536,11474,11200,9947,9850,9662,8475,7435,6788,6732,6610,6375,6343,6243,5896,5812,5604,5391,5138,4495,4215,4126,3944,3847,3447,3365,3203,3165,3107,2954,2855,2841,2832,2720,2593,2504,2455,2407,2324,2247,2199,2195,2120,2052,2039,1995,1974,1774,1758,1734,1731,1706,1666,1631,1587,1575,1567,1563,1418,1358,1350,1306,1238,1177,1157,1150,1139,1113,1091,1091,939,936,891,879,773,730,685,676,624,605,600,593,584,575,570,570,566,"555",548,548,528,516,434,377,375,343,310,306,302,298,212,194,193];
rawData.dataNames=["fox","horse","dragon","dog","wolf","pony","cat","rabbit","unicorn","pegasus","tiger","bear","lion","fish","robot","demon","lizard","goat","bat","shark","hedgehog","deer","monster","husky","mouse","snake","raccoon","skunk","leopard","otter","hyena75","squirrel","gryphon","cheetah","fennec","panda","sheep","rat","lynx","elf","zebra","kangaroo","jackal","turtle","sergal","chicken","monkey","panther","crocodile","imp","whale","chipmunk","coyote","alligator","raptor","orca","antelope","donkey","cougar","polar_bear","orc","collie","reindeer","frog","echidna","naga","owl","giraffe","rhinoceros","ferret","kobold","khajiit","duck","badger","elephant","opossum","tauren","boar","dolphin","tyrannosaurus_rex","gazelle","wyvern","jaguar","crow","cobra","octopus","weasel","buffalo","penguin","dingo","eagle","mongoose","mink","gorilla","harpy","gecko","lombax","beaver","triceratops","phoenix","hamster","serval","jackalope","ermine","falcon","armadillo","ocelot","moose","koala","salamander","hawk","raven","carb","porcupine","vulture","iguana","oryx","sloth","turkey","seal","llama","mole","elk","pigeon","platypus","python","manticore"];
rawData.newRank=[];
dataScore=[];
dataScoreOrder=[];

rawData.rndGen=function(){
	for(x=0;x<100;x++){
		rawData.dataList[x]=Math.round(Math.random()*999);
	}
}
rawData.rndGen();
dataBar.create = function(){
		dataBar.htmlExample = '<div style="z-index:'+dataBar.zIndex+';background-color:#'+dataBar.color+';left:'+dataBar.xPos+'px;top:'+dataBar.yPos+'px;width:'+dataBar.width+'px;height:'+dataBar.height+'px;"; id="dataBar'+dataBar.ID+'" class="dataBar">['+dataBar.name+']  ['+dataBar.width+']</div>';	
		display.insertAdjacentHTML('beforeend',dataBar.htmlExample);
		dataBar.htmlList[dataBar.ID]=document.getElementById("dataBar"+dataBar.ID+"");	
		widthMax=1000;
		middleZone=(widthMax/3)+(widthMax/6);
		xVal=dataBar.width;
		redZone=(-3*Math.abs(xVal)+widthMax)/widthMax;
		greenZone=(-3*Math.abs(xVal-middleZone)+widthMax)/widthMax;
		blueZone=(-3*Math.abs(xVal-widthMax)+widthMax)/widthMax;
		newRed=redZone*255;
		//Math.round(85/((dataBar.width+1)/1001));
		//Math.round(dataBar.width*255/(rawData.dataList.length+1))+40;
		newGreen=greenZone*255;
		//Math.round(dataBar.ID*255/(rawData.dataList.length+1))+40;
		newBlue=blueZone*255;
		//Math.round(dataBar.ID*255/(rawData.dataList.length+1))+40;
		//console.log(redZone,newRed);
		dataBar.htmlList[dataBar.ID].style.backgroundColor="rgb("+newRed+","+newGreen+","+newBlue+")";
	
}
rawData.InitialOrder=function(){
	maxHeight=Math.max.apply(Math, rawData.dataList);
	for (var i = 0; i < rawData.dataList.length; i++) {
		dataBar.width=Math.round(1000*rawData.dataList[i]/maxHeight);
		dataScore[i]=dataBar.width;
		dataScoreOrder[i]=dataBar.width;
		dataBar.name=rawData.dataNames[i];
		if(dataBar.name==undefined){
			dataBar.name="Lbl"+i+""
		}
		//console.log(dataBar.width);
		dataBar.height=20;
		//console.log(dataBar.height)
		dataBar.yPos=i*20;
		//dataBar.zIndex=i+9;
		dataBar.ID=i;
		dataBar.create();
		//console.log(dataBar.htmlExample);
	}
}
rawData.InitialOrder();
rawData.findOrder=function(){
	var indexVal=0;
	dataScoreOrder.sort(function(a, b){return b-a});
	for(x=0;x<dataScore.length;x++){
		indexVal=dataScore.indexOf(dataScoreOrder[x]);
		if(dataScore[indexVal]>-1){
			rawData.newRank[x]=indexVal;
			dataScore[indexVal]=-1;
		}
		//dataScore=dataScore.splice(indexVal,1);
		//console.log(dataScore[rawData.newRank[x]]);
		//console.log(rawData.newRank);
	}
}
function timeWaster(){
	var y=0;
	if(dataScore.length>5){
		y=dataScore.length;
		console.log("tick",y);
		return 1;
	}
	console.log("tick",y);
	return 0;
}
rawData.reOrderChart=function(){
	rawData.findOrder();
	var newPos=0;
	for(x=0;x<rawData.newRank.length;x++){
		newPos=x*20;
		dataBar.htmlList[rawData.newRank[x]].style.top=""+newPos+"px";
		//setTimeout(timeWaster,1000);
	}
}
rawData.reOrderChart();

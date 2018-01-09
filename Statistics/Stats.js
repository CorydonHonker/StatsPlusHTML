var display = document.getElementById('superDiv');

dataBar=new Object();
//(255).toString(16) == 'ff'
//max decimal=16777215
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
rawData.dataList=[1,2,0,4,5,9,20];

rawData.rndGen=function(){
	for(x=0;x<10;x++){
		rawData.dataList[x]=Math.round(Math.random()*2023);
	}
}
//rawData.rndGen();
dataBar.create = function(){
		dataBar.htmlExample = '<div style="z-index:'+dataBar.zIndex+';background-color:#'+dataBar.color+';left:'+dataBar.xPos+'px;top:'+dataBar.yPos+'px;width:'+dataBar.width+'px;height:'+dataBar.height+'px;"; id="dataBar'+dataBar.ID+'" class="dataBar">Lb'+dataBar.ID+' score='+dataBar.width+'</div>';	
		display.insertAdjacentHTML('beforeend',dataBar.htmlExample);
		dataBar.htmlList[dataBar.ID]=document.getElementById("dataBar"+dataBar.ID+"");
}
rawData.InitialOrder=function(){
	maxHeight=Math.max.apply(Math, rawData.dataList);
	for (var i = rawData.dataList.length - 1; i >= 0; i--) {
		dataBar.color=((i*700)+16000000).toString(16);
		dataBar.width=Math.round(1280*rawData.dataList[i]/maxHeight);
		//console.log(dataBar.width);
		dataBar.height=20;
		//console.log(dataBar.height)
		dataBar.yPos=i;
		//dataBar.zIndex=i+9;
		dataBar.ID=i;
		dataBar.yPos=0
		dataBar.create();
		//console.log(dataBar.htmlExample);
	}
}
rawData.InitialOrder();
//find number of bars
//color loop
dataBar.reDefineBar = function(){
	rawData.dataList.sort(function(a, b){return a-b});
	maxHeight=rawData.dataList[rawData.dataList.length-1];
	for (var i = rawData.dataList.length - 1; i >= 0; i--) {
		dataBar.color=((i*700)+16000000).toString(16);
		dataBar.width=Math.round(1280*rawData.dataList[i]/maxHeight);
		dataBar.height=20;
		//console.log(dataBar.height)
		dataBar.yPos=i;
		//dataBar.zIndex=i+9;
		dataBar.ID=i;
		dataBar.yPos=0
		dataBar.create();
		//console.log(dataBar.htmlExample);
	}
}
//dataBar.reDefineBar();
function test(){
	for(x=0;x<100;x++){
		dataBar.height=1;
		dataBar.width=Math.round(100*Math.random());
		dataBar.xPos=0;
		dataBar.yPos=x*2;
		dataBar.ID=x;
		dataBar.zIndex=9;
		dataBar.create();
		//console.log(dataBar.htmlExample);
	}
}
var keyPressedTF=[];
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var hiddenSrc = document.getElementById('hiddenSrc');
//
mouseX=mouseY=c.width/2;
RadTDeg=Math.PI/180;
debugGame=1;
updateTime=10;
///=====start functions=====///
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0,0,512,512);
function drawLine(xA,yA,xB,yB){	
	ctx.lineWidth=2;	
	ctx.beginPath();
	ctx.moveTo(xA,yA);
	ctx.lineTo(xB,yB);
	ctx.stroke();
}
function drawCircle(x,y,r,startAngle,endAngle,counterclockwise){
	ctx.beginPath();
	ctx.arc(x,y,r,startAngle,endAngle,counterclockwise);
	ctx.fill();
	//ctx.strokeStyle = "rgba(0,0,0,1)";
	ctx.stroke(); 
}
function drawTxt(x,y,pixA,pixB,myTxt){
	ctx.textAlign = "start";
	ctx.font = pixB+"px Arial";
	//fill
	ctx.fillStyle = "#000000";
	ctx.fillText(myTxt,x,y);
	//stroke
	ctx.strokeStyle="#00FFFF";
	ctx.lineWidth=0.5;
	ctx.strokeText(myTxt,x,y);
}
function yInt(x){
	//y=32*Math.sin(x/32)+Math.PI*64
	//y=-511/(x+1)+100;
	y=40*Math.random()+c.height/3;
	return y;
}
function graphingA(step){
	x=0;
	y=yInt(x);
	ctx.lineWidth=1.5;
	ctx.beginPath();
	ctx.moveTo(x,-1*(y-c.width));
	for(x;x<c.width&&y<c.height;x+=step){		
		y=yInt(x);
		yB=-1*(y-c.width);
		ctx.lineTo(x,yB);
	}
	ctx.strokeStyle = "rgba(0,0,0,1)";
	ctx.stroke();
}
function drawGrid(scale){
	ctx.strokeStyle = "rgba(200,200,200,0.5)";//modifyed[Y]=-1*(y-c.width)
	for(x=0;x<c.width;x+=scale){drawLine(x,0,x,c.height);}
	for(y=0;y<c.height;y+=scale){drawLine(0,y,c.width,y);}
}
function invertLoop(){
var imgData=ctx.getImageData(0,0,c.width,c.height);
	for (var i=0;i<imgData.data.length;i+=4){
		  imgData.data[i]=255-imgData.data[i];
		  imgData.data[i+1]=255-imgData.data[i+1];
		  imgData.data[i+2]=255-imgData.data[i+2];
		  imgData.data[i+3]=255;
	}
	ctx.putImageData(imgData,0,0);
}
function myNewCanvas(w,h){
	c.width = w;
	c.height = h;
}
//===IMAGES-&-stuff===//
var resourceArr=[//  [ID,src]
	["modelA","imgSrc/modelA.png"],
	["modelB","imgSrc/modelB.png"],
	["modelC","imgSrc/modelC.png"]
];
function addImgResources(){
	for(x=0;x<resourceArr.length;x++){
		var newSrc = document.createElement("img");
		newSrc.id=resourceArr[x][0];
		newSrc.src=resourceArr[x][1];
		hiddenSrc.appendChild(newSrc);
}}
addImgResources();
function drawImg(xA,yA,w,h,mySrc){
	img = document.getElementById(resourceArr[mySrc][0]);
	ctx.drawImage(img,xA,yA,w,h);
}
///======hitboxes-&-AI======///
var actorA = new Object();
actorA.model=0;
actorA.xPos=100;
actorA.yPos=100;
actorA.width=25;
actorA.height=25;
actorA.xPosModel=actorA.xPos-actorA.width*0.5;
actorA.yPosModel=actorA.yPos-actorA.height*0.5;
actorA.xSpeed=0;
actorA.ySpeed=0;
actorA.angleSpeed=0;
actorA.angle=0;
actorA.xPosAI=actorA.xPos;
actorA.yPosAI=actorA.yPos;
actorA.angleAI=actorA.angle;
//==new-actor==//
var actorB = new Object();
actorB.model=1;
actorB.xPos=150;
actorB.yPos=150;
actorB.width=39;
actorB.height=39;
actorB.xPosModel=actorB.xPos-actorB.width*0.5;
actorB.yPosModel=actorB.yPos-actorB.height*0.5;
actorB.xSpeed=0;
actorB.ySpeed=0;
actorB.angleSpeed=0;
actorB.angle=0;
actorB.xPosAI=actorB.xPos;
actorB.yPosAI=actorB.yPos;
actorB.angleAI=actorB.angle;
//==new-actor==//
var actorC = new Object();
actorC.model=2;
actorC.xPos=175;
actorC.yPos=75;
actorC.width=31;
actorC.height=31;
actorC.xPosModel=actorC.xPos-actorC.width*0.5;
actorC.yPosModel=actorC.yPos-actorC.height*0.5;
actorC.xSpeed=0;
actorC.ySpeed=0;
actorC.angleSpeed=0;
actorC.angle=0;
actorC.xPosAI=actorC.xPos;
actorC.yPosAI=actorC.yPos;
actorC.angleAI=actorC.angle;
//
var actorArray=[actorA,actorB,actorC];
///===ACTOR-functions===///
function drawSightline(actor){
	length=50;
	x=Math.cos(actor.angle*RadTDeg)*length+actor.xPos;
	y=Math.sin(actor.angle*RadTDeg)*length+actor.yPos;
	//
	drawLine(actor.xPos,actor.yPos,x,y);
}
function graphSpeed(actor){
	endX=actor.xPos+30*actor.xSpeed;
	endY=actor.yPos+30*actor.ySpeed;
	drawLine(actor.xPos,actor.yPos,endX,endY);
}
function ptpTest(actor,x,y){
	actor.xPosAI=x;
	actor.yPosAI=y;
	xDif=x-actor.xPos;
	yDif=y-actor.yPos;
	//
	while(Math.abs(xDif)>2||Math.abs(yDif)>2){xDif*=0.9;yDif*=0.9;}
	//
	actor.xSpeed=xDif;
	actor.ySpeed=yDif;//console.log(xDif,yDif);
}
function aimTarget(aimer,target){
	yDif=aimer.yPos-target.yPos;
	xDif=aimer.xPos-target.xPos;
	slope=yDif/xDif;
	angle=Math.atan(slope)*(180/Math.PI);
	//
	if(angle<0){
		if(yDif<0){angle=angle+180;
		}else{angle=angle+360;}
	}else if(xDif>0){angle=angle+180;}
	//
	aimer.angleAI=angle;
}
function updateActors(actor){
	angDif=actor.angle-actor.angleAI;
	if(Math.abs(angDif)>1){
		if(angDif>0){
			if(angDif>180){actor.angleSpeed=1;}else{actor.angleSpeed=-1;}
		}else if(angDif<0){
			if(angDif<-180){actor.angleSpeed=-1;}else{actor.angleSpeed=1;}
		}
		//
		actor.angle+=actor.angleSpeed;
		//
		if(actor.angle>360){actor.angle=1;}else if(actor.angle<0){actor.angle=359;}
		if(actor.angleAI>360){actor.angleAI=1;}else if(actor.angleAI<0){actor.angleAI=359;}
		//
	}
	//
	xDif=Math.abs(actor.xPosAI-actor.xPos);
	yDif=Math.abs(actor.yPosAI-actor.yPos);
	if(xDif>2){actor.xPos+=actor.xSpeed;}else{actor.xSpeed=0;}
	if(yDif>2){actor.yPos+=actor.ySpeed;}else{actor.ySpeed=0;}
	//
	actor.xPosModel=actor.xPos-actor.width*0.5;
	actor.yPosModel=actor.yPos-actor.height*0.5;
}
function locate(actorX,actorY){
	drawLine(actorX.xPos,actorX.yPos,actorY.xPos,actorY.yPos);
}
///======drawing-actors===///
function drawActors(){
	for(actorVal=0;actorVal<actorArray.length;actorVal++){//console.log(actorVal,actorArray.length);
		updateActors(actorArray[actorVal]);
		//
		drawImg(actorArray[actorVal].xPosModel,actorArray[actorVal].yPosModel,actorArray[actorVal].width,actorArray[actorVal].height,actorArray[actorVal].model);
		//
	if(debugGame==1){
		ctx.strokeStyle = "rgba(255,0,0,1)";
		graphSpeed(actorArray[actorVal]);
		ctx.strokeStyle = "rgba(0,0,255,1)";
		drawSightline(actorArray[actorVal]);
		//
		ctx.strokeStyle = "rgba(0,255,0,0.5)";
		drawLine(actorArray[actorVal].xPos,actorArray[actorVal].yPos,actorArray[actorVal].xPosAI,actorArray[actorVal].yPosAI);
		ctx.fillStyle = "rgba(0,0,0,1)";
		drawCircle(actorArray[actorVal].xPosAI,actorArray[actorVal].yPosAI,5,0,Math.PI*2,0);
		ctx.fillStyle = "rgba(255,0,0,0.5)";
		drawCircle(actorArray[actorVal].xPos,actorArray[actorVal].yPos,10,0,Math.PI*2,0);
	}}
}
///======drawing-Canvas===///
function drawCanvas(){
	myNewCanvas(c.width,c.height);
	//
	drawActors();
	aimTarget(actorC,actorB);
	drawGrid(50);
	//
	setTimeout(function(){drawCanvas();},updateTime)
}
//end functions
drawCanvas();
//============keyPattern============//
function keyPattern(){
	if(keyPressedTF[90]){//console.log("z");
	actorA.angleAI+=1;
	};
	if(keyPressedTF[77]){//console.log("m");
	};
	if(keyPressedTF[86]){//console.log("v");
	};
	if(keyPressedTF[87]&&!keyPressedTF[83]){//console.log("w");
	}
	if(keyPressedTF[83]&&!keyPressedTF[87]){//console.log("s");
	}
	if(keyPressedTF[65]&&!keyPressedTF[68]){//console.log("a");
	}
	if(!keyPressedTF[65]&&keyPressedTF[68]){//console.log("d");
	}
	if(keyPressedTF[38]&&!keyPressedTF[40]){//console.log("up");
	}
	if(keyPressedTF[40]&&!keyPressedTF[38]){//console.log("down");
	}
	if(keyPressedTF[37]&&!keyPressedTF[39]){//console.log("left");
	}
	if(!keyPressedTF[37]&&keyPressedTF[39]){//console.log("right");
	}
	setTimeout(keyPattern,updateTime);
}
//events
document.getElementById("bodyTag").addEventListener(
	'keydown',
	function(event){
		//console.log("keydown");
		//console.log("+"+String.fromCharCode(event.which)+" "+event.which);
		keyPressedTF[event.which]=true;
});
//
document.getElementById("bodyTag").addEventListener(
	'keyup',
	function(event){
		//console.log("keyup");
		//console.log("-"+String.fromCharCode(event.which));
		keyPressedTF[event.which]=false;
});
c.addEventListener(
	"click",
	function(event){
		rect = c.getBoundingClientRect();
		mouseX=event.clientX-parseInt(rect.left);
		mouseY=event.clientY-parseInt(rect.top);
		ptpTest(actorB,mouseX,mouseY);
})
keyPattern();
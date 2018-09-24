var keyPressedTF=[];
var actorArray=[];
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var hiddenSrc = document.getElementById('hiddenSrc');
//
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0,0,512,512);
//
mouseX=mouseY=c.width/2;
RadTDeg=Math.PI/180;
debugGame=1;
updateTime=10;
pauseGame=0;
uniqueObjId=0;
///=====start functions=====///
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
function drawGrid(scale){
	ctx.strokeStyle = "rgba(200,200,200,0.5)";//modifyed[Y]=-1*(y-c.width)
	for(x=0;x<c.width;x+=scale){drawLine(x,0,x,c.height);}
	for(y=0;y<c.height;y+=scale){drawLine(0,y,c.width,y);}
}
function drawImg(xA,yA,w,h,mySrc){
	img = document.getElementById(resourceArr[mySrc][0]);
	ctx.drawImage(img,xA,yA,w,h);
}
function myNewCanvas(w,h){
	c.width = w;
	c.height = h;
}
//===IMAGES-&-RESOURCES===//
var resourceArr=[//  [ID,src]
	["modelA","imgSrc/modelA.png"],
	["modelB","imgSrc/modelB.png"],
	["modelC","imgSrc/modelC.png"],
	["bulletA","imgSrc/bulletA.jpg"]
];
function addImgResources(){
	for(x=0;x<resourceArr.length;x++){
		var newSrc = document.createElement("img");
		newSrc.id=resourceArr[x][0];
		newSrc.src=resourceArr[x][1];
		hiddenSrc.appendChild(newSrc);
}}
addImgResources();
///======Objects-Classes======///
function genericEnt(){
	this.locate = function(target){
		drawLine(this.xPos,this.yPos,target.xPos,target.yPos);
	}	
	this.ptpTest = function(x,y){
		this.xPosAI=x;
		this.yPosAI=y;

		xDif=x-this.xPos;
		yDif=y-this.yPos;
		//
		while(Math.abs(xDif)>2||Math.abs(yDif)>2){xDif*=0.9;yDif*=0.9;}
		//
		this.xSpeed=xDif;
		this.ySpeed=yDif;//console.log(xDif,yDif);
	}
	this.aimTarget = function(target){
		yDif=this.yPos-target.yPos;
		xDif=this.xPos-target.xPos;
		slope=yDif/xDif;
		angle=Math.atan(slope)*(180/Math.PI);
		//
		if(angle<0){
			if(yDif<0){angle=angle+180;
			}else{angle=angle+360;}
		}else if(xDif>0){angle=angle+180;}
		//
		this.angleAI=angle;
	}
	this.debugAlpha =function(){
		ctx.strokeStyle = "rgba(90,20,65,1)";
		//actorArray[actorVal].locate(actorB);
		//drawSightline()
		length=50;
		x=Math.cos(this.angle*RadTDeg)*length+this.xPos;
		y=Math.sin(this.angle*RadTDeg)*length+this.yPos;
		//
		ctx.strokeStyle = "rgba(255,0,0,0.5)";
		drawLine(this.xPos,this.yPos,x,y);
		//graphSpeed()
		endX=this.xPos+30*this.xSpeed;
		endY=this.yPos+30*this.ySpeed;
		ctx.strokeStyle = "rgba(0,255,0,0.5)";
		drawLine(this.xPos,this.yPos,endX,endY);
		//draw Destination
		ctx.strokeStyle = "rgba(0,0,255,0.4)";
		drawLine(actorArray[actorVal].xPos,actorArray[actorVal].yPos,actorArray[actorVal].xPosAI,actorArray[actorVal].yPosAI);
		ctx.fillStyle = "rgba(255,255,0,1)";
		drawCircle(actorArray[actorVal].xPosAI,actorArray[actorVal].yPosAI,5,0,Math.PI*2,0);
	}	
	this.objectDie = function(){
		this.lifeTime-=updateTime;//console.log(this.lifeTime);console.log("die");
		if(this.lifeTime<0){return 7;}
	}
	this.objSelfRemove = function(){
			actorArray.splice(this.objArrPos(),1);//console.log("Bullet arrPos:",this.objArrPos());
	}
	this.objArrPos = function(){
		return actorArray.indexOf(this);
	}
}
function Projectile(ID,arrPos,ParentName,name,model,xPos,yPos,width,height,xSpeed,ySpeed,angleSpeed,angle,speed,range,lifeTime){
	genericEnt.call(this);
	this.uniqueObjId=ID;
	this.lifeTime=lifeTime;
	this.arrPos=arrPos;
	this.ParentName=ParentName;
	this.ActorName=name;
	this.model=model;
	this.xPos=xPos;
	this.yPos=yPos;
	this.width=width;
	this.height=height;
	this.xPosModel=this.xPos-this.width*0.5;
	this.yPosModel=this.yPos-this.height*0.5;
	this.xSpeed=xSpeed;
	this.ySpeed=ySpeed;
	this.angleSpeed=angleSpeed;
	this.angle=angle;
	this.xPosAI=this.xPos;
	this.yPosAI=this.yPos;
	this.angleAI=this.angle;
	this.bulletSpeed=speed;
	this.bulletRange=range;
}
function Actor(ID,arrPos,name,model,xPos,yPos,width,height,xSpeed,ySpeed,angleSpeed,angle,lifeTime){
	genericEnt.call(this);
	this.uniqueObjId=ID;
	this.lifeTime=lifeTime;
	this.arrPos=arrPos;
	this.className="Actor";
	this.ActorName=name;
	this.model=model;
	this.xPos=xPos;
	this.yPos=yPos;
	this.width=width;
	this.height=height;
	this.xPosModel=this.xPos-this.width*0.5;
	this.yPosModel=this.yPos-this.height*0.5;
	this.xSpeed=xSpeed;
	this.ySpeed=ySpeed;
	this.angleSpeed=angleSpeed;
	this.angle=angle;
	this.xPosAI=this.xPos;
	this.yPosAI=this.yPos;
	this.angleAI=this.angle;
	this.launchProjectile = function(){
		//Projectile(uniqueObjId,arrPos,ParentName,name,model,xPos,yPos,width,height,xSpeed,ySpeed,angleSpeed,angle,speed,range,lifeTime)
		actorArray[actorArray.length] = new Projectile(uniqueObjId++,0,this.ActorName,"GenericBullet",3,this.xPos,this.yPos,10,10,0,0,0,this.angle,4,100,2000);
		//
		newXPosAI=actorArray[actorArray.length-1].bulletRange*actorArray[actorArray.length-1].bulletSpeed*Math.cos(this.angle*RadTDeg)+this.xPos;
		newYPosAI=actorArray[actorArray.length-1].bulletRange*actorArray[actorArray.length-1].bulletSpeed*Math.sin(this.angle*RadTDeg)+this.yPos;
		actorArray[actorArray.length-1].ptpTest(newXPosAI,newYPosAI);
	}
	this.aimMouse = function(x,y){
		yDif=this.yPos-y;
		xDif=this.xPos-x;
		slope=yDif/xDif;
		angle=Math.atan(slope)*(180/Math.PI);
		//
		if(angle<0){
			if(yDif<0){angle=angle+180;
			}else{angle=angle+360;}
		}else if(xDif>0){angle=angle+180;}
		//
		this.angleAI=angle;
	}
}
//Actor(uniqueObjId,name, model,xPos,yPos,width,height,xSpeed,ySpeed,angleSpeed,angle,lifetime)
var actorA = actorArray[actorArray.length] = new Actor(uniqueObjId++,0,"Turret",0,85,135,31,31,0,0,8,0,Infinity);
var actorB = actorArray[actorArray.length] =  new Actor(uniqueObjId++,0,"Player",0,130,120,25,25,0,0,8,0,Infinity);
var actorC = actorArray[actorArray.length] =  new Actor(uniqueObjId++,0,"AutoTurret",0,80,100,27,27,0,0,8,0,Infinity);
//
// arr.splice(position, # of elements); 
//removes element from arr
// arr.push(element); 
//adds element to end of arr
///===ACTOR-functions===///
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
///======drawing-actors===///
var cleanupList=[];
function drawActors(){
	actorC.aimTarget(actorB);
	for(actorVal=0;actorVal<actorArray.length;actorVal++){
		updateActors(actorArray[actorVal]);
		//
		drawImg(actorArray[actorVal].xPosModel,actorArray[actorVal].yPosModel,actorArray[actorVal].width,actorArray[actorVal].height,actorArray[actorVal].model);
		//
	if(debugGame==1){actorArray[actorVal].debugAlpha();}
	//death
	if(actorArray[actorVal].objectDie()==7){
		cleanupList.push(actorArray[actorVal]);
	}
	}
}
function clearTheDead(){
	//cleanupLoop
	for(i=cleanupList.length-1;i>-1;i--){
		//console.log(cleanupList.length,i,cleanupList[i].objArrPos());
		cleanupList[i].objSelfRemove();
	}
	cleanupList=[];
}
///======drawing-Canvas===///
function drawCanvas(){
	myNewCanvas(c.width,c.height);
	drawGrid(50);
	//
	drawActors();
	//
}
//============keyPattern============//
keyCooldownV=0;
function keyPattern(){
	keyCooldownV-=1;
	if(keyPressedTF[90]){//console.log("z");
	};
	if(keyPressedTF[88]){//console.log("m");
	};
	if(keyPressedTF[86]){//console.log("v");
		if(keyCooldownV<0){
			actorA.launchProjectile();
			keyCooldownV=20;
		}//console.log(keyCooldownV);
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
}
///###########_MAIN_LOOP_##########///
function gameLoop(){
	if(pauseGame==0){
		clearTheDead();
		drawCanvas();
		keyPattern();
	}
	setTimeout(function(){gameLoop();},updateTime);
}
///===events===///
document.getElementById("bodyTag").addEventListener(
	'keydown',
	function(event){
		keyPressedTF[event.which]=true;
});
//
document.getElementById("bodyTag").addEventListener(
	'keyup',
	function(event){
		keyPressedTF[event.which]=false;
});
c.addEventListener(
	"click",
	function(event){
		rect = c.getBoundingClientRect();
		mouseX=event.clientX-parseInt(rect.left);
		mouseY=event.clientY-parseInt(rect.top);
		actorB.ptpTest(mouseX,mouseY);
})
c.addEventListener(
	"mousemove",
	function(event){
		rect = c.getBoundingClientRect();
		mouseX=event.clientX-parseInt(rect.left);
		mouseY=event.clientY-parseInt(rect.top);
		actorA.aimMouse(mouseX,mouseY);
});
gameLoop();
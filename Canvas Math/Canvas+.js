var canvas = document.getElementById("CanvasID");
var ctx = canvas.getContext("2d");
var c =canvas;
var LWcanvas=512;
var BorderBuffer=1;
ctx.fillStyle = "rgba(255,255,255, 1)";
ctx.fillRect(0,0,LWcanvas,LWcanvas);

var pixelLevel=0;
var pixelCount=0;
var ratePixel=254;
function allColors(){
//pixel count
//loop
var imgData=ctx.getImageData(0,0,c.width,c.height);
imgData.data[0]-=ratePixel;
if(imgData.data[0]==0){
	imgData.data[1]-=ratePixel;
	imgData.data[0]=255;
}
if(imgData.data[1]==0){
	imgData.data[2]-=ratePixel;
	imgData.data[1]=255;
}
for(x=4;x<imgData.data.length;x+=4){
	if(imgData.data[x-2]==0){
		imgData.data[x]-=ratePixel;
		imgData.data[x-2]=255;
		//imgData.data[x-3]=255;
		//imgData.data[x-4]=255;
	}
	if(imgData.data[x]==0){
		imgData.data[x+1]-=ratePixel;
		imgData.data[x]=255;
	}
	if(imgData.data[x+1]==0){
		imgData.data[x+2]-=ratePixel;
		imgData.data[x+1]=255;
	}
	//console.log(imgData.data.length,x);
}
//imgData.data[pixelCount+1]
	pixelLevel++;
	//console.log(pixelLevel);
	ctx.putImageData(imgData,0,0);
	setTimeout(function(){allColors();},0);
	
}

function noColors(){
var imgData=ctx.getImageData(0,0,c.width,c.height);
imgData.data[0]=0;
imgData.data[1]=0;
imgData.data[2]=0;
for(x=4;x<imgData.data.length;x+=4){
	//||imgData.data[x+c.width+2]==0
	if(imgData.data[x-2]==0){
		imgData.data[x]-=22;
	}
	if(imgData.data[x]==0){
		imgData.data[x+1]-=22;
	}
	if(imgData.data[x+1]==0){
		imgData.data[x+2]-=23;
	}
}
	ctx.putImageData(imgData,0,0);
	setTimeout(function(){noColors();},0);	
}
function noLines(){
var imgData=ctx.getImageData(0,0,c.width,c.height);
imgData.data[0]=0;
imgData.data[1]=0;
imgData.data[2]=0;
for(x=4;x<imgData.data.length;x+=4){
	//||imgData.data[x+c.width+2]==0
	if(imgData.data[x+2+c.width]==0||imgData.data[x-2]==0){imgData.data[x]-=22;}
	//if(){imgData.data[x]-=22;}
	if(imgData.data[x]==0){imgData.data[x+1]-=22;}
	if(imgData.data[x+1]==0){imgData.data[x+2]-=23;}
}
	ctx.putImageData(imgData,0,0);
	setTimeout(function(){noLines();},0);	
}
var rndRed;
var rndGreen;
var rndBlue;
function sinRainbow(){
	var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
	for (var i=0;i<imgData.data.length;i+=4){	
			rndRed=Math.floor((Math.cos(i-2)) * 255);	
			rndBlue=Math.floor((Math.cos(i)) * 255);	
			rndGreen=Math.floor((Math.cos(i+2)) * 255);
			imgData.data[i]=rndRed;	
			imgData.data[i+1]=rndGreen;
			imgData.data[i+2]=rndBlue;
	}
	ctx.putImageData(imgData,0,0);
}

function rndRainbow(){
	var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
	for (var i=0;i<imgData.data.length;i+=4){	
			rndRed=Math.floor(Math.random() * 250);	
			rndBlue=Math.floor(Math.random() * 250);	
			rndGreen=Math.floor(Math.random() * 250);
			imgData.data[i]=rndRed;	
			imgData.data[i+1]=rndGreen;
			imgData.data[i+2]=rndBlue;
	}
	ctx.putImageData(imgData,0,0);
}


var rndPixel;
function rndGen(){
	for(y=BorderBuffer;y<LWcanvas-BorderBuffer;y++){
		for(x=BorderBuffer;x<LWcanvas-BorderBuffer;x++){	
			rndPixel=Math.floor(Math.random() * 110);
			imgData=ctx.getImageData(x,y,1,1);
			if(rndPixel>70){
				imgData.data[0]=0;
				imgData.data[1]=0;
				imgData.data[2]=0;
			}else{
				imgData.data[0]=255;
				imgData.data[1]=255;
				imgData.data[2]=255;
			}
			ctx.putImageData(imgData,x,y);	
		}
	}
}

var imgData;
function Roamer(){
	for(y=0;y<LWcanvas;y++){
		for(x=0;x<LWcanvas;x++){
			imgData=ctx.getImageData(x,y,1,1);
			if(imgData.data[0]<128||imgData.data[1]<128||imgData.data[2]<128){
				imgData.data[0]=0;
				imgData.data[1]=0;
				imgData.data[2]=0;
			}else{
				imgData.data[0]=255;
				imgData.data[1]=255;
				imgData.data[2]=255;
			}
			ctx.putImageData(imgData,x,y);
		}
	}
}

function MonoChrome(){	
	var imgData=ctx.getImageData(0,0,c.width,c.height);
	for (var i=0;i<imgData.data.length;i+=4){
		if(imgData.data[i]<128||imgData.data[i+1]<128||imgData.data[i+2]<128){
			imgData.data[i]=0;
			imgData.data[i+1]=0;
			imgData.data[i+2]=0;
		}else{
			imgData.data[i]=255;
			imgData.data[i+1]=255;
			imgData.data[i+2]=255;
		}
	}
	ctx.putImageData(imgData,0,0);
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
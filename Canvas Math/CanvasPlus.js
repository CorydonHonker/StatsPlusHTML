var canvas = document.getElementById("CanvasID");
var ctx = canvas.getContext("2d");
var c =canvas;
var LWcanvas=512;
var BorderBuffer=1;
ctx.fillStyle = "rgba(255, 255, 255, 1)";
ctx.fillRect(0,0,LWcanvas,LWcanvas);
var pixelCount=(LWcanvas-BorderBuffer)*(LWcanvas-BorderBuffer);

function gameOfLife(steps){
var imgData=ctx.getImageData(0,0,c.width,c.height);
var ArLength=imgData.data.length;
var alive=0;
for(x=0;x<ArLength;x+=4){
	alive=0;
	//top/bottom
	if(imgData.data[x-(c.width*4)]==0){alive++;}
	if(imgData.data[x+(c.width*4)]==0){alive++;}
	//top/bottom left
	if(imgData.data[x-4-(c.width*4)]==0){alive++;}
	if(imgData.data[x-4+(c.width*4)]==0){alive++;}
	//top/bottom right
	if(imgData.data[x+4-(c.width*4)]==0){alive++;}
	if(imgData.data[x+4+(c.width*4)]==0){alive++;}
	//left/right
	if(imgData.data[x-4]==0){alive++;}
	if(imgData.data[x+4]==0){alive++;}
	//logic
	if(alive<3){
		imgData.data[x]=imgData.data[x+1]=imgData.data[x+2]=255;
	}else if(alive>4){
		imgData.data[x]=imgData.data[x+1]=imgData.data[x+2]=255;
	}else if(alive==3&&imgData.data[x]==255){
		imgData.data[x]=imgData.data[x+1]=imgData.data[x+2]=0;
	}
}
	ctx.putImageData(imgData,0,0);
	steps-=1;
	if(steps<1){return 1;}
	setTimeout(function(){gameOfLife(steps);},0);	
}


function UploadPrt()
{
    var inputFileToLoad = document.createElement("input");
    inputFileToLoad.type = "file";
    inputFileToLoad.id = "inputFileToLoad";
    document.body.appendChild(inputFileToLoad);

    var buttonLoadFile = document.createElement("button");
    buttonLoadFile.onclick = loadImageFileAsURL;
    buttonLoadFile.textContent = "Load Selected File";
    document.body.appendChild(buttonLoadFile);
}

function loadImageFileAsURL()
{
    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0)
    {
        var fileToLoad = filesSelected[0];

        if (fileToLoad.type.match("image.*"))
        {
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent) 
            {
                var imageLoaded = document.getElementById("srcImg");
                imageLoaded.src = fileLoadedEvent.target.result;
            };
            fileReader.readAsDataURL(fileToLoad);
        }
    }
}
UploadPrt();
function deltaColor(color, delta){
var imgData=ctx.getImageData(0,0,c.width,c.height);
	for (var i=0;i<imgData.data.length;i+=4){
		  imgData.data[i+color]=delta+imgData.data[i+color];
	}
	ctx.putImageData(imgData,0,0);
}

function noColors(){
var imgData=ctx.getImageData(0,0,c.width,c.height);
for(x=0;x<imgData.data.length;x+=4){
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
	if(c.width*c.height==checkImage()){return 1;}
	ctx.putImageData(imgData,0,0);
	setTimeout(function(){noColors();},0);	
}
function noLines(){
var imgData=ctx.getImageData(0,0,c.width,c.height);
var ArLength=imgData.data.length;
var burnRate=10;
for(x=0;x<ArLength;x+=4){
	if(imgData.data[x-2-(c.width*4)]==0||imgData.data[x+2+(c.width*4)]==0||imgData.data[x-2]==0||imgData.data[x+6]==0){imgData.data[x]-=burnRate;}
	if(imgData.data[x]==0){imgData.data[x+1]-=burnRate;}
	if(imgData.data[x+1]==0){imgData.data[x+2]-=burnRate;}
}
	if(c.width*c.height==checkImage()){return 1;}
	ctx.putImageData(imgData,0,0);
	setTimeout(function(){noLines();},0);	
}
function checkImage(){
var imgData=ctx.getImageData(0,0,c.width,c.height);
var count=0;
for(x=0;x<imgData.data.length;x+=4){
	if(imgData.data[x]==0&&imgData.data[x+1]==0&&imgData.data[x+2]==0){count++;}
		
	}
return count;
}

var aveRed=0;
var aveGreen=0;
var aveBlue=0;
function averagePixel(){
	for(y=BorderBuffer;y<LWcanvas-BorderBuffer;y++){
		for(x=BorderBuffer;x<LWcanvas-BorderBuffer;x++){
			imgData=ctx.getImageData(x,y,1,1);
			aveRed+=imgData.data[0];
			aveGreen+=imgData.data[1];
			aveBlue+=imgData.data[2];	
		}
	}
		
		aveRed=Math.floor(aveRed/pixelCount);
		aveGreen=Math.floor(aveGreen/pixelCount);
		aveBlue=Math.floor(aveBlue/pixelCount);

		//console.log(aveRed,aveGreen,aveBlue,pixelCount);
		ctx.fillStyle ="rgba("+aveRed+","+aveGreen+","+aveBlue+", 1)";
		ctx.fillRect(0,0,LWcanvas,LWcanvas);

	
}

function drawImage(){
	var img=document.getElementById("srcImg");
	ctx.drawImage(img,0,0,LWcanvas,LWcanvas);
}

function colorBias(){		
	ctx.fillStyle ="rgba(0,0,0, 1)";
	ctx.fillRect(0,0,LWcanvas,LWcanvas);
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
			rndRed=Math.floor(Math.random() * 256);	
			rndBlue=Math.floor(Math.random() * 256);	
			rndGreen=Math.floor(Math.random() * 256);
			imgData.data[i]=rndRed;	
			imgData.data[i+1]=rndGreen;
			imgData.data[i+2]=rndBlue;
	}
	ctx.putImageData(imgData,0,0);
}


//function rndRainbow(){
//	for(y=BorderBuffer;y<LWcanvas-BorderBuffer;y++){
//		for(x=BorderBuffer;x<LWcanvas-BorderBuffer;x++){	
//			rndRed=Math.floor(Math.random() * 256);	
//			rndBlue=Math.floor(Math.random() * 256);	
//			rndGreen=Math.floor(Math.random() * 256);
//			imgData=ctx.getImageData(x,y,1,1);
//				imgData.data[0]=rndRed;	
//				imgData.data[1]=rndGreen;
//				imgData.data[2]=rndBlue;
//			ctx.putImageData(imgData,x,y);	
//		}
//	}
//}


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

var midTest=128;
function MonoChrome(){
	var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
	for (var i=0;i<imgData.data.length;i+=4){
		if(imgData.data[i]<midTest){
			imgData.data[i]=0;
		}else{
			imgData.data[i]=255;
		}
		if(imgData.data[i+1]<midTest){
			imgData.data[i+1]=0;
		}else{
			imgData.data[i+1]=255;
		}
		if(imgData.data[i+2]<midTest){
			imgData.data[i+2]=0;
		}else{
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

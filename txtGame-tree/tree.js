userPromptHtml=document.getElementById('userPrompt');
customInputHtml=document.getElementById('inputBox');
nameHtml=document.getElementById('namePlace');
confirmHtml=document.getElementById('confirmButton');
numberPadKey_0=document.getElementById('inputNum0');
numberPadKey_1=document.getElementById('inputNum1');
numberPadKey_2=document.getElementById('inputNum2');
numberPadKey_3=document.getElementById('inputNum3');
numberPadKey_4=document.getElementById('inputNum4');
numberPadKey_5=document.getElementById('inputNum5');
numberPadKey_6=document.getElementById('inputNum6');
numberPadKey_7=document.getElementById('inputNum7');
numberPadKey_8=document.getElementById('inputNum8');
numberPadKey_9=document.getElementById('inputNum9');
sceneProgress=0;
gameState=0;
//presets
//"<tr><td></td></tr>"
promptLayerClear="";
promptLayerTableHeader="<table>";
promptLayerTableFooter="</table>";
demoSceneArray=[
"<tr><td>What is your name?</br>Use Custom Input</td></tr>",
"<tr><td>(1) Look</td></tr>",
"<tr><td>(2) Do nothing</td></tr>",
"<tr><td>You see a single exit in a dark damp room</td></tr>",
"<tr><td>(2) Walk out of this room</td></tr>",
"<tr><td>Nothing happened</br>You die...</td></tr>",
"<tr><td><button onclick='changeName()'>Restart?</button></td></tr>",
"<tr><td>You see a lever on the opposite side of the room as the door</td></tr>",
"<tr><td>(3) Pull the lever</td></tr>",
"<tr><td>Secret option!</br>Too bad you are dead</td></tr>",
"<tr><td>You escaped the room!</td></tr>",
"<tr><td>There is nothing else too see</td></tr>",
"<tr><td>(2) Pull the lever</td></tr>",
"<tr><td>(1) Walk out of this room</td></tr>",
"<tr><td>you feel the room shake violently</br>The light from outside fades as a large stone slab covers the exit</br>You hear nothing but your own heart beating...</br>You perish in this stone tomb</td></tr>"
];
//functions
function changeName(){
	userPrompt.innerHTML="";
	userPrompt.innerHTML=
		promptLayerTableHeader+
		demoSceneArray[0]+
		promptLayerTableFooter;
	gameState=1;
	sceneProgress=0;
}

function demoScene(){
	if(sceneProgress==0){
	userPrompt.innerHTML="";
	userPrompt.innerHTML=
		promptLayerTableHeader+
		demoSceneArray[1]+
		demoSceneArray[2]+
		promptLayerTableFooter;
	}//begining
	if(sceneProgress==1){
	userPrompt.innerHTML="";
	userPrompt.innerHTML=
		promptLayerTableHeader+
		demoSceneArray[3]+
		demoSceneArray[1]+
		demoSceneArray[4]+
		promptLayerTableFooter;
	}//looked once
	if(sceneProgress==2){
	userPrompt.innerHTML="";
	userPrompt.innerHTML=
		promptLayerTableHeader+
		demoSceneArray[5]+
		demoSceneArray[6]+
		promptLayerTableFooter;
	}//did nothing [END]
	if(sceneProgress==3){
	userPrompt.innerHTML="";
	userPrompt.innerHTML=
		promptLayerTableHeader+
		demoSceneArray[7]+
		demoSceneArray[1]+
		demoSceneArray[4]+
		demoSceneArray[8]+
		promptLayerTableFooter;
	}//looked twice
	if(sceneProgress==4){
	userPrompt.innerHTML="";
	userPrompt.innerHTML=
		promptLayerTableHeader+
		demoSceneArray[10]+
		demoSceneArray[6]+
		promptLayerTableFooter;
	}//walk out [END]
	if(sceneProgress==5){
	userPrompt.innerHTML="";
	userPrompt.innerHTML=
		promptLayerTableHeader+
		demoSceneArray[9]+
		demoSceneArray[6]+
		promptLayerTableFooter;
	}//secret option  [END]
	if(sceneProgress==6){
	userPrompt.innerHTML="";
	userPrompt.innerHTML=
		promptLayerTableHeader+
		demoSceneArray[11]+
		demoSceneArray[13]+
		demoSceneArray[12]+
		promptLayerTableFooter;
	}//looked three times
	if(sceneProgress==7){
	userPrompt.innerHTML="";
	userPrompt.innerHTML=
		promptLayerTableHeader+
		demoSceneArray[14]+
		demoSceneArray[6]+
		promptLayerTableFooter;
	}//pulled lever [END]

}
changeName();
//inputHandels
function numberHandel(number){
	if(gameState==2){
		if(sceneProgress==0){
			if(number==1){
				sceneProgress=1;
			}//look 1st
			if(number==2){
				sceneProgress=2;
			}//nothing
		}else if(sceneProgress==1){
			if(number==1){
				sceneProgress=3;
			}//look 2nd
			if(number==2){
				sceneProgress=4;
			}//walk outside
		}else if(sceneProgress==2){
			if(number==0){
				sceneProgress=5;
			}//secret action
		}else if(sceneProgress==3){
			if(number==1){
				sceneProgress=6;
			}//look third
			if(number==2){
				sceneProgress=4;
			}//walk outside
			if(number==3){
				sceneProgress=7;
			}//pull lever
		}else if(sceneProgress==6){
			if(number==1){
				sceneProgress=4;
			}//walk outside
			if(number==2){
				sceneProgress=7;
			}//pull lever
		}
	demoScene();
	}
}
function customHandel(){
	inputVal=customInputHtml.value;
	currentState=gameState;
	if(currentState==1){
		nameHtml.innerHTML="Name:"+inputVal;
		gameState=2;
		demoScene();
	}
}
//events
confirmHtml.addEventListener("click", customHandel);
numberPadKey_0.addEventListener("click", function(){numberHandel(0)});
numberPadKey_1.addEventListener("click", function(){numberHandel(1)});
numberPadKey_2.addEventListener("click", function(){numberHandel(2)});
numberPadKey_3.addEventListener("click", numberHandel(3));
numberPadKey_4.addEventListener("click", numberHandel(4));
numberPadKey_5.addEventListener("click", numberHandel(5));
numberPadKey_6.addEventListener("click", numberHandel(6));
numberPadKey_7.addEventListener("click", numberHandel(7));
numberPadKey_8.addEventListener("click", numberHandel(8));
numberPadKey_9.addEventListener("click", numberHandel(9));
const inputTextArea = document.getElementById("inputStr");
const outputTextArea = document.getElementById("outputStr");
const thisInput = document.getElementById("this_id");
const thatInput = document.getElementById("that_id");
const addBtn = document.getElementById("addStr");
const changeList = document.getElementById("changeList");

var changeDict = Object();

function convert_str(){
	myStr = inputTextArea.value;
	for (var keyStr in changeDict){
		//const regex = new RegExp(keyStr, 'g');myStr = myStr.replace(regex, changeDict[keyStr][idx]);
		while(myStr.indexOf(keyStr) != -1){
			var idx = 0;
			if (changeDict[keyStr].length > 1){
				idx = Math.floor(Math.random() * changeDict[keyStr].length);
			};
			myStr = myStr.replace(keyStr, changeDict[keyStr][idx]);
		};
	};
	outputTextArea.value = myStr;
};

function updateDict(this_str=null, that_str=null){
	if (this_str === null){this_str = thisInput.value;};
	if (that_str === null){that_str = thatInput.value;};
	if (this_str == '' || that_str == ''){return 'updateDict: empty string'}
	if(changeDict[this_str]){
		changeDict[this_str].push(that_str);
	}else{
		changeDict[this_str] = [that_str];
	};
	displayDict();
	convert_str();
};

function displayDict(){
	var newHTML = "";
	for (var keyStr in changeDict){
		var keyList = changeDict[keyStr].toString();
		newHTML += `<div class="changeList" id="${keyStr}_id">
		<button type="button" onclick="removeElement('${keyStr}_id')">REMOVE</button>
		<b>${keyStr}: ${keyList}</b></div>`
	};
	changeList.innerHTML = newHTML;
};

function removeElement(elmID){
	var myElm = document.getElementById(elmID);
	myElm.remove();
	elmID = elmID.replace("_id", "");
	if (changeDict[elmID]){
		delete changeDict[elmID];
	};
	convert_str();
};

inputTextArea.addEventListener("keyup", function(){
	convert_str();
});

inputTextArea.value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
updateDict("in", "out");updateDict("dolor", "dollar");
displayDict();
convert_str();
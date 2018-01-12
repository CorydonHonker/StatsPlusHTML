
asciiArray =[];
for( var i = 32; i <= 126; i++ )
{
    asciiArray[i-32] = String.fromCharCode( i );
};
//raw unfiltered/unescaped
inputAd=document.getElementById("inputBox");
passAd=document.getElementById("passwordBox");
inputVal=inputAd.value;
passVal=passAd.value;
//resrect all
//unicode letter combinations
//unicode combos
var lArrow = "\u25c4";
var rArrow = "\u25ba";
var uArrow = "\u25b2";
var dArrow = "\u25bc";
var cDot = "\u2022";
var lArrowH = "\u140A";
var rArrowH = "\u1405";
var uArrowH = "\u1403";
var dArrowH = "\u1401";
var cDotH = "\u2218";
var matcher = new RegExp("\u2022");
var matcherH = new RegExp("\u2218");
//console.log(lArrow,rArrow,uArrow,dArrow,cDot,lArrowH,rArrowH,uArrowH,dArrowH,cDotH);
//unicode defined
//Sdot->sU->sD->sR->sL->hU->hD->hR->hL->\(down)/
//Hdot->sU->sD->sR->sL->hU->hD->hR->hL->/(up)\
var spaceCobmo=cDot+uArrow;
var exclaCobmo=cDot+dArrow;
var dubQouteCombo=cDot+rArrow;
//gaps go backwards (2)
var pounCobmo=cDot+lArrow;
var dollCobmo=cDot+uArrowH;
var precCobmo=cDot+dArrowH;
var ampCobmo=cDot+rArrowH;
var sQoteCobmo=cDot+lArrowH;
var lParaCobmo=cDotH+uArrow;
var rParaCobmo=cDotH+dArrow;
var astrCobmo=cDotH+rArrow;
var plusCobmo=cDot+lArrow;
var commCobmo=cDotH+uArrowH;
var minusCobmo=cDotH+dArrowH;
var perioCobmo=cDotH+rArrowH;
var frwdSlashCobmo=cDotH+lArrowH;
var zeroCobmo=cDot+uArrow+uArrow;
var oneCobmo=cDot+uArrow+dArrow;
var twoCobmo=cDot+uArrow+rArrow;
var threeCobmo=cDot+uArrow+lArrow;
var fourCobmo=cDot+uArrow+uArrowH;
var fiveCobmo=cDot+uArrow+dArrowH;
var sixCobmo=cDot+uArrow+rArrowH;
var sevenCobmo=cDot+uArrow+lArrowH;
var eightCobmo=cDot+dArrow+uArrow;
var nineCobmo=cDot+dArrow+dArrow;
var colonCobmo=cDot+dArrow+rArrow;
var semiColonCobmo=cDot+dArrow+lArrowH;
var lThanCobmo=cDot+dArrow+uArrowH;
var equlCobmo=cDot+dArrow+dArrowH;
var gThanCobmo=cDot+dArrow+rArrowH;
var questCobmo=cDot+rArrow+uArrow;
var atCobmo=cDot+rArrow+dArrow;
//repeat combo (4)
var capACobmo=cDot+rArrow+rArrow;
var capBCobmo=cDot+rArrow+lArrowH;
var capCCobmo=cDot+rArrow+uArrowH;
var capDCobmo=cDot+rArrow+dArrowH;
var capECobmo=cDot+rArrow+rArrowH;
var capFCobmo=cDot+rArrow+lArrowH;
var capGCobmo=cDot+lArrow+uArrow;
var capHCobmo=cDot+lArrow+dArrow;
var capICobmo=cDot+lArrow+rArrow;
var capJCobmo=cDot+lArrow+lArrow;
var capKCobmo=cDot+lArrow+uArrowH;
var capLCobmo=cDot+lArrow+dArrowH;
var capMCobmo=cDot+lArrow+rArrowH;
var capNCobmo=cDot+lArrow+lArrowH;
var capOCobmo=cDot+uArrowH+uArrow;
var capPCobmo=cDot+uArrowH+dArrow;
var capQCobmo=cDot+uArrowH+rArrow;
var capRCobmo=cDot+uArrowH+lArrow;
var capSCombo=cDot+uArrowH+uArrowH;
//gaps go backwards (3)
var capTCobmo=cDot+uArrowH+dArrowH;
var capUCobmo=cDot+uArrowH+rArrowH;
var capVCobmo=cDot+uArrowH+lArrowH;
var capWCobmo=cDot+dArrowH+uArrow;
var capXCobmo=cDot+dArrowH+dArrow;
var capYCobmo=cDot+dArrowH+rArrow;
var capZCobmo=cDot+dArrowH+lArrow;
var rBrktCobmo=cDot+dArrowH+uArrowH;
var lSlashCobmo=cDot+dArrowH+dArrowH;
var lBrktCobmo=cDot+dArrowH+rArrowH;
var karrotCobmo=cDot+dArrowH+lArrowH;
var underScoreCobmo=cDot+rArrowH+uArrow;
var gravAcentCobmo=cDot+rArrowH+dArrow;
var lowACobmo=cDot+rArrowH+rArrow;
var lowBCobmo=cDot+rArrowH+lArrow;
var lowCCobmo=cDot+rArrowH+uArrowH;
var lowDCobmo=cDot+rArrowH+dArrowH;
var lowECobmo=cDot+rArrowH+rArrowH;
var lowFCobmo=cDot+rArrowH+lArrowH;
var lowGCobmo=cDot+lArrowH+uArrow;
var lowHCobmo=cDot+lArrowH+dArrow;
var lowICobmo=cDot+lArrowH+rArrow;
var lowJCobmo=cDot+lArrowH+lArrow;
var lowKCobmo=cDot+lArrowH+uArrowH;
var lowLCobmo=cDot+lArrowH+dArrowH;
var lowMCobmo=cDot+lArrowH+rArrowH;
var lowNCobmo=cDot+lArrowH+lArrowH;
var lowOCobmo=cDotH+uArrow+uArrow;
var lowPCobmo=cDotH+uArrow+dArrow;
var lowQCobmo=cDotH+uArrow+rArrow;
var lowRCombo=cDotH+uArrow+lArrow;
//gaps start at the end (1)
var lowSCobmo=cDotH+uArrow+uArrowH;
var lowTCobmo=cDotH+uArrow+dArrowH;
var lowUCobmo=cDotH+uArrow+rArrowH;
var lowVCobmo=cDotH+uArrow+lArrowH;
var lowWCobmo=cDotH+dArrow+uArrow;
var lowXCobmo=cDotH+dArrow+dArrow;
var lowYCobmo=cDotH+dArrow+rArrow;
var lowZCobmo=cDotH+dArrow+uArrowH;
var rAngBrktCobmo=cDotH+dArrow+dArrowH;
var vBarCobmo=cDotH+dArrow+rArrowH;
var lAngBrktCobmo=cDotH+dArrow+lArrowH;
var tildeCobmo=cDotH+rArrow+uArrow;
var unicodeArray=[spaceCobmo,exclaCobmo,dubQouteCombo,pounCobmo,dollCobmo,precCobmo,ampCobmo,sQoteCobmo,lParaCobmo,rParaCobmo,astrCobmo,plusCobmo,commCobmo,minusCobmo,perioCobmo,frwdSlashCobmo,zeroCobmo,oneCobmo,twoCobmo,threeCobmo,fourCobmo,fiveCobmo,sixCobmo,sevenCobmo,eightCobmo,nineCobmo,colonCobmo,semiColonCobmo,lThanCobmo,equlCobmo,gThanCobmo,questCobmo,atCobmo,capACobmo,capBCobmo,capCCobmo,capDCobmo,capECobmo,capFCobmo,capGCobmo,capHCobmo,capICobmo,capJCobmo,capKCobmo,capLCobmo,capMCobmo,capNCobmo,capOCobmo,capPCobmo,capQCobmo,capRCobmo,capSCombo,capTCobmo,capUCobmo,capVCobmo,capWCobmo,capXCobmo,capYCobmo,capZCobmo,rBrktCobmo,lSlashCobmo,lBrktCobmo,karrotCobmo,underScoreCobmo,gravAcentCobmo,lowACobmo,lowBCobmo,lowCCobmo,lowDCobmo,lowECobmo,lowFCobmo,lowGCobmo,lowHCobmo,lowICobmo,lowJCobmo,lowKCobmo,lowLCobmo,lowMCobmo,lowNCobmo,lowOCobmo,lowPCobmo,lowQCobmo,lowRCombo,lowSCobmo,lowTCobmo,lowUCobmo,lowVCobmo,lowWCobmo,lowXCobmo,lowYCobmo,lowZCobmo,rAngBrktCobmo,vBarCobmo,lAngBrktCobmo,tildeCobmo];
//combo end
//test initial
//inputAd.value="\u2022\u25BA\u25BA\u2022\u25B2\u25B2\u25BC\u2022\u25BA\u2022\u25BA\u2022\u25B2\u25BC\u2022\u25BA\u25BA\u2022\u25BA\u25BA";
//inputAd.value="Succ3ss!";
//inputAd.value="5WEEtUUb";
//var initialization
	var passValue = 0;
	var inputValue = 0;
	var inputArray = 0;
	var passArray = 0;
	var passwordIndex = 0;
	var inputIndex = 0;
	var level_a = 0;
	var level_b = 0;
	var input_a = "";
	var input_b = "";
	var output_c = "";
	var outputIndex = 0;
	var decryptTF=false;
	var unicodeIndex=0;
	var testVar=0;
	//split problem :(
	    function download(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);


    if (window.MSBlobBuilder) { // IE10
        var bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    } /* end if(window.MSBlobBuilder) */



    if ('download' in a) { //FF20, CH19
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    }; /* end if('download' in a) */



    //do iframe dataURL download: (older W3)
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
}
function CopyToClipboard(containerid) {
if (document.selection) { 
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(containerid));
    range.select().createTextRange();
    document.execCommand("copy"); 

} else if (window.getSelection) {
    var range = document.createRange();
     range.selectNode(document.getElementById(containerid));
     window.getSelection().addRange(range);
     document.execCommand("copy");
     //alert("text copied") 
}}
//constat vars
//crypto
function cryptoini(){
	passValue = document.getElementById("passwordBox").value;
	inputValue = document.getElementById("inputBox").value;
	inputArray = inputValue.split("");
	passArray = passValue.split("");
	passwordIndex = passArray.length-1;
	inputIndex = inputArray.length-1;
	level_a = 0;
	level_b = 0;
	input_a = "";
	input_b = "";
	output_c = "";
	outputIndex = 0;
	unicodeIndex=0;
	testVar=0;
}
//unicdoe function
function uniCrypto(decryptTF){
	if(decryptTF){
		for (var i = 94; i >= 0; i--) {
			testArray=inputValue.split(unicodeArray[i]);
			if(testArray.length>1){
					inputValue=testArray.join(asciiArray[i]);
			}}
		inputArray=inputValue.split("");
		inputIndex = inputArray.length-1;
	} else {
			for (var i = 94; i >= 0; i--) {
			testArray=output_c.split(asciiArray[i]);
			if(testArray.length>1){
					output_c=testArray.join(unicodeArray[i]);
			}}
		document.getElementById("output").innerHTML=output_c;
	}
}
//encrypt
function cryptoWork(decryptTF) {
	cryptoini();
		if(document.getElementById("unicodeTrue").checked&&decryptTF===true){
		uniCrypto(decryptTF);
	}
	//console.log("cryptoiniRan");
	for (inputIndex; inputIndex > -1;inputIndex--) {
		//console.log("loop",inputIndex,decryptTF);
		//length of input
		if (passwordIndex < 0) {
			passwordIndex = 0;
		} else if ((level_b > passwordIndex)) {
			level_b = 0;
		};
		input_a = inputArray[level_a];
		input_b = passArray[level_b];
		if(asciiArray.indexOf(input_b) <0){
			input_b=" ";
		};
		if(decryptTF===true){
			outputIndex = asciiArray.indexOf(input_a) - asciiArray.indexOf(input_b);
		} else{
			outputIndex = asciiArray.indexOf(input_a) + asciiArray.indexOf(input_b);
		}
		if (outputIndex >= asciiArray.length) {
			outputIndex = outputIndex - asciiArray.length;
		} 
		else if (outputIndex < 0) {
			outputIndex = outputIndex + asciiArray.length
		};
		output_c = output_c + asciiArray[outputIndex];
		//console.log(output_c);
		level_a = level_a + 1;
		level_b = level_b + 1;
	}
	if(document.getElementById("unicodeTrue").checked&&decryptTF===false){
		uniCrypto(decryptTF);
	}
	//console.log(output_c,"output_c");
	var output_d=output_c.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
	document.getElementById("output").innerHTML=output_d;
	if(document.getElementById("downloadTF").checked){
		download(output_d, "name", "text/plain");
	}
	if(document.getElementById("copyTF").checked){
		CopyToClipboard('output');
	}



}
//end
//call functions/event functions
function encryptAll(){
	console.log("encryptAll");
	cryptoWork(false);
	console.log("encryptDone");
};
function decryptAll(){
	console.log("decryptAll");
	cryptoWork(true);
	console.log("decryptDone");
};

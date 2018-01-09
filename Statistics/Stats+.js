
frequency=new Object();
frequency.grid=new Object();
frequency.grid.listNames=["Lb1","Lb2","Lb3"];
frequency.grid.first=[
	[1,1,0],
	[1,4,1],
	[1,1,2]
];
frequency.first=[];
frequency.createBaseFreq=function(){
	for(x=0;x<frequency.grid.first.length;x++){
		frequency.first[x]=frequency.grid.first[x][x];
	}
}
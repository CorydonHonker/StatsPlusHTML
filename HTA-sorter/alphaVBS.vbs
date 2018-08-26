'Set window.onload = GetRef("WindowLoad('OwO InnerHTML')")
dim myImgArr()
arrPos=0
myFileCount=0
srcFolder=""
outFolder=""

Function WindowLoad(myData)
    Dim oElm 
    Set oElm = document.getElementById("dataArea")
    if oElm Is Nothing then
        MsgBox("dataArea element does not exist")
    else
        oElm.innerHTML = myData
    end if
End Function

Function ImgLoad(myImg)
    Dim oElm 
    Set oElm = document.getElementById("imgArea")
    if oElm Is Nothing then
        MsgBox("imgArea element does not exist")
    else
        oElm.src = myImg
    end if
End Function

Function infoLoad(myInfo)
    Dim oElm 
    Set oElm = document.getElementById("myInfoBloc")
    if oElm Is Nothing then
        MsgBox("imgArea element does not exist")
    else
        oElm.innerHTML = myInfo
    end if
End Function

Function SelectFolder( myStartFolder )
' This function opens a "Select Folder" dialog and will
' return the fully qualified path of the selected folder
'
' Argument:
'     myStartFolder    [string]    the root folder where you can start browsing;
'                                  if an empty string is used, browsing starts
'                                  on the local computer
'
' Returns:
' A string containing the fully qualified path of the selected folder
'
' Written by Rob van der Woude
' http://www.robvanderwoude.com
	' Standard housekeeping
    Dim objFolder, objItem, objShell 
    ' Custom error handling
    On Error Resume Next
    SelectFolder = vbNull
    ' Create a dialog object
    Set objShell  = CreateObject( "Shell.Application" )
    Set objFolder = objShell.BrowseForFolder( 0, "Select Folder", 0, myStartFolder )
    ' Return the path of the selected folder
    If IsObject( objfolder ) Then SelectFolder = objFolder.Self.Path
    ' Standard housekeeping
    Set objFolder = Nothing
    Set objshell  = Nothing
    On Error Goto 0
End Function

Function folderSelecter()
	srcFolder=SelectFolder("")
	if (IsNumeric(srcFolder)) then
		infoLoad("error")
	else
		infoLoad(srcFolder)
		listFiles()
	end IF
End Function

Function folderSelecterOut()
	outFolder=SelectFolder("")
	if (IsNumeric(outFolder)) then
		infoLoad("error")
	else
		infoLoad(outFolder)
	end IF
End Function

Function countFiles(strDirectory)
Dim fso, folder, files, OutputFile
Dim strPath, filecnt
Dim item
Set fso = CreateObject("Scripting.FileSystemObject")
Set objFSO = CreateObject("Scripting.FileSystemObject")
set objFolder = objFSO.GetFolder(strDirectory)
Set folder = fso.GetFolder(objFolder.Path)
Set files = folder.Files
filecnt = 0
For each item In files
	filecnt = filecnt + 1
Next
countFiles = filecnt
End Function

Function listFiles()
	'reDim myImgArr(44)'REDIM
	arrPos=0
	myList = "FileNames:<br/>"
	objStartFolder = srcFolder
	myFileCount=countFiles(srcFolder&"\")
	reDim myImgArr(myFileCount)'REDIM
	Set objFSO = CreateObject("Scripting.FileSystemObject")
	Set objFolder = objFSO.GetFolder(objStartFolder)
	Set colFiles = objFolder.Files
	For Each objFile in colFiles
		myMimeType=getMimeType(objFile.Name)
		IF myMimeType="----------" Then
			myList = myList&"*===ERROR===*<br/>"
		Else
		myImgArr(arrPos)=objFile.Name
		arrPos=arrPos+1
	     myList = myList & objFile.Name &"<br/>"
		End IF
	Next
	WindowLoad(myList)
End Function

Function getMimeType(fileName)
	nameLength=len(fileName)
	mimePos=InStrRev(fileName,".")
	if mimePos>0 Then
		fileMime=right(fileName,nameLength-mimePos)
		getMimeType=fileMime
	else
		getMimeType="----------"
	End If
	
End Function

Function newImg()
	if (arrPos>0) Then
		arrPos=arrPos-1
		ImgLoad(srcFolder&"\"&myImgArr(arrPos))
		infoLoad(srcFolder&"\"&myImgArr(arrPos))
		'WindowLoad("<img id="imgArea" height:900px width:1600px src="""&srcFolder&"\"&myImgArr(arrPos)&"""/>")
	End IF
End Function

Function increment(incVAl)
    Dim oElm 
    Set oElm = document.getElementById("imgScore")
    if oElm Is Nothing then
        MsgBox("imgScore element does not exist")
    else
        score=oElm.innerHTML
    end if	
    	score=CInt(score)
    	score=score+incVAl
    	oElm.innerHTML=score
End function

Function rankImg(voteVal)
    Set objFSO = CreateObject("Scripting.FileSystemObject")
    Dim oElm 
    Set oElm = document.getElementById("imgScore")
    if oElm Is Nothing then
        MsgBox("imgScore element does not exist")
    else
        score=oElm.innerHTML
    end if
    locationA=srcFolder
    imgFile=myImgArr(arrPos)
    locationB=outFolder
    score=CInt(score)+voteVal
    targrtFile=locationA&"\"&imgFile
    newDir=locationB&"\"&score
    'infoLoad(locationA&"::"&locationB&"::"&imgFile&"::"&score&"::"&voteVal)
	If Not objFSO.FolderExists(newDir) Then
	    newfolder = objFSO.CreateFolder(newDir) 
	End If
		objFSO.CopyFile targrtFile, newDir&"\"
    	newImg()
End Function

Function sayHello()
	WindowLoad("This is HTA")
End Function
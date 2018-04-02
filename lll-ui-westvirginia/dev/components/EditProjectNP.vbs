Set objFSO = CreateObject("Scripting.FileSystemObject")

objStartFolder = "C:\inetpub\wwwroot\GIT\lll-ui\dev\components\"

Set objFolder = objFSO.GetFolder(objStartFolder)


Set Shell = WScript.CreateObject("WScript.Shell")

Wscript.Echo objFolder.Path

Set colFiles = objFolder.Files

jsFileList = ""

jsCompiled = ""


ShowSubfolders objFSO.GetFolder(objStartFolder)

WriteFile "js_list.txt", jsFileList
'WriteFile "js_compiled.txt", jsCompiled
'Showtxtfile("js_compiled.txt")

MsgBox "Done"

Sub ShowSubFolders(Folder)
	
	

    For Each Subfolder in Folder.SubFolders

       ' Wscript.Echo Subfolder.Path

        Set objFolder = objFSO.GetFolder(Subfolder.Path)

        Set colFiles = objFolder.Files
		
		
		If objFolder.Files.Count > 0 Then

			For Each objFile in colFiles

				Set re 		= New RegExp
				
				re.Pattern 	= ".js"
				
					If re.Test(objFile.Name) Then
						
						jsFileList = jsFileList & vbCrLf & objFile.Path 
						
						
						codeFile = GetFile(objFile.Path)
						
						AddTitlePage codeFile, objFile.Path
							
						jsCompiled = jsCompiled &  codeFile
						
						Opentxtfile(objFile.Path)
					
					 
					End If
			   
			Next
		
		End IF 
		
      
       ShowSubFolders Subfolder

    Next
	
	'Wscript.Echo jsFileCount
 
End Sub

Sub Printtxtfile(filename)

	Shell.Run("Notepad /p " & filename)
	
End Sub

Sub Opentxtfile(filepath)

cmd = """C:\Program Files (x86)\Notepad++\notepad++.exe """ & filepath

Shell.Run(cmd)

End Sub

Sub Showtxtfile(filename)

	Shell.Run("Notepad " & filename)
	
End Sub


Function AddTitlePage(txtData, titleName)

startString = "" 

startString = startString  &  "+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +" & vbCrLf & vbCrLf & vbCrLf & vbCrLf 

startString = startString  & titleName

startString = startString  &  vbCrLf & vbCrLf & vbCrLf &  vbCrLf 

startString = startString  &  "+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +" & vbCrLf & vbCrLf & vbCrLf & vbCrLf 

txtData = startString & txtData 

End Function


''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''	 
	 
	 Function GetFile(FileName)

		If FileName<>"" Then

		Dim FS, FileStream

		Set FS = CreateObject("Scripting.FileSystemObject")

		  Set FileStream = FS.OpenTextFile(FileName)
		  
		  GetFile = FileStream.ReadAll
		  
		 End If

	End Function

''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''	 

Function WriteFile(FileName, Contents)

		Dim OutStream, FS
		
		Set FS = CreateObject("Scripting.FileSystemObject")

		Set OutStream = FS.OpenTextFile(FileName, 2, True,-1)

		OutStream.Write Contents

End Function
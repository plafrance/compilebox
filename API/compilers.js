
/*
	This file stores the compiler/interpretor details that are provided to DockerSandbox.sh	by the app.js
	The index is the key field, 
	First column contains the compiler/interpretor that will be used for translation
	Second column is the file name to use when storing the source code
	Third column is optional, it contains the command to invoke the compiled program, it is used only for compilers
	Fourth column is just the language name for display on console, for verbose error messages
	Fifth column is optional, it contains additional arguments/flags for compilers

	You can add more languages to this API by simply adding another row in this file along with installing it in your
	Docker VM.

	Author: Osman Ali 
	Date: 3 - JUN - 2014
	*Revised on: 30th June 2014 (Added Column number 4 to display the name of languages to console)
*/

exports.compilerArray= [ ["python","file.py","nul","Python",""],
			 ["ruby","file.rb","nul","Ruby",""],
			 ["clojure","file.clj","nul","Clojure",""],
			 ["php","file.php","nul","Php",""],
			 ["nodejs","file.js","nul","Nodejs",""],
			 ["scala","file.scala","nul","Scala",""],
			 ["\'go run\'","file.go","nul","Go",""],
			 ["\'g++ -o /usercode/a.out\' ","file.cpp","/usercode/a.out","C/C++",""],
			 ["javac","file.java","\'./usercode/javaRunner.sh\'","Java",""],
			 ["\'vbnc -nologo -quiet\'","file.vb","\'mono /usercode/file.exe\'","VB.Net",""],
			 ["gmcs","file.cs","\'mono /usercode/file.exe\'","C#",""],
			 ["/bin/bash","file.sh"," ","Bash",""],
			 ["gcc ","file.m"," /usercode/a.out","Objective-C","\' -o /usercode/a.out -I/usr/include/GNUstep -L/usr/lib/GNUstep -lobjc -lgnustep-base -Wall -fconstant-string-class=NSConstantString\'"],
			 ["/usercode/sql_runner.sh","file.sql","nul","MYSQL",""],
			 ["perl","file.pl","nul","Perl",""] ];


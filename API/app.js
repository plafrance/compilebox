/*
        *File: app.js
        *Author: Asad Memon / Osman Ali Mian
        *Last Modified: 5th June 2014
        *Revised on: 30th June 2014 (Introduced Express-Brute for Bruteforce protection)
*/


var express = require('express');
var arr = require('./compilers');
var sandBox = require('./DockerSandbox');
var app = express.createServer();
var port=12380;


//var ExpressBrute = require('express-brute');
//var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
//var bruteforce = new ExpressBrute(store,{
//    freeRetries: 2,
//    minWait: 500
//});
//
app.use(express.static(__dirname));
app.use(express.bodyParser());

app.all('*', function(req, res, next) 
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

function random(size) {
    //returns a crypto-safe random
    return require("crypto").randomBytes(size).toString('hex');
}


app.post('/compile',function(req, res) 
{

    var language = req.body.language;
    var code = req.body.code;
    var stdin = req.body.stdin;
    var parameters = req.body.parameters;

    var folder= 'temp/' + random(10); //folder in which the temporary folder will be saved
    var path=__dirname+"/"; //current working path

    if(arr.compilerArray[language][0]=="sshd"){
	var vm_name=req.body.vm_name; //name of virtual machine that we want to execute
	var timeout_value=600;//Timeout Value, In Seconds
    }
    else{
	var vm_name='remotecompiler'; //name of virtual machine that we want to execute
	var timeout_value=20;//Timeout Value, In Seconds
    }

    //details of this are present in DockerSandbox.js
    var sandboxType = new sandBox(timeout_value,path,folder,parameters,vm_name,arr.compilerArray[language][0],arr.compilerArray[language][1],code,arr.compilerArray[language][2],arr.compilerArray[language][3],arr.compilerArray[language][4],stdin);


    //data will contain the output of the compiled/interpreted code
    //the result maybe normal program output, list of error messages or a Timeout error
    if(arr.compilerArray[language][0]=="sshd"){
	sandboxType.run(function(contid, ip, port, res_valid)
			{
    			    res.send({cont_id:contid, add_ip:ip, add_port:port, resultat:res_valid});
			});
    }
    else{
    sandboxType.run(function(data,exec_time,err)
    {
        //console.log("Data: received: "+ data)
    	res.send({output:data, langid: language,code:code, errors:err, time:exec_time});
    });
    }
   
});

console.log("Listening at "+port)

//N'accepte que les connexions locales
app.listen(port, '127.0.0.1');

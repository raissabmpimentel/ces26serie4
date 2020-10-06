var express = require('express');
var app = express();
app.use(express.static('static'));

var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: __dirname + '/tmp/'}).single('file'));

app.get('/', function (req,res) {
    res.sendFile(__dirname + "/static/" +"index.html"); 
});

app.get('/get', function (req,res) {
    res.sendFile(__dirname + "/static/" +"get.html"); 
});

app.get('/upload', function (req,res) {
    res.sendFile(__dirname + "/static/" +"upload.html"); 
});

app.get('/form_get', function(req, res)
{
    var response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name,
        age: req.query.age
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

app.post('/file_upload', function (req, res) {
    console.log(req.file.originalname);
    console.log(req.file.path);
    console.log(req.file.mimetype);
    var file = __dirname + "/upload/" + req.file.originalname;
    
    fs.readFile(req.file.path, function (err, data) {
       fs.writeFile(file, data, function (err) {
          if(err) {
             console.log(err);
             } else {
                var response = {
                   message:'Arquivo salvo com sucesso',
                   filename:req.file.originalname,
                   filepath:file
                };
             }
          
          console.log(response);
          res.end(JSON.stringify(response));
       });
    });
 })

var server = app.listen (8081, function () {
var port = server.address().port;
console.log("Example app listening at http://127.0.0.1:%s", port );
});
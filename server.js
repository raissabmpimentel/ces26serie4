var express = require('express');
var app = express();
app.use(express.static('static'));

var multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

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

 app.post('/file_upload', upload.single('file'), function (req, res) {
    console.log(req.file.originalname);
    console.log(req.file.path);
    console.log(req.file.mimetype);

    var response = {
        message:'Arquivo salvo com sucesso',
        filename:req.file.originalname,
        filepath:req.file.path
    };
          
    console.log(response);
    res.end(JSON.stringify(response));
});  

var server = app.listen (8081, function () {
var port = server.address().port;
console.log("Example app listening at http://127.0.0.1:%s", port );
});
var express = require('express');
var app = express();
app.use(express.static('static')); // Permitir acesso a arquivos de static

// Definir multer para upload de arquivos
// Baseado em http://cangaceirojavascript.com.br/express-realizando-upload-multer/
var multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads/') // Salvar na pasta uploads
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // O nome do arquivo salvo tem a data e o nome do arquivo original
    }
});
const upload = multer({ storage });

// Pagina inicial
app.get('/', function (req,res) {
    res.sendFile(__dirname + "/static/" +"index.html"); 
});

// Formulario de get
app.get('/get', function (req,res) {
    res.sendFile(__dirname + "/static/" +"get.html"); 
});

// Formulario de upload de arquivos
app.get('/upload', function (req,res) {
    res.sendFile(__dirname + "/static/" +"upload.html"); 
});

// Pagina com a leitura de JSON via AJAX
app.get('/ajax', function (req,res) {
    res.sendFile(__dirname + "/static/" +"ajax.html"); 
});

// Pegar dados do formulario via GET e dar como resposta um JSON com esses dados
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

// Fazer upload propriamente dito do arquivo via POST, retornando um JSON com uma mensagem, o nome do arquivo, seu caminho e tipo
// Baseado em http://cangaceirojavascript.com.br/express-realizando-upload-multer/
app.post('/file_upload', upload.single('file'), function (req, res) {

    var response = {
        message:'Arquivo salvo com sucesso',
        filename:req.file.filename,
        filepath:req.file.path,
        type:req.file.mimetype
    };
          
    console.log(response);
    res.end(JSON.stringify(response));
});  

var server = app.listen (8081, function () {
var port = server.address().port;
console.log("App escutando em http://127.0.0.1:%s", port);
});
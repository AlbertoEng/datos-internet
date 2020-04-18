
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const path = require('path')
const http = require('http');

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', process.env.PORT || 3000);

app.use(bodyparser.urlencoded({extended:false}));
app.use(express.json());

app.set('views', path.resolve(__dirname,'views'));
app.set('view engine', 'ejs');

io.on('connection', function (socket) {
    console.log("socket conected")
});



app.get('/',(req,res)=>{
    res.render('index',{
        valor : req.body.dato
    });
});

app.post('/', (req,res)=>{
    console.log(req.body);
    io.emit('datos', { valor: req.body.dato });
    res.render('index',{
        valor : req.body.dato
    });
});

server.listen(app.get('port'));
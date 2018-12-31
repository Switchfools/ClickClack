
let express = require('express');
var path = require('path');
let cmd = require('node-cmd');
let nodemailer = require('nodemailer')
let emailTemplates = require('email-templates');
let ejs = require('ejs');
let app = express();
var server = app.listen(process.env.PORT || 3000, listen)
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'ejs');
var io = require('socket.io')(server);

var s

function listen() {
  var port = server.address().port;
  console.log('Server listening at http://127.0.0.1:' + port);
}
try {

} catch (e) {

} finally {

}
function run(cmd,options ,callback) {
    var spawn = require('child_process').spawn;
    var command = spawn(cmd,options);
    var result = '';
    command.stdout.on('data', function(data) {
                      result += data.toString();
                      });
    command.on('close', function(code) {
               return callback(result);
               });
}
app.use(express.static('public'));

io.sockets.on('connection',
  function (socket) {
    s = socket

    console.log('Socket connection: ' + socket.id);
    socket.on('mail',
      function(data) {
        sendMail(data.mail)
      }
    );
          socket.on('print', function() {
                    run("nfc-mfclassic",['r','A','u','dummy.mfd','clave.mfd','f'],function(result) {a=result.slice(-6,-1); if(a==='Done.'){a='imprime'};
                        console.log(a)});
                    })

    socket.on('capture',function(){
              run('python3', ['public/modify.py'],function(result) { console.log(result) });})
  }
)

function sendMail(email){
    var transporter = nodemailer.createTransport({
                                                 service: 'gmail',
                                                 auth: {
                                                 user: 'carlosrincon01@gmail.com',
                                                 pass: '040695.google'
                                                 }
                                                 })
    var mailOptions = {
    from: 'carlosrincon01@gmail.com',
    to: email,
    subject: 'Pink BTN',
    text: 'Click Clack!',
    attachments:[{
                 filename: 'picture.png',
                 path: __dirname + '/public/assets/picture.png',
                 cid: 'picture'
                 }],
    html: { path: 'public/template.html' }
    }
    transporter.sendMail(mailOptions, function(error, info){
                         if (error) {
                         console.log(error)
                         } else {
                         console.log('Email sent to: '+ email + '\nResponse: ' + info.response)
                         }
                         });
}

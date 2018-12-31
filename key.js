function run(cmd, callback) {
    var spawn = require('child_process').spawn;
    var command = spawn(cmd);
    var result = '';
    command.stdout.on('data', function(data) {
                      result += data.toString();
                      });
    command.on('close', function(code) {
               return callback(result);
               });
}

result=run("ls", function(result) {a=result.slice(-4,-1); if(a==='.js'){a='putos'};
           console.log(a)});

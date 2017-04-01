var mongoose = require('mongoose');
var dbURI = "mongodb://localhost:27017/Loc8r"
// var dbURI = "mongodb://heroku_zh58mm6r:b0fo05f7u8quemctlhndonhc1u@ds137090.mlab.com:37090/loc8rtest"
var gracefulShutdown;

//mongo ds137090.mlab.com:37090/loc8rtest -u heroku_zh58mm6r -p b0fo05f7u8quemctlhndonhc1u


//declarations for secondary database
//var dbURIlog = 'mongodb://localhost/Loc8rLog';
// var logDB = mongoose.createConnection(dbURIlog);

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
  console.log('mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected');
});

gracefulShutdown = function(message, callback){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through ' + message);
    callback();
  });
};

//secondary named connection open and close
// logDB.on('connected', function(){
//   console.log('Mongoose connected to ' + dbURIlog);
// });
//
// logDB.close(function(){
//   console.log('Mongoose log disconnected');
// });
//

//begin section of termination handlers

//for nodemon restarts
process.once('SIGUSR2', function(){
  gracefulShutdown('nodemon restart', function(){
    process.kill(process.pid, 'SIGUSR2');
  });
});

//for app termination
process.on('SIGINT', function(){
  gracefulShutdown('app termination', function(){
    process.exit(0);
  });
});

//for heroku app termination
process.on('SIGTERM', function(){
  gracefulShutdown('Heroku app shutdown', function(){
    process.exit(0);
  });
});


require('./locations');

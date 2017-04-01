var mongoose = require('mongoose');
var Loc = mongoose.model('Locations');
var ObjectID = require('mongodb').ObjectID;

var sendJsonResponse = function(response, status, content){
  response.status(status);
  response.json(content);
};

module.exports.locationsCreate = function(request, response){
  sendJsonResponse(response, 200, {"status" : "success"});
};

module.exports.locationsListByDistance = function(request, response){
  sendJsonResponse(response, 200, {"status" : "success"});
};

module.exports.locationsFindName = function(request, response){
  var query = Loc.findOne({
    'name' : 'Cafe Hero'
  });
  query.exec(function(error, location){
    if(!location) {
      sendJsonResponse(response, 404, {"message" : "name not found"});
      return;
    }
    console.log(location);
    sendJsonResponse(response, 200, location);
    return;
  })
};

module.exports.locationsReadOne = function(request, response){
  console.log('Finding location details', request.params);
  if (request.params && request.params.locationid){

    //for use with mlab
    // var query = Loc.findById({
    //   "id" :ObjectID(request.params.locationid)
    // });

    //for use with local mongo
    var query = Loc.findById(request.params.locationid)

    query.exec(function (error, location) {
      if(!location) {
        sendJsonResponse(response, 404, {
          "message" : "locationID not found"
        });
        return;
      } else if (error) {
        sendJsonResponse(response, 404, error);
        return;
      }
      console.log(location);
      sendJsonResponse(response, 200, location);
    });
  } else {
    sendJsonResponse(response, 404, {
      "message" : "no LocationID in reuqest"
    });
  }
};

module.exports.locationsUpdateOne = function(request, response){
  sendJsonResponse(response, 200, {"status" : "success"});
};

module.exports.locationsDeleteOne = function(request, response){
  sendJsonResponse(response, 200, {"status" : "success"});
};

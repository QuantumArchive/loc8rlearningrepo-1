var mongoose = require('mongoose');
var Loc = mongoose.model('Locations');
var ObjectID = require('mongodb').ObjectID;

var sendJsonResponse = function(response, status, content){
  response.status(status);
  response.json(content);
};

module.exports.reviewCreate = function(request, response){
  sendJsonResponse(response, 200, {"status" : "success"});
};

module.exports.reviewReadOne = function(request, response){
  if (request.params && request.params.locationid && request.params.reviewid){
    var query = Loc.findById(request.params.locationid);
    query.select('name reviews');
    query.exec(
      function(error, location){
        var revResponse, review;
        if (!location) {
          sendJsonResponse(response, 404, {
            "message" : "locationid not found"
          });
          return;
        } else if (error) {
          sendJsonResponse(response, 400, error);
          return;
        }
        if (location.reviews && location.reviews.length > 0) {
          review = location.reviews.id(request.params.reviewid);
          console.log(location.reviews);
          if (!review){
            sendJsonResponse(response, 404, {
              "message" : "reviewid not found"
            });
          } else {
            revResponse = {
              location : {
                name : location.name,
                id: request.params.locationid
              },
              review : review
            };
            sendJsonResponse(response, 200, revResponse);
          }
        } else {
          sendJsonResponse(response, 404, {
            "messsage" : "No reviews found"
          });
        }
    });
  } else {
    sendJsonResponse(response, 404, {
      "message" : "Not found, locationid and reviewid are both required"
    });
  }
};

module.exports.reviewUpdateOne = function(request, response){
  sendJsonResponse(response, 200, {"status" : "success"});
};

module.exports.reviewDeleteOne = function(request, response){
  sendJsonResponse(response, 200, {"status" : "success"});
};

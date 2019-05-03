//Import the necessary libraries/declare the necessary objects
// express is used to create a simple web server
var express = require("express");
// 
const Nexmo = require('nexmo');
// body-parser is a third-party parsing library.
var myParser = require("body-parser");
var app = express();
var PORT = 8080;

//use the body parser middleware in express
app.use(myParser.urlencoded({extended : false}));
app.use(myParser.json());

//prepare middleware to extract appId
app.param('appId', function(request, response, next, appId) {
    request.appId = appId;

    next();
});


// Create a route for /numbers
// An example inbound GET would be {domain}/numbers?api_key=xxxxf&api_secret=zzzz&type=landline&country=DE&features=SMS,VOICE

  app.get("/numbers", function(request, response) {

// Get URL parameters from request  
  const nexmo = new Nexmo({
    apiKey: request.query.api_key,
    apiSecret: request.query.api_secret,
//    applicationId: request.query.appId, // appId is not required for this request 
  }, );

// Send request to Nexmo using Nexmo node libraries and respond with json values
nexmo.number.get(function(err,rows){
            if(err) {
                response.status(500).json({"Error" : true, "Message" : "Error executing request"});
            } else {
                response.status(200).json(rows);
}
        });

    console.log("Process request for  list of numbers associated with account " + request.query.api_key);
});

// Create a route for /numbers/application
  app.post('/numbers/application/:appId', function(request, response) {
     console.log('Received this appId: ' + request.params.appId); //This prints the appId received
     response.sendStatus(200);

});

// Create a route for /numbers/application
  app.post('/numbers/applications/', function(request, response) {
     console.log('Received this appId: ' + request.params.appId); //This prints the appId received
     response.sendStatus(200);

});



//Start the server and make it listen for connections on port 8080 
app.listen(PORT);

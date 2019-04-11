//Import the necessary libraries/declare the necessary objects
// express is used to create a simple web server
var express = require("express");
// body-parser is a third-party parsing library.
var myParser = require("body-parser");
var app = express();

//use the body parser middleware in express
app.use(myParser.urlencoded({extended : false}));
app.use(myParser.json());

//prepare middleware to extract appId
app.param('appId', function(request, response, next, appId) {
    request.appId = appId;

    next();
});


// Create a route for /numbers
  app.post("/numbers/", function(request, response) {
     console.log(request.body); //This prints the JSON document received (if it is a JSON document)
     response.sendStatus(200);

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
app.listen(8080);

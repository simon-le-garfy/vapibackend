//Import the necessary libraries/declare the necessary objects
// express is used to create a simple web server
var express = require("express");
// \
const Nexmo = require('nexmo');
// body-parser is a third-party parsing library.
var myParser = require("body-parser");
var app = express();
var PORT = 8080;

//use the body parser middleware in express
app.use(myParser.urlencoded({extended : false}));
app.use(myParser.json());

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

    console.log('Processed request for  list of numbers associated with account ' + request.query.api_key);
});

// Create a route for /numbers/application
// An example inbound GET would be {domain}/application/?app_id=xxxxxx-xxxx-xxxx-xxxx-xxxxxx&api_key=xxxxxxx&api_secret=xxxxxx
  app.get("/application", function(request, response) {

          
// Get URL parameters from request  
  const nexmo = new Nexmo({
    apiKey: request.query.api_key,
    apiSecret: request.query.api_secret,
  }, );

// Send request to Nexmo using Nexmo node libraries and respond with json values
nexmo.applications.get(request.query.app_id,function(err,rows){
            if(err) {
                response.status(500).json({"Error" : true, "Message" : "Error executing request"});
            } else {
                response.status(200).json(rows);
}
        });

     console.log('Processed request for  details of this application ' + request.query.app_id);
          
});

  app.get("/applications", function(request, response) {

// Get URL parameters from request  
  const nexmo = new Nexmo({
    apiKey: request.query.api_key,
    apiSecret: request.query.api_secret,
  }, );

// Send request to Nexmo using Nexmo node libraries and respond with json values
nexmo.application.get(function(err,rows){
            if(err) {
                response.status(500).json({"Error" : true, "Message" : "Error executing request"});
            } else {
                response.status(200).json(rows);
}
        });

     console.log('Processed request for list of all applications associated with account ' + request.query.api_key);

});

// Create a route for /application
// An example inbound POST would be {domain}/application/?app_id=1a648832-af31-4c90-9330-5e11689e63f4&api_key=xxxxxx&api_secret=yyyyyy&country=de&msisdn=498944314615001&action=configure

app.post("/application", function(request, response) {
         console.log("Running POST /application");
        // Get URL parameters from request
        const nexmo = new Nexmo({
                                apiKey: request.query.api_key,
                                apiSecret: request.query.api_secret,
                                }, );

         var params = {
         voiceCallbackType: "app",
         voiceCallbackValue: "request.query.app_id"
         };
         
         // Send request to Nexmo using Nexmo node libraries and respond with json values
         if (request.query.action == "configure") {
         nexmo.number.update(request.query.country, request.query.msisdn, params, function(err,rows){
                               if(err) {
                               response.status(500).json({"Error" : true, "Message" : "Error executing request"});
                               } else {
                               response.status(200).json(rows);
                               }
                               });
         };
         // Send request to Nexmo using Nexmo node libraries and respond with json values
         if (request.query.action == "unconfigure") {
         nexmo.number.update(request.query.country, request.query.msisdn, function(err,rows){
                             if(err) {
                             response.status(500).json({"Error" : true, "Message" : "Error executing request"});
                             } else {
                             response.status(200).json(rows);
                             }
                             });
         
         };
         
         
         console.log('Processed request for list of all applications associated with account ' + request.query.api_key);
         
         });
         
         
// Create a route for /numbers/application
  app.post('/numbers/applications/', function(request, response) {
     console.log('Received this appId: ' + request.params.app_id); //This prints the appId received
     response.sendStatus(200);

});



//Start the server and make it listen for connections on port 8080 
app.listen(PORT);

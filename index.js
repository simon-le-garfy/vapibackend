//Import the necessary libraries/declare the necessary objects
// express is used to create a simple web server
var express = require('express');
var app = express();

// HTTP listening port for express
var PORT = 8080;

// Dependencies
var numbers = require ('./numbers');
var application = require ('./application');
var initCredentials = require('./initCredentials');
var association = require('./association');
var updateAppUris = require('./updateAppUris');

// Enable logging for the http express server (https://github.com/expressjs/morgan)
var morgan = require('morgan');
morgan('tiny');

// body-parser is a third-party parsing library useful in some cases
var myParser = require("body-parser");

//use the body parser middleware in express
app.use(myParser.urlencoded({extended : false}));
app.use(myParser.json());

// Create a route for inbound get requests
// An example inbound GET would be {domain}/numbers?api_key=xxxxf&api_secret=zzzz&type=landline&country=DE&features=SMS,VOICE
// In this case we will use a switch to determine the required action based  on the received URL. An alternative approach would be to use app.Router class
 
app.all("/:path", function(request, response) {  // Allow GET or POST
 
  const nexmo = initCredentials(request.query, response); // Obtain API key and secret from URI query parameters and populate nexmo object
       
        const path = request.params.path;
        console.log('Switching based on this path /' + request.params.path);

        switch(path) {                         // Switch based on the path in the URL of the GET request 
          case 'numbers' :                     // Matching on /numbers
           console.log('Matched /numbers ');
           numbers(request.query, response, nexmo);
          break;
       
          case 'application' :               // Matching on /application
            console.log('Matched /application ');
            application(request.query, response, nexmo);
            updateAppUris(request.query, response, nexmo);
          break;

          case 'association' :
            console.log('Match /association ');
            association(request.query, response, nexmo);
          break

          case 'ncco' :
            console.log('Match /ncco ');
            ncco(request.query, response, nexmo);
          break

          case 'event' :
            console.log('Match /event ');
            console.log(req.body);
            res.status(204).end();
          break

          default :
            if (agentMapping[path] != undefined) {
              
            }
            console.log('No match on URI path');        // Catch-all
        }
   });

    
//Start the server and make it listen for connections on port 8080 
app.listen(PORT);
console.log ('Listening on port: ' + PORT);


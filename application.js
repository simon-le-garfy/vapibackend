application = function (requestQuery, response, nexmo) {
 // check if applicationId has been provided in URL queries. If not supplied set to 'null' as nexmo.applications.get expects it to be defined, even if defined as null

    if (requestQuery.action != undefined) {
        
        const action = requestQuery.action
        switch (requestQuery.action) {
            case 'configure' :                      // action=configure received in URL query parameters 
                console.info('configure action being processed');
// *** TO-DO add some parameter validation
                var numberParams = {
                    voiceCallbackType: 'app',
                    voiceCallbackValue: requestQuery.app_id
                };
               console.log('Configuring number: ' + requestQuery.msisdn + ' on appID ' + requestQuery.app_id);
                nexmo.number.update(requestQuery.country, requestQuery.msisdn, numberParams, function(err,rows){
                        if(err) {
                    response.status(500).json({"Error" : true, "Message" : "Error executing configure request"});
                        } else {
                        response.status(200).json(rows);
                                }   
                    });
            break

            case 'unconfigure' :                    // action=unconfigure received in URL query parameters 
                console.log('unconfigure action being processed');
               // *** TO-DO add some parameter validation
               var params = {
                voiceCallbackType: 'app',
                voiceCallbackValue: ''
            };
            nexmo.number.update(requestQuery.country, requestQuery.msisdn, params, function(err,rows){
                if(err) {
            response.status(500).json({"Error" : true, "Message" : "Error executing request"});
                } else {
            response.status(200).json(rows);
                        }
            });
            break

            default :
                response.status(500).json({"Error" : true, "Message" : "Action query is not known"});
        }
   // No action has been specified in URL
   // Now check if an applicationId has been specified
   // If no applicationId is specified set appId to 'null' as nexmo.applications.get requires object to be defined
    } else {
        var appId = null;                           // ensure appId is defined
        if (requestQuery.app_id != undefined) {     // use real value if it has been provided in the URL
            appId = requestQuery.app_id;
        }
        // Send request to Nexmo using Nexmo node libraries and respond with json values
        nexmo.applications.get(appId,function(err,rows){
 // *Todo* Improvde error handling
                               if(err) {
                               response.status(500).json({"Error" : true, "Message" : "Error executing request"});
                               } else {
                               response.status(200).json(rows);
                               }
                               });

    }
}


module.exports = application;                               
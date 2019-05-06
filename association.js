function association(requestQuery, response, nexmo) {

    if ((requestQuery.lvn) || (requestQuery.agent)) {
        
        var agentMapping = {};
        agentMapping[requestQuery.lvn] = requestQuery.agent;
        console.log('Associated ' + requestQuery.lvn + ' with ' + requestQuery.agent)
        console.log(agentMapping);
        response.status(200).send('OK');
   // No action has been specified in URL
   // Now check if an applicationId has been specified
   // If no applicationId is specified set appId to 'null' as nexmo.applications.get requires object to be defined
    } else {
        response.status(500).json({"Error" : true, "Message" : "Please provide both LVN and agent to associate"});
        }
    }

module.exports = association;
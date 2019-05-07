function association(requestQuery, response, agentMapping) {

    if ((requestQuery.lvn) && (requestQuery.agent)) {
        
        agentMapping[requestQuery.lvn] = requestQuery.agent;
        console.log('Associated ' + requestQuery.lvn + ' with ' + requestQuery.agent)
        
        console.log('agentMapping[requestQuery.lvn] ' + agentMapping[requestQuery.lvn]);
        response.status(200).send('OK');
        return (agentMapping);
    } else {
        response.status(500).json({"Error" : true, "Message" : "Please provide both LVN and agent to associate"});
        }
    }

module.exports = association;
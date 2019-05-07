
function createNcco(requestQuery, response, agentMap) {
console.log ('Constructing NCCO');
console.log('agentmapping: ' + agentMap[requestQuery.lvn]);
const ncco = [
    {
      'action': 'connect',
//      'eventUrl': ['https://18627fc4.ngrok.io/event'],
      'timeout': 45, // the default is 60
      'from': requestQuery.lvn,
      'endpoint': [
        {
          'type': 'phone',

          'number': agentMap[requestQuery.lvn] // forwarding to this real number
        }
      ]
    }
  ];
  response.json(ncco);
}

module.exports = createNcco;
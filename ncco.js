NEXMO_TO_NUMBER = 

const ncco = [
    {
      'action': 'connect',
      'eventUrl': ['https://18627fc4.ngrok.io/event'],
      'timeout': 45, // the default is 60
      'from': NEXMO_TO_NUMBER,
      'endpoint': [
        {
          'type': 'phone',
          'number': NEXMO_FROM_NUMBER // forwarding to this real number
        }
      ]
    }
  ];
  res.json(ncco);


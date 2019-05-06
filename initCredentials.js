// Use the nexmo REST API client for Node.js https://github.com/Nexmo/nexmo-node
const Nexmo = require('nexmo');

function initCredentials(requestQuery, request) {
    const nexmo = new Nexmo({
                            apiKey: requestQuery.api_key,
                            apiSecret: requestQuery.api_secret,
                            }, );
    return nexmo;
}
module.exports = initCredentials;
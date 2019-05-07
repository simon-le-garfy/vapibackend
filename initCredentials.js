// Use the nexmo REST API client for Node.js https://github.com/Nexmo/nexmo-node
var apiKey = null;
var apiSecret = null;

const Nexmo = require('nexmo');

function initCredentials(requestQuery, request, skipCredentials) {
    if (skipCredentials) {
        return;
    } else {}
    const nexmo = new Nexmo({
                            apiKey: requestQuery.api_key,
                            apiSecret: requestQuery.api_secret,
                            }, );
    return nexmo;
}
module.exports = initCredentials;
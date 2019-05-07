const ANSWER_URL = 'https://me.me.me/ncco';
const EVENT_URL = 'https://me.me.me/event';

function updateAppUris(requestQuery, response, nexmo) {
   console.log('started updateAppUris');
    if (requestQuery.action != undefined) {
        nexmo.applications.get(requestQuery.app_id, function (err,rows) {
            console.log ('updating webhooks on application: ' + requestQuery.app_id);
            nexmo.applications.update(requestQuery.app_id, rows.name, 'voice', (ANSWER_URL + '?lvn=' + requestQuery.msisdn), EVENT_URL);
});
}
}

module.exports = updateAppUris;
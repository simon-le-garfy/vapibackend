numbers = function (requestQuery, response, nexmo) {
    nexmo.number.get(function(err,rows){
                     if(err) {
                     response.status(500).json({"Error" : true, "Message" : "Error executing request"});
                     } else {
                     response.status(200).json(rows);
                     }
                     });

}
module.exports = numbers;
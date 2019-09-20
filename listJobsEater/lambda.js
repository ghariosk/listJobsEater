let SL_AWS = require('slappforge-sdk-aws');
let connectionManager = require('./ConnectionManager');
const rds = new SL_AWS.RDS(connectionManager);

exports.handler = function (event, context, callback) {

    // You can pass the existing connection to this function.
    // A new connection will be created if it's not present as the third param 
    // You must always end/destroy the DB connection after it's used
    rds.query({
        instanceIdentifier: 'main',
        query: 'Select jobs.category, jobs.subcategory, jobs.duration, jobs.schedule_date, jobs.requested from jobs where userid = ? ORDER by DATE(schedule_date)',
        inserts: [event.enhancedAuthContext.sub]
    }, function (error, results, connection) {
        if (error) {
            console.log("Error occurred");
            throw error;
        } else {
            console.log("Success")
            console.log(results);
             callback(null, { results} );
        }

        connection.end();
    });

   
}
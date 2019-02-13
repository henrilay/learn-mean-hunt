var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/hunt'

var getConnection = function() {
    return new Promise((resolve, reject)=>{
    	MongoClient.connect(url,function(err,db){
            if(err) {
            	console.log("Error creating new connection "+err);
            	reject(err)
           	}
            else {
            	resolve(db)
            	console.log("created new connection");
            }
        });
    })
}

module.exports = getConnection()
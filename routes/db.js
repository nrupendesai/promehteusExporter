const MongoClient = require('mongodb').MongoClient;
var express = require('express');

async function connectDB() {
    const opt = {  
        // authSource: 'admin',
        useNewUrlParser: true,
        poolSize: 500
    }
    MongoClient.connect("mongodb://127.0.0.1:27017", opt, (err, dbs) => {
        if (err) {
            console.log("Error occured in mongodb connection")
            console.log("Error: ", err)
            process.exit(1)
        }
        return dbs;
    })
}


module.exports = dbs
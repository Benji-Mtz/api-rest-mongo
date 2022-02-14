const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://root:root@localhost:27027/";
const database = "deltadb";
const collection = "movies";

const sendGetRequest = async () => {
    try {
        const resp = await axios.get('https://raw.githubusercontent.com/delta-protect/development-test/ecf81af87927f5828d4356ce87c49bfcc305a201/movies.json');
        const { data } = resp;
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(database);
            dbo.collection(collection).insertMany(data, function (err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                db.close();
            });
        });

    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

sendGetRequest();

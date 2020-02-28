const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'REGNAcon';

MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Patrick Stewart", description: "Test"},
        'celebs')
        .then(result => {
            console.log('Insert Document:\n', result.ops);

            return dboper.findDocuments(db, 'celebs');
        })
        .then(docs => {
                console.log('Found Documents:\n', docs);

            return dboper.updateDocument(db, { name: "Patrick Stewart" },
                    { description: "Updated Test" }, 'celebs');

        })
        .then(result => {
            console.log('Updated Document:\n', result.result);

            return dboper.findDocuments(db, 'celebs');
        })
        .then(docs => {
            console.log('Found Updated Documents:\n', docs);
                            
            return db.dropCollection('celebs');
        })
        .then(result => {
            console.log('Dropped Collection:', result);

            return client.close();
        })
        .catch(err => console.log(err));

})
.catch(err => console.log(err));
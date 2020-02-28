const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'REGNAcon';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('celebs', (err, result) => {
        console.log('Dropped Collection: ', result);

        dboper.insertDocument(db, { name: "Patrick Stewart", description: "Test"},
            'celebs', result => {
            console.log('Insert Document:', result.ops);

            dboper.findDocuments(db, 'celebs', docs => {
                console.log('Found Documents:', docs);

                dboper.updateDocument(db, { name: "Patrick Stewart" },
                    { description: "Updated Test Description" }, 'celebs',
                    result => {
                        console.log('Updated Document Count:', result.result.nModified);

                        dboper.findDocuments(db, 'celebs', docs => {
                            console.log('Found  Documents:', docs);
                            
                            dboper.removeDocument(db, { name: "Patrick Stewart" },
                                'celebs', result => {
                                console.log('Deleted Document Count:', result.deletedCount);

                                client.close();
                            });
                        });
                    }
                );
            });
        });
    });
});
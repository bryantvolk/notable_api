// note_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    //UPDATE one note
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };
        const note = {
            text: req.body.body,
            title: req.body.title
        };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                req.send({'error': 'An error has occured'});
            } else {
                res.send(note);
            }
        });
        console.log("PUT");
    });
    //DELETE one note
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });
    //GET all notes
    app.get('/notes', (req, res) => {
        var items = [];
        const cursor = db.collection('notes').find();
        cursor.forEach(printjson);
    });
    //GET one note
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send(item);
            }
        });
        console.log("GET");
    });
    //POST a note
    app.post('/notes', (req, res) => {
        const note = {
            text: req.body.body,
            title: req.body.title
        };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send(result.ops[0]);
            }
        });
        console.log("POST");
    });
};
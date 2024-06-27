const express = require('express');
const db = require('./database');
const route = express.Router();

// Alle ToDos laden
route.get('/todo', (req, res) => {
    db.all('SELECT * FROM todo', [], (e, rows) =>{
        if(e){
            res.status(400).json({error: e.message});
            return;
        }
        res.json({ data: rows});
    });
});

// Neue ToDo speichern
route.post('/todo', (req, res) => {
    const {titel, beschreibung, status} = req.body;

    db.run('INSERT INTO todo (titel, beschreibung, status) VALUES (?, ?, ?)', [titel, beschreibung, status], function(e) {
        if(e){
            res.status(400).json({ error: e.message});
            return;
        }
        res.json({ id: this.lastID});
    });
});

// Änderungen ToDo speichern
route.put('/todo/:ID', (req, res) => {
    const id = req.params.ID;
    const {titel, beschreibung, status} = req.body;

    db.run('UPDATE todo SET titel = ?, beschreibung = ?, status = ? WHERE id = ?', [titel, beschreibung, status, id], function(e){
        if(e){
            res.status(400).json({ error: e.message});
            return;
        }
        res.json({ id, titel, beschreibung, status });
    });
});

// ToDo löschen
route.delete('/todo/:ID', (req, res) => {
    const id = req.params.ID;

    db.run('DELETE FROM todo WHERE id = ?', id, function(e){
        if(e){
            res.status(400).json({ error: e.message});
            return;
        }
        res.json({ deletedID: this.changes});
    });

});

module.exports = route;
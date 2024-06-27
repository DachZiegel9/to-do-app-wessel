const sqlite =  require('sqlite3').verbose();
const db = new sqlite.Database('./database/database.db');

// SQLite Datenbank wird erstellt, wenn noch nicht vorhanden, mit Spaltennamen und Datentyp
db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS todo(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titel TEXT,
            beschreibung TEXT,
            status TEXT
        )`
    );
});

module.exports = db;
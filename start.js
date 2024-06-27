const concurrently = require('concurrently');

// Beide Prozesse parallel starten
const {result} = concurrently([
  { command: 'node src/server.js', name: 'backend', prefixColor: 'blue', cwd: 'backend' },
  { command: 'ng serve', name: 'frontend', prefixColor: 'green', cwd: 'frontend' }
], {
  killOthers: ['failure', 'success'],
  restartTries: 3,
})

// Meldungen, wenn Prozess gestartet
result.then(success => {
  console.log('Beide Prozesse wurden erfolgreich gestartet.');
}).catch(error => {
  console.error('Fehler beim Starten der Prozesse:', error);
});
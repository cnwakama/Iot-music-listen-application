const Influx = require('influx');
var io = require('socket.io-client');
var socket = io("https://glimmer-lying-stoplight.glitch.me");

const client = new Influx.InfluxDB({
  database: 'musicDB',
  // username: 'database',
  // password: 'root',
  hosts: [
    { host: 'localhost' },
  ],
  port: 8086,
});

client.getDatabaseNames()
  .then(names => {
    if (!names.includes('musicDB')) {
      return client.createDatabase('musicDB');
    }
  })
  .then(() => {
    socket.emit('join', "InfluxDB is setup");
  })
  .catch((error) => {
    console.log( error )
  });

socket.on('connect', function(){
  console.log('i am connected to the server');
});



socket.on('results', function(data) {
  console.log(data['note']);
  client.writePoints([
  {
    measurement: 'projectDb',
    fields: { audio: data['audio'], note: data['note'], duration: data['duration'] },
  }], {
    database: 'musicDB',
  })
  .catch(error => {
  console.error(`Error saving data to InfluxDB! ${error.stack}`)
  });
});







// influx.query(`
//     select * from tide
//     where location =~ /(?i)(${place})/
//   `)
//   .then( result => response.status(200).json(result) )
//   .catch( error => response.status(500).json({ error }) );

// influx.writePoints([
//   {
//     measurement: 'response_times',
//     tags: { host: os.hostname() },
//     fields: { duration, path: req.path },
//   }
// ]).then(() => {
//   return influx.query(`
//     select * from response_times
//     where host = ${Influx.escape.stringLit(os.hostname())}
//     order by time desc
//     limit 10
//   `)
// }).then(rows => {
//   rows.forEach(row => console.log(`A request to ${row.path} took ${row.duration}ms`))
// })


// socket.on('connection', (socket) => {
//     socket.emit('join', 'database');
//     socket.on('return', (data) => {
//       console.log(data);
//     });
//   });

const Influx = require('influx');
var app = require('express')();
var http = require('http')
//.createServer(app);
var io = require('socket.io');

var socket = io("https://glimmer-lying-stoplight.glitch.me", {path: '/nodejs/socket.io'});


// const influx = new Influx.InfluxDB({
//   host: 'localhost',
//   database: 'ocean_tides',
//   schema: [
//     {
//       measurement: 'tide',
//       fields: { height: Influx.FieldType.FLOAT },
//       tags: ['unit', 'location']
//     }
//   ]

const client = new InfluxDB({
  database: 'musicDB',
  username: 'databaase',
  password: 'root',
  hosts: [
    { host: 'localhost' },
  ],
  port: 8086,
  schema: [
    {
      measurement: 'tide',
      fields: { height: Influx.FieldType.FLOAT },
      tags: ['unit', 'location']
    }
  ]
});

influx.getDatabaseNames()
  .then(names => {
    if (!names.includes('ocean_tides')) {
      return influx.createDatabase('ocean_tides');
    }
  })
  .then(() => {
    app.listen(app.get('port'), () => {
      console.log(`Listening on ${app.get('port')}.`);
    });
    writeDataToInflux(hanalei);
    writeDataToInflux(hilo);
    writeDataToInflux(honolulu);
    writeDataToInflux(kahului);
  })
  .catch(error => console.log({ error }));

// influx.writePoints([
//   {
//     measurement: 'tide',
//     tags: {
//       unit: locationObj.rawtide.tideInfo[0].units,
//       location: locationObj.rawtide.tideInfo[0].tideSite,
//     },
//     fields: { height: tidePoint.height },
//     timestamp: tidePoint.epoch,
//   }
// ], {
//   database: 'ocean_tides',
//   precision: 's',
// })
// .catch(error => {
//   console.error(`Error saving data to InfluxDB! ${err.stack}`)
// });

// influx.query(`
//     select * from tide
//     where location =~ /(?i)(${place})/
//   `)
//   .then( result => response.status(200).json(result) )
//   .catch( error => response.status(500).json({ error }) );



socket.on('connection', (socket) => {
    socket.emit('join', 'database');
    socket.on('return', (data) => {
      console.log(data);
    });
  });

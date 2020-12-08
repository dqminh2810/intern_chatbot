'use strict';

const mysql = require('mysql');

//local mysql db connection

const dbConn = mysql.createConnection({

  // CLEVER CLOUD CONFIG

  host: 'bdirhyz6e7ikjb9s01h5-mysql.services.clever-cloud.com',

  user: 'uu3xgemrgbay9dtr',

  password: 'WE2hCzNi2SmPBUb9WzB4',

  database: 'bdirhyz6e7ikjb9s01h5',
});
/*
  // LOCAL CONFIG
      host: 'localhost',

      user : 'root',

      password: '',

      database: 'chatbotDb'
});
*/
dbConn.connect(function(err) {

    if (err) throw err;

    console.log("Database Connected!");

});

module.exports = dbConn;

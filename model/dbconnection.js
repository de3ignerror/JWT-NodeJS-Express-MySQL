var mysql = require('mysql');

var db_config = {
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '12345678',
  database : 'DATABASE',
  connectionLimit: 100
};

function handleDisconnect() {
  try {
    connection.end();
  } catch (e) {}
  connection = mysql.createPool(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      connection.end();
      handleDisconnect();                         // lost due to either server restart, or a
    } else {
      connection.end();
      // connnection idle timeout (the wait_timeout
      console.log(err);
      handleDisconnect(); // server variable configures this)
    }
  });
}



try {
  handleDisconnect();
  console.log('Connected to the MYSQL database');

} catch(e) {
	console.log('Database Connetion failed:' + e);
}

module.exports = connection;

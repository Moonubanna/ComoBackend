const sql = require('mssql')
const config = {
    user: 'dbuser',
    password: '941OUgkl',
    server: '164.52.216.148', // You can use 'localhost\\instance' to connect to named instance
    database: 'super7_new',
    port: 1433,
    options: {
        multipleStatements: true,
        encrypt: false, // Use this if you're on Windows Azure asdf asdfasdf
        packetSize: 32768
    }
}
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL')
        return pool
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
    sql,
    poolPromise
}
const mongoose = require('mongoose')
require('colors')

const databaseConn = async ()=>{
    const conn = await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true
    })

    console.log(`Database at: ${conn.connection.host} connected successfully`.yellow.underline.inverse)
}

module.exports = databaseConn
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('colors')
const dbConnection = require('./config/db')

//handle uncaught exceptions
process.on("uncaughtException", err=>{
    console.log(err.message)
    process.exit(1)
})

//load enviroment variables
dotenv.config({path: './config/.env'})

//middleware
//implement body parser
app.use(bodyParser.json()) 
app.use(morgan('tiny'))

//load database dbConnection
dbConnection()


const port = process.env.PORT

const server = app.listen(port, ()=>{
    console.log(`Server is up and running on port ${process.env.PORT}`.inverse.cyan)
})

//handle unhandled promise rejections
process.on("unhandledRejection", err=>{
    console.log(err.message)
    console.log(err)
    server.close(()=>{
        process.exit(1)
    })
})


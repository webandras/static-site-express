// Small utility program that provides a command line interface
// to create a mysql database and/or add a table to the database
// !IMPORTANT! This script is added to .gitignore!
'use strict'

const mysql = require('mysql')
// synchronous prompt
const prompt = require('readline-sync').question

// fields in the table you want to create
const fields = `(id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  filename VARCHAR(255),
  date DATE,
  comments_enabled TINYINT,
  topic VARCHAR(255),
  description TEXT,
  cover_image VARCHAR(255))`

// option to choose from menu.
let option
// User input
option = prompt('\n\nEnter option (1-Create Database, 2-Add Table): ')

if (isNaN(Number(option))) {
  throw new Error(`\n\nYour input value, '${option}', is not a number.`)
}
// cast to number
option = Number(option)
console.log(option)

switch (option) {
  case 1:
    // Create a database
    createDatabase()
    break

  case 2:
    // Create a table
    createTable(fields)
    break

  default:
    console.error(`Incorrect input. Option ${option} doesn't exists.`)
    break
}

// Create a database
function createDatabase () {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'YOUR_PASSWORD',
    charset: 'utf8mb4'
  })

  // Create database to store post metadata
  let dbName = prompt('Add name for the database: ')
  let sql = `CREATE DATABASE ${dbName}  DEFAULT CHARACTER SET utf8mb4;`

  connection.query(sql, function (err, results, fields) {
    if (err) throw err
    console.log(`Database '${dbName}' successfully created.`)
    console.log(results)
  })

  connection.end((err) => {
    if (err) throw err
  })
}

// Create a table
function createTable (fields) {
  // Add a table to the database
  let dbName = prompt('To which database you want to add a table: ')

  // store name of the table
  let tableName = prompt('Add name for the table: ')

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'green76931/*ABC',
    database: dbName,
    charset: 'utf8_unicode_ci'
  })

  let sql = `CREATE TABLE IF NOT EXISTS ${tableName} ${fields} DEFAULT CHARSET utf8`

  connection.query(sql, function (err, results, fields) {
    if (err) throw err
    console.log(`Table '${tableName}' successfully created inside '${dbName}' database.`)
    console.log(results)
  })

  connection.end((err) => {
    if (err) throw err
  })
}

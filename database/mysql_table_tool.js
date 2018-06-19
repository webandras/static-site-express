// Small utility program that exports data from a mysql table into JSON file
// !IMPORTANT! This script is added to .gitignore!
'use strict'

const mysql = require('mysql')
const fs = require('fs')

// !IMPORTANT! This script is added to .gitignore! It would be unwise to push it to
// a public repo, since your username and password would be visible to anyone!
// I uploaded my version with fake data.
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'YOUR-PASSWORD',
  database: 'YOUR-DATABASE-NAME',
  dateStrings: true,
  charset: 'utf8mb4'
})

// store name of the table
const tableName = 'posts'

// order rows by this field in the SQL table
const orderByThisField = 'date'
const orderType = 'DESC'

// destination file to save the table
const destination = './src/data/postData.json'

queryRowsAndSaveToJSON(tableName, destination, orderByThisField, orderType)

// Query rows in descending order by a field, and save data to JSON file
// Arguments:
// tableName: string,
// path to destination JSON file: string,
// orderByThisField: string,
// orderType: 'DESC' / 'ASC'
// filter: string (optional argument)
function queryRowsAndSaveToJSON (tableName, destination, orderByThisField, orderType, filter) {
  'use strict'
  if (tableName === undefined) {
    throw new Error('No table name supplied!')
  } else if (destination === undefined) {
    throw new Error('No path to destination JSON file supplied!')
  } else if (orderByThisField === undefined) {
    throw new Error('No field supplied to order rows in descending order!')
  } else if (orderType === undefined) {
    // use default: DESC order!
    orderType = 'DESC'
  }

  // Generate SQL statements for the query depending on the user-supplied arguments.
  let sql
  if (filter === undefined) {
    sql = `SELECT * FROM ${tableName} ORDER BY ${orderByThisField} ${orderType.toUpperCase()}`
  } else {
    sql = `SELECT * FROM ${tableName} WHERE tipus='${filter}' ORDER BY ${orderByThisField} ${orderType.toUpperCase()}`
  }

  connection.query(sql, function (err, result, fields) {
    if (err) { throw err }
    console.log(result)

    let save = JSON.stringify(result)
    console.log(save)

    // export JSON to destination
    fs.writeFile(destination, save, 'utf-8', (err) => {
      if (err) { throw err }
      console.log('\nData successfully saved to ' + destination + '.')
    })
  })

  connection.end((err) => {
    if (err) { throw err }
  })
}

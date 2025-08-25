import fs from 'node:fs'
import path from 'node:path'
import Database from 'better-sqlite3'

const dbPath = path.resolve('server', 'data.sqlite')
const sqlPath = path.resolve('server', 'sql', 'update-icons.sql')
const sql = fs.readFileSync(sqlPath, 'utf8')

const db = new Database(dbPath)
db.exec('BEGIN')
db.exec(sql)
db.exec('COMMIT')
console.log('SQL applied ✔')

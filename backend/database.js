import oracledb from 'oracledb'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const directory = dirname(fileURLToPath(import.meta.url))
const environmentFile = join(directory, '.env')

if (existsSync(environmentFile)) {
  for (const line of readFileSync(environmentFile, 'utf8').split(/\r?\n/)) {
    const [key, ...value] = line.split('=')
    if (key && value.length) process.env[key.trim()] = value.join('=').trim()
  }
}

oracledb.initOracleClient({ libDir: 'C:\\oraclexe\\app\\oracle\\product\\11.2.0\\server\\bin' })
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

export const connectionOptions = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
}

export const getConnection = () => oracledb.getConnection(connectionOptions)
export { oracledb }

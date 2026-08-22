import { getConnection, oracledb } from './database.js'

const systemPassword = process.env.ORACLE_SYSTEM_PASSWORD
if (!systemPassword) throw new Error('Set ORACLE_SYSTEM_PASSWORD before running setup-oracle.js.')

const admin = await oracledb.getConnection({ user: 'system', password: systemPassword, connectString: process.env.DB_CONNECT_STRING })
try {
  try { await admin.execute(`CREATE USER dayflow_user IDENTIFIED BY "${process.env.DB_PASSWORD}"`) } catch (error) { if (error.errorNum !== 1920) throw error }
  await admin.execute('GRANT CONNECT, RESOURCE TO dayflow_user')
} finally { await admin.close() }

const connection = await getConnection()
try {
  try { await connection.execute("CREATE TABLE users (id VARCHAR2(50) PRIMARY KEY, employee_id VARCHAR2(50) UNIQUE NOT NULL, email VARCHAR2(150) UNIQUE NOT NULL, password_hash VARCHAR2(255) NOT NULL, salt VARCHAR2(100) NOT NULL, role VARCHAR2(20) NOT NULL CHECK (role IN ('Employee', 'HR')), verified NUMBER(1) DEFAULT 0 NOT NULL CHECK (verified IN (0, 1)), verification_code VARCHAR2(10), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL)") } catch (error) { if (error.errorNum !== 955) throw error }
  await connection.commit()
  console.log('Dayflow Oracle schema is ready.')
} finally { await connection.close() }

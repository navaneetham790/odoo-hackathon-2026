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
  try { await connection.execute("CREATE TABLE users (id VARCHAR2(50) PRIMARY KEY, full_name VARCHAR2(120), employee_id VARCHAR2(50) UNIQUE NOT NULL, email VARCHAR2(150) UNIQUE NOT NULL, password_hash VARCHAR2(255) NOT NULL, salt VARCHAR2(100) NOT NULL, role VARCHAR2(20) NOT NULL CHECK (role IN ('Employee', 'HR')), verified NUMBER(1) DEFAULT 0 NOT NULL CHECK (verified IN (0, 1)), verification_code VARCHAR2(10), reset_code VARCHAR2(10), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL)") } catch (error) { if (error.errorNum !== 955) throw error }
  for (const statement of [
    'ALTER TABLE users ADD (full_name VARCHAR2(120))',
    'ALTER TABLE users ADD (reset_code VARCHAR2(10))',
    "CREATE TABLE employee_profiles (user_id VARCHAR2(50) PRIMARY KEY REFERENCES users(id), phone VARCHAR2(30), address VARCHAR2(300), department VARCHAR2(100), designation VARCHAR2(100), joining_date DATE, profile_picture VARCHAR2(500))",
    "CREATE TABLE attendance (id VARCHAR2(50) PRIMARY KEY, user_id VARCHAR2(50) REFERENCES users(id), attendance_date DATE NOT NULL, status VARCHAR2(20) NOT NULL CHECK (status IN ('Present','Absent','Half-day','Leave')), check_in VARCHAR2(20), check_out VARCHAR2(20), CONSTRAINT attendance_unique UNIQUE (user_id, attendance_date))",
    "CREATE TABLE leave_requests (id VARCHAR2(50) PRIMARY KEY, user_id VARCHAR2(50) REFERENCES users(id), leave_type VARCHAR2(20) NOT NULL CHECK (leave_type IN ('Paid Leave','Sick Leave','Unpaid Leave')), from_date DATE NOT NULL, to_date DATE NOT NULL, remarks VARCHAR2(500), status VARCHAR2(20) DEFAULT 'Pending' NOT NULL CHECK (status IN ('Pending','Approved','Rejected')), hr_comment VARCHAR2(500), reviewed_by VARCHAR2(50) REFERENCES users(id), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL)",
    "CREATE TABLE payroll (id VARCHAR2(50) PRIMARY KEY, user_id VARCHAR2(50) REFERENCES users(id), payroll_month VARCHAR2(20) NOT NULL, basic_salary NUMBER(12,2) DEFAULT 0, hra NUMBER(12,2) DEFAULT 0, other_allowance NUMBER(12,2) DEFAULT 0, deductions NUMBER(12,2) DEFAULT 0, status VARCHAR2(20) DEFAULT 'Draft' NOT NULL CHECK (status IN ('Draft','Verified')), CONSTRAINT payroll_unique UNIQUE (user_id, payroll_month))",
  ]) { try { await connection.execute(statement) } catch (error) { if (![955, 1430].includes(error.errorNum)) throw error } }
  await connection.commit()
  console.log('Dayflow Oracle schema is ready.')
} finally { await connection.close() }

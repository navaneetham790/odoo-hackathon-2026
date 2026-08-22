import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import { createServer } from 'node:http'
import { getConnection } from '../database.js'

const port = Number(process.env.AUTH_PORT || 8081)
const hashPassword = (password, salt = randomBytes(16).toString('hex')) => ({ salt, hash: scryptSync(password, salt, 64).toString('hex') })
const isValidPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
const cleanUser = (user) => ({ id: user.ID, employeeId: user.EMPLOYEE_ID, email: user.EMAIL, role: user.ROLE, verified: Boolean(user.VERIFIED), createdAt: user.CREATED_AT })

function send(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' })
  response.end(JSON.stringify(payload))
}

async function body(request) {
  let value = ''
  for await (const chunk of request) value += chunk
  try { return JSON.parse(value || '{}') } catch { return null }
}

async function getUser(email) {
  const connection = await getConnection()
  try { return (await connection.execute('SELECT id, employee_id, email, password_hash, salt, role, verified, verification_code, created_at FROM users WHERE email = :email', { email })).rows[0] } finally { await connection.close() }
}

async function register(request, response) {
  const payload = await body(request)
  if (!payload) return send(response, 400, { message: 'Invalid request body.' })
  const employeeId = String(payload.employeeId || '').trim()
  const email = String(payload.email || '').trim().toLowerCase()
  const password = String(payload.password || '')
  const role = payload.role === 'HR' ? 'HR' : payload.role === 'Employee' ? 'Employee' : ''
  if (!employeeId || !email || !password || !role) return send(response, 400, { message: 'Please complete every field.' })
  if (!/^\S+@\S+\.\S+$/.test(email)) return send(response, 400, { message: 'Enter a valid email address.' })
  if (!isValidPassword(password)) return send(response, 400, { message: 'Password must be 8+ characters and include uppercase, lowercase, and a number.' })
  const credentials = hashPassword(password)
  const verificationCode = String(Math.floor(100000 + Math.random() * 900000))
  const connection = await getConnection()
  try {
    await connection.execute('INSERT INTO users (id, employee_id, email, password_hash, salt, role, verified, verification_code) VALUES (:id, :employeeId, :email, :hash, :salt, :role, 0, :verificationCode)', { id: randomBytes(12).toString('hex'), employeeId, email, hash: credentials.hash, salt: credentials.salt, role, verificationCode }, { autoCommit: true })
  } catch (error) {
    if (error.errorNum === 1) return send(response, 409, { message: 'An account already exists with this employee ID or email.' })
    throw error
  } finally { await connection.close() }
  return send(response, 201, { message: 'Account created. Verify your email to continue.', email, demoVerificationCode: verificationCode })
}

async function verify(request, response) {
  const payload = await body(request)
  const email = String(payload?.email || '').trim().toLowerCase()
  const code = String(payload?.code || '').trim()
  const connection = await getConnection()
  try {
    const result = await connection.execute('UPDATE users SET verified = 1, verification_code = NULL WHERE email = :email AND verification_code = :code', { email, code }, { autoCommit: true })
    if (!result.rowsAffected) return send(response, 400, { message: 'The verification code is incorrect.' })
  } finally { await connection.close() }
  return send(response, 200, { message: 'Email verified. You can now sign in.' })
}

async function login(request, response) {
  const payload = await body(request)
  const email = String(payload?.email || '').trim().toLowerCase()
  const password = String(payload?.password || '')
  const user = await getUser(email)
  if (!user) return send(response, 401, { message: 'Incorrect email or password.' })
  const attemptedHash = scryptSync(password, user.SALT, 64)
  const storedHash = Buffer.from(user.PASSWORD_HASH, 'hex')
  if (attemptedHash.length !== storedHash.length || !timingSafeEqual(attemptedHash, storedHash)) return send(response, 401, { message: 'Incorrect email or password.' })
  if (!user.VERIFIED) return send(response, 403, { message: 'Please verify your email before signing in.' })
  const token = createHash('sha256').update(`${user.ID}:${Date.now()}:${randomBytes(8).toString('hex')}`).digest('hex')
  return send(response, 200, { message: 'Signed in successfully.', token, user: cleanUser(user) })
}

createServer(async (request, response) => {
  try {
    if (request.method === 'OPTIONS') return send(response, 204, {})
    if (request.method === 'POST' && request.url === '/api/auth/register') return register(request, response)
    if (request.method === 'POST' && request.url === '/api/auth/verify-email') return verify(request, response)
    if (request.method === 'POST' && request.url === '/api/auth/login') return login(request, response)
    return send(response, 404, { message: 'Route not found.' })
  } catch (error) { console.error(error); return send(response, 500, { message: 'Authentication service error.' }) }
}).listen(port, () => console.log(`Auth service running at http://localhost:${port}`))

import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const directory = dirname(fileURLToPath(import.meta.url))
const dataDirectory = join(directory, 'data')
const usersFile = join(dataDirectory, 'users.json')
const port = Number(process.env.PORT || 8081)

if (!existsSync(dataDirectory)) mkdirSync(dataDirectory, { recursive: true })
if (!existsSync(usersFile)) writeFileSync(usersFile, '[]\n')

const readUsers = () => JSON.parse(readFileSync(usersFile, 'utf8'))
const saveUsers = (users) => writeFileSync(usersFile, `${JSON.stringify(users, null, 2)}\n`)
const hashPassword = (password, salt = randomBytes(16).toString('hex')) => ({ salt, hash: scryptSync(password, salt, 64).toString('hex') })
const isValidPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
const cleanUser = ({ id, employeeId, email, role, verified, createdAt }) => ({ id, employeeId, email, role, verified, createdAt })

function send(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  })
  response.end(JSON.stringify(payload))
}

async function getBody(request) {
  let body = ''
  for await (const chunk of request) body += chunk
  try { return JSON.parse(body || '{}') } catch { return null }
}

async function handleRegister(request, response) {
  const body = await getBody(request)
  if (!body) return send(response, 400, { message: 'Invalid request body.' })
  const employeeId = String(body.employeeId || '').trim()
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '')
  const role = body.role === 'HR' ? 'HR' : body.role === 'Employee' ? 'Employee' : ''

  if (!employeeId || !email || !password || !role) return send(response, 400, { message: 'Please complete every field.' })
  if (!/^\S+@\S+\.\S+$/.test(email)) return send(response, 400, { message: 'Enter a valid email address.' })
  if (!isValidPassword(password)) return send(response, 400, { message: 'Password must be 8+ characters and include uppercase, lowercase, and a number.' })

  const users = readUsers()
  if (users.some((user) => user.email === email || user.employeeId.toLowerCase() === employeeId.toLowerCase())) {
    return send(response, 409, { message: 'An account already exists with this employee ID or email.' })
  }

  const credentials = hashPassword(password)
  const verificationCode = String(Math.floor(100000 + Math.random() * 900000))
  const user = { id: randomBytes(12).toString('hex'), employeeId, email, role, ...credentials, verified: false, verificationCode, createdAt: new Date().toISOString() }
  users.push(user)
  saveUsers(users)
  // In production, email this code using a provider such as Resend, SendGrid, or SMTP.
  return send(response, 201, { message: 'Account created. Verify your email to continue.', email, demoVerificationCode: verificationCode })
}

async function handleVerify(request, response) {
  const body = await getBody(request)
  const email = String(body?.email || '').trim().toLowerCase()
  const code = String(body?.code || '').trim()
  const users = readUsers()
  const user = users.find((item) => item.email === email)
  if (!user || user.verificationCode !== code) return send(response, 400, { message: 'The verification code is incorrect.' })
  user.verified = true
  delete user.verificationCode
  saveUsers(users)
  return send(response, 200, { message: 'Email verified. You can now sign in.' })
}

async function handleLogin(request, response) {
  const body = await getBody(request)
  const email = String(body?.email || '').trim().toLowerCase()
  const password = String(body?.password || '')
  const user = readUsers().find((item) => item.email === email)
  if (!user) return send(response, 401, { message: 'Incorrect email or password.' })
  const attemptedHash = scryptSync(password, user.salt, 64)
  const storedHash = Buffer.from(user.hash, 'hex')
  if (attemptedHash.length !== storedHash.length || !timingSafeEqual(attemptedHash, storedHash)) return send(response, 401, { message: 'Incorrect email or password.' })
  if (!user.verified) return send(response, 403, { message: 'Please verify your email before signing in.' })
  const token = createHash('sha256').update(`${user.id}:${Date.now()}:${randomBytes(8).toString('hex')}`).digest('hex')
  return send(response, 200, { message: 'Signed in successfully.', token, user: cleanUser(user) })
}

const server = async (request, response) => {
  if (request.method === 'OPTIONS') return send(response, 204, {})
  if (request.method === 'POST' && request.url === '/api/auth/register') return handleRegister(request, response)
  if (request.method === 'POST' && request.url === '/api/auth/verify-email') return handleVerify(request, response)
  if (request.method === 'POST' && request.url === '/api/auth/login') return handleLogin(request, response)
  return send(response, 404, { message: 'Route not found.' })
}

import('node:http').then(({ createServer }) => createServer(server).listen(port, () => console.log(`Dayflow API running at http://localhost:${port}`)))

import { createServer } from 'node:http'
import { getConnection } from '../database.js'

const port = Number(process.env.HR_PORT || 8082)

function send(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS' })
  response.end(JSON.stringify(payload))
}

createServer(async (request, response) => {
  if (request.method === 'OPTIONS') return send(response, 204, {})
  if (request.method === 'GET' && request.url === '/api/hr/health') {
    try {
      const connection = await getConnection()
      await connection.execute('SELECT 1 FROM dual')
      await connection.close()
      return send(response, 200, { service: 'hr-service', status: 'ready', modules: ['employee profiles', 'attendance', 'leave requests', 'approvals', 'payroll'] })
    } catch (error) { return send(response, 503, { service: 'hr-service', status: 'database unavailable' }) }
  }
  return send(response, 404, { message: 'Route not found.' })
}).listen(port, () => console.log(`HR service running at http://localhost:${port}`))

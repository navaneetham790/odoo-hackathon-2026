import { useState } from 'react'
import { ArrowLeft, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react'
import './AuthPage.css'

const API_URL = 'http://localhost:8081/api/auth'

export default function AuthPage({ initialMode = 'sign-in', onBack, onSignedIn }) {
  const [mode, setMode] = useState(initialMode)
  const [pendingEmail, setPendingEmail] = useState('')
  const [demoCode, setDemoCode] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const callApi = async (path, payload) => {
    const response = await fetch(`${API_URL}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Something went wrong.')
    return data
  }

  const submitLogin = async (event) => {
    event.preventDefault(); setLoading(true); setError(''); setMessage('')
    const form = new FormData(event.currentTarget)
    try {
      const data = await callApi('/login', { email: form.get('email'), password: form.get('password') })
      localStorage.setItem('dayflowUser', JSON.stringify(data.user))
      localStorage.setItem('dayflowToken', data.token)
      onSignedIn(data.user)
    } catch (requestError) { setError(requestError.message) } finally { setLoading(false) }
  }

  const submitSignUp = async (event) => {
    event.preventDefault(); setLoading(true); setError(''); setMessage('')
    const form = new FormData(event.currentTarget)
    if (form.get('password') !== form.get('confirmPassword')) { setError('Passwords do not match.'); setLoading(false); return }
    try {
      const data = await callApi('/register', Object.fromEntries(form))
      setPendingEmail(data.email); setDemoCode(data.demoVerificationCode); setMode('verify'); setMessage(data.message)
    } catch (requestError) { setError(requestError.message) } finally { setLoading(false) }
  }

  const submitVerification = async (event) => {
    event.preventDefault(); setLoading(true); setError(''); setMessage('')
    const form = new FormData(event.currentTarget)
    try { const data = await callApi('/verify-email', { email: pendingEmail, code: form.get('code') }); setMessage(data.message); setMode('sign-in') } catch (requestError) { setError(requestError.message) } finally { setLoading(false) }
  }

  const switchMode = (nextMode) => { setMode(nextMode); setError(''); setMessage('') }
  const isSignUp = mode === 'sign-up'

  return <main className="auth-page"><button onClick={onBack} className="auth-back"><ArrowLeft size={18} /> Back to home</button><section className="auth-card"><div className="auth-logo"><span /> Dayflow</div>{mode !== 'verify' && <><h1>{isSignUp ? 'Create your account' : 'Welcome back'}</h1><p>{isSignUp ? 'Start managing your HR work in one place.' : 'Sign in to access your Dayflow dashboard.'}</p></>}
    {mode === 'sign-in' && <form onSubmit={submitLogin} className="auth-form"><Field icon={Mail} label="Email" name="email" type="email" placeholder="you@company.com" /><PasswordField show={showPassword} setShow={setShowPassword} /><Feedback message={message} error={error} /><button disabled={loading} className="auth-submit">{loading ? 'Signing in...' : 'Sign In'}</button><p className="auth-switch">New to Dayflow? <button type="button" onClick={() => switchMode('sign-up')}>Sign Up</button></p></form>}
    {mode === 'sign-up' && <form onSubmit={submitSignUp} className="auth-form"><Field icon={UserRound} label="Employee ID" name="employeeId" placeholder="EMP-001" /><Field icon={Mail} label="Email" name="email" type="email" placeholder="you@company.com" /><label className="auth-label">Role<select name="role" defaultValue="Employee"><option>Employee</option><option>HR</option></select></label><PasswordField show={showPassword} setShow={setShowPassword} /><label className="auth-label">Confirm password<input name="confirmPassword" type="password" required /></label><small className="auth-hint">Use 8+ characters with uppercase, lowercase, and a number.</small><Feedback message={message} error={error} /><button disabled={loading} className="auth-submit">{loading ? 'Creating account...' : 'Create Account'}</button><p className="auth-switch">Already have an account? <button type="button" onClick={() => switchMode('sign-in')}>Sign In</button></p></form>}
    {mode === 'verify' && <form onSubmit={submitVerification} className="auth-form"><div className="auth-verify-icon"><CheckCircle2 /></div><h1>Verify your email</h1><p>Enter the verification code sent to <strong>{pendingEmail}</strong>.</p><label className="auth-label">Verification code<input name="code" required inputMode="numeric" maxLength="6" placeholder="000000" /></label>{demoCode && <p className="auth-demo-code">Demo code: <strong>{demoCode}</strong></p>}<Feedback message={message} error={error} /><button disabled={loading} className="auth-submit">{loading ? 'Verifying...' : 'Verify Email'}</button></form>}
  </section></main>
}

function Field({ icon: Icon, label, ...inputProps }) { return <label className="auth-label">{label}<span className="auth-input"><Icon size={18} /><input required {...inputProps} /></span></label> }
function PasswordField({ show, setShow }) { return <label className="auth-label">Password<span className="auth-input"><LockKeyhole size={18} /><input name="password" required type={show ? 'text' : 'password'} /><button type="button" onClick={() => setShow(!show)} aria-label="Toggle password visibility">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label> }
function Feedback({ message, error }) { return <>{error && <p className="auth-error">{error}</p>}{message && <p className="auth-message">{message}</p>}</> }

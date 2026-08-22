import { useState } from 'react'
import { ArrowLeft, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react'
import './AuthPage.css'

const API_URL = 'http://localhost:8081/api/auth'

export default function AuthPage({ initialMode = 'sign-in', onBack, onSignedIn }) {
  const [mode, setMode] = useState(initialMode)
  const [pendingEmail, setPendingEmail] = useState('')
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
      setPendingEmail(data.email); setMode('sign-in'); setMessage(data.message)
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
    {mode === 'sign-in' && <form onSubmit={submitLogin} className="auth-form"><Field icon={Mail} label="Email" name="email" type="email" placeholder="you@company.com" /><PasswordField show={showPassword} setShow={setShowPassword} /><button type="button" className="auth-forgot" onClick={() => switchMode('forgot')}>Forgot Password?</button><Feedback message={message} error={error} /><button disabled={loading} className="auth-submit">{loading ? 'Signing in...' : 'Sign In'}</button><p className="auth-switch">New to Dayflow? <button type="button" onClick={() => switchMode('sign-up')}>Sign Up</button></p></form>}
    {mode === 'sign-up' && <SignUpForm onSubmit={submitSignUp} loading={loading} showPassword={showPassword} setShowPassword={setShowPassword} message={message} error={error} switchMode={switchMode} />}
    {mode === 'forgot' && <form onSubmit={(event) => { event.preventDefault(); setMessage('Password reset instructions have been sent to your email.'); setError('') }} className="auth-form"><h1>Forgot password?</h1><p>Enter your registered email address. We’ll send password reset instructions.</p><Field icon={Mail} label="Email" name="email" type="email" placeholder="you@company.com" /><Feedback message={message} error={error} /><button className="auth-submit">Send Reset Link</button><p className="auth-switch"><button type="button" onClick={() => switchMode('sign-in')}>Back to Sign In</button></p></form>}
  </section></main>
}

function Field({ icon: Icon, label, ...inputProps }) { return <label className="auth-label">{label}<span className="auth-input"><Icon size={18} /><input required {...inputProps} /></span></label> }
function SignUpForm({ onSubmit, loading, showPassword, setShowPassword, message, error, switchMode }) { const [role, setRole] = useState('Employee'); return <form onSubmit={onSubmit} className="auth-form"><Field icon={UserRound} label="Full Name" name="fullName" placeholder="Enter your full name" /><Field icon={UserRound} label={role === 'HR' ? 'HR ID' : 'Employee ID'} name="employeeId" placeholder={role === 'HR' ? 'HR001' : 'EMP001'} /><Field icon={Mail} label="Email" name="email" type="email" placeholder="you@company.com" /><label className="auth-label">Role<select name="role" value={role} onChange={event => setRole(event.target.value)}><option>Employee</option><option>HR</option></select></label><PasswordField show={showPassword} setShow={setShowPassword} /><label className="auth-label">Confirm password<input name="confirmPassword" type="password" required /></label><small className="auth-hint">Use 8+ characters with uppercase, lowercase, and a number.</small><Feedback message={message} error={error} /><button disabled={loading} className="auth-submit">{loading ? 'Creating account...' : 'Create Account'}</button><p className="auth-switch">Already have an account? <button type="button" onClick={() => switchMode('sign-in')}>Sign In</button></p></form> }
function PasswordField({ show, setShow }) { return <label className="auth-label">Password<span className="auth-input"><LockKeyhole size={18} /><input name="password" required type={show ? 'text' : 'password'} /><button type="button" onClick={() => setShow(!show)} aria-label="Toggle password visibility">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label> }
function Feedback({ message, error }) { return <>{error && <p className="auth-error">{error}</p>}{message && <p className="auth-message">{message}</p>}</> }

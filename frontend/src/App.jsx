import { useState } from 'react'
import AuthPage from './auth/AuthPage'
import Dashboard from './dashboard/Dashboard'
import Landing from './landing/Landing'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('dayflowUser') || 'null'))

  const signOut = () => { localStorage.removeItem('dayflowUser'); localStorage.removeItem('dayflowToken'); setUser(null); setScreen('landing') }
  if (user) return <Dashboard user={user} onLogout={signOut} />
  if (screen === 'sign-in' || screen === 'sign-up') return <AuthPage initialMode={screen} onBack={() => setScreen('landing')} onSignedIn={setUser} />
  return <Landing onNavigate={setScreen} />
}

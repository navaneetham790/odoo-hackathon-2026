import { useState } from 'react'
import { Bell, CalendarCheck, CheckCircle2, CircleDollarSign, Clock3, LayoutDashboard, LogOut, Menu, Moon, Sun, UserRound, Users, X } from 'lucide-react'
import EmployeePortal from '../employee/EmployeePortal'
import HrPortal from '../hr/HrPortal'
import './Dashboard.css'

export default function Dashboard({ user, onLogout }) {
  const isHr = user.role === 'HR'
  const [page, setPage] = useState(() => localStorage.getItem(`dayflow-page-${user.id}`) || 'dashboard')
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkTheme, setDarkTheme] = useState(false)
  const [profileVersion, setProfileVersion] = useState(0)
  const links = isHr ? [['dashboard', LayoutDashboard, 'Dashboard'], ['profile', UserRound, 'My Profile'], ['employees', Users, 'Employees'], ['attendance', Clock3, 'Attendance'], ['approvals', CheckCircle2, 'Leave Approvals'], ['payroll', CircleDollarSign, 'Payroll']] : [['dashboard', LayoutDashboard, 'Dashboard'], ['profile', UserRound, 'My Profile'], ['attendance', Clock3, 'Attendance'], ['leave', CalendarCheck, 'Leave & Time-Off'], ['payroll', CircleDollarSign, 'Payroll']]
  const savedProfile = JSON.parse(localStorage.getItem(`dayflow-profile-${user.id}`) || '{}')
  const displayName = savedProfile.fullName || user.fullName || user.employeeId
  const changePage = (nextPage) => { localStorage.setItem(`dayflow-page-${user.id}`, nextPage); setPage(nextPage) }
  return <main className={darkTheme ? 'shell dark-theme' : 'shell'}><aside className={menuOpen ? 'side open' : 'side'}><div className="brand"><i />Dayflow <button onClick={() => setMenuOpen(false)}><X /></button></div><small>{isHr ? 'HR OFFICER PORTAL' : 'EMPLOYEE PORTAL'}</small><nav>{links.map(([key, Icon, label]) => <button className={page === key ? 'active' : ''} key={key} onClick={() => { changePage(key); setMenuOpen(false) }}><Icon size={19} />{label}</button>)}</nav><button className="logout" onClick={onLogout}><LogOut size={19} />Sign Out</button></aside><div className="workspace"><header><button className="menu" onClick={() => setMenuOpen(true)}><Menu /></button><div><p>{isHr ? 'HR management workspace' : 'Good morning'}</p><h1>{links.find(([key]) => key === page)?.[2]}</h1></div><div className="top-right"><button className="theme-toggle" title="Change theme" onClick={() => setDarkTheme(!darkTheme)}>{darkTheme ? <Sun size={20} /> : <Moon size={20} />}</button><Bell /><button className="header-profile" title="Open profile" onClick={() => changePage('profile')}>{savedProfile.photo ? <img src={savedProfile.photo} alt="Profile" /> : <span>{user.employeeId?.slice(-2) || 'DF'}</span>}<small>{displayName}</small></button></div></header><section className="content">{isHr ? <HrPortal page={page} user={user} onProfileChange={() => setProfileVersion(version => version + 1)} /> : <EmployeePortal page={page} user={user} onProfileChange={() => setProfileVersion(version => version + 1)} />}</section></div></main>
}

import { useState } from 'react'
import { Bell, CalendarCheck, CheckCircle2, CircleDollarSign, Clock3, LayoutDashboard, LogOut, Menu, UserRound, Users, X } from 'lucide-react'
import EmployeePortal from '../employee/EmployeePortal'
import HrPortal from '../hr/HrPortal'
import './Dashboard.css'

export default function Dashboard({ user, onLogout }) {
  const isHr = user.role === 'HR'
  const [page, setPage] = useState('dashboard')
  const [menuOpen, setMenuOpen] = useState(false)
  const links = isHr ? [['dashboard', LayoutDashboard, 'Dashboard'], ['employees', Users, 'Employees'], ['attendance', Clock3, 'Attendance'], ['approvals', CheckCircle2, 'Leave Approvals'], ['payroll', CircleDollarSign, 'Payroll']] : [['dashboard', LayoutDashboard, 'Dashboard'], ['profile', UserRound, 'My Profile'], ['attendance', Clock3, 'Attendance'], ['leave', CalendarCheck, 'Leave & Time-Off'], ['payroll', CircleDollarSign, 'Payroll']]
  return <main className="shell"><aside className={menuOpen ? 'side open' : 'side'}><div className="brand"><i />Dayflow <button onClick={() => setMenuOpen(false)}><X /></button></div><small>{isHr ? 'HR OFFICER PORTAL' : 'EMPLOYEE PORTAL'}</small><nav>{links.map(([key, Icon, label]) => <button className={page === key ? 'active' : ''} key={key} onClick={() => { setPage(key); setMenuOpen(false) }}><Icon size={19} />{label}</button>)}</nav><button className="logout" onClick={onLogout}><LogOut size={19} />Sign Out</button></aside><div className="workspace"><header><button className="menu" onClick={() => setMenuOpen(true)}><Menu /></button><div><p>{isHr ? 'HR management workspace' : 'Good morning'}</p><h1>{links.find(([key]) => key === page)?.[2]}</h1></div><div className="top-right"><Bell /><span>{user.employeeId?.slice(-2)}</span></div></header><section className="content">{isHr ? <HrPortal page={page} /> : <EmployeePortal page={page} user={user} />}</section></div></main>
}

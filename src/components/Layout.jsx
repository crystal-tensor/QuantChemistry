import React from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Layout.css'

function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const navItems = [
    { path: '/', label: '仪表盘', icon: '📊' },
    { path: '/task-composer', label: '创建新任务', icon: '➕' },
    { path: '/job-monitor', label: '任务监控', icon: '⚙️' },
    { path: '/results', label: '结果分析', icon: '📈' },
    { path: '/resources', label: '资源管理', icon: '💻' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  return (
    <div className="app-layout">
      <nav className="main-nav">
        <div className="nav-brand">
          <span className="logo">🌊 量子化学</span>
        </div>
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="nav-user">
          <span className="user-info">👤 {user?.name || '用户'}</span>
          <button className="btn-logout" onClick={handleLogout}>
            退出
          </button>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout


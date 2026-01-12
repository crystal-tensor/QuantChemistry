import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const stats = [
    { label: '运行中任务', value: 12, icon: '⚡', color: '#3498db' },
    { label: '已完成任务', value: 156, icon: '✅', color: '#27ae60' },
    { label: '可用资源', value: '8/10', icon: '💻', color: '#f39c12' },
    { label: '今日计算量', value: '2.4T', icon: '📊', color: '#9b59b6' },
  ]

  const recentTasks = [
    { id: 1, name: '苯分子基态能量模拟', status: '运行中', progress: 65, time: '2小时前' },
    { id: 2, name: '水分子结构优化', status: '已完成', progress: 100, time: '5小时前' },
    { id: 3, name: '甲烷振动频率分析', status: '排队中', progress: 0, time: '1天前' },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>工作空间</h1>
        <Link to="/task-composer" className="btn btn-primary">
          ➕ 创建新任务
        </Link>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="card">
          <h2>最近任务</h2>
          <div className="task-list">
            {recentTasks.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-info">
                  <h3>{task.name}</h3>
                  <span className={`task-status status-${task.status}`}>
                    {task.status}
                  </span>
                </div>
                <div className="task-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                  <span className="task-time">{task.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>快速开始</h2>
          <div className="quick-actions">
            <Link to="/task-composer" className="quick-action-card">
              <div className="quick-action-icon">🧪</div>
              <h3>创建计算任务</h3>
              <p>配置量子化学计算流程</p>
            </Link>
            <Link to="/job-monitor" className="quick-action-card">
              <div className="quick-action-icon">📊</div>
              <h3>监控任务</h3>
              <p>查看任务执行状态</p>
            </Link>
            <Link to="/results" className="quick-action-card">
              <div className="quick-action-icon">📈</div>
              <h3>分析结果</h3>
              <p>可视化计算结果</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


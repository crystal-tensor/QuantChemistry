import React, { useState } from 'react'
import './JobMonitor.css'

function JobMonitor() {
  const [filter, setFilter] = useState('all')

  const jobs = [
    {
      id: 1,
      name: '苯分子基态能量模拟',
      status: '运行中',
      progress: 65,
      backend: '瀚海-GPU模拟器节点',
      startTime: '2024-01-15 10:30',
      estimatedTime: '45分钟',
      remainingTime: '约15分钟',
    },
    {
      id: 2,
      name: '水分子结构优化',
      status: '已完成',
      progress: 100,
      backend: '数字孪生-超导QPU',
      startTime: '2024-01-15 08:00',
      endTime: '2024-01-15 11:00',
    },
    {
      id: 3,
      name: '甲烷振动频率分析',
      status: '排队中',
      progress: 0,
      backend: '量子真机',
      queuePosition: 3,
      estimatedWait: '约2小时',
    },
    {
      id: 4,
      name: '乙烯电子结构计算',
      status: '运行中',
      progress: 32,
      backend: '瀚海-GPU模拟器节点',
      startTime: '2024-01-15 12:00',
      estimatedTime: '60分钟',
      remainingTime: '约40分钟',
    },
  ]

  const filteredJobs = filter === 'all' 
    ? jobs 
    : jobs.filter(job => {
        if (filter === 'running') return job.status === '运行中'
        if (filter === 'completed') return job.status === '已完成'
        if (filter === 'queued') return job.status === '排队中'
        return true
      })

  const getStatusColor = (status) => {
    switch (status) {
      case '运行中': return '#3498db'
      case '已完成': return '#27ae60'
      case '排队中': return '#f39c12'
      case '失败': return '#e74c3c'
      default: return '#7f8c8d'
    }
  }

  return (
    <div className="job-monitor">
      <div className="monitor-header">
        <h1>任务调度中心</h1>
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            全部 ({jobs.length})
          </button>
          <button
            className={`filter-tab ${filter === 'running' ? 'active' : ''}`}
            onClick={() => setFilter('running')}
          >
            运行中 ({jobs.filter(j => j.status === '运行中').length})
          </button>
          <button
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            已完成 ({jobs.filter(j => j.status === '已完成').length})
          </button>
          <button
            className={`filter-tab ${filter === 'queued' ? 'active' : ''}`}
            onClick={() => setFilter('queued')}
          >
            排队中 ({jobs.filter(j => j.status === '排队中').length})
          </button>
        </div>
      </div>

      <div className="jobs-list">
        {filteredJobs.map((job) => (
          <div key={job.id} className="job-card card">
            <div className="job-header">
              <div className="job-title">
                <h3>{job.name}</h3>
                <span
                  className="job-status"
                  style={{ backgroundColor: getStatusColor(job.status) }}
                >
                  {job.status}
                </span>
              </div>
              <div className="job-actions">
                {job.status === '运行中' && (
                  <button className="btn btn-primary btn-sm">暂停</button>
                )}
                {job.status === '排队中' && (
                  <button className="btn btn-primary btn-sm">取消</button>
                )}
                <button className="btn btn-primary btn-sm">详情</button>
              </div>
            </div>

            <div className="job-info">
              <div className="info-item">
                <span className="info-label">后端：</span>
                <span className="info-value">{job.backend}</span>
              </div>
              <div className="info-item">
                <span className="info-label">开始时间：</span>
                <span className="info-value">{job.startTime || '-'}</span>
              </div>
              {job.endTime && (
                <div className="info-item">
                  <span className="info-label">结束时间：</span>
                  <span className="info-value">{job.endTime}</span>
                </div>
              )}
              {job.queuePosition && (
                <div className="info-item">
                  <span className="info-label">排队位置：</span>
                  <span className="info-value">第 {job.queuePosition} 位</span>
                </div>
              )}
            </div>

            {job.progress > 0 && (
              <div className="job-progress">
                <div className="progress-header">
                  <span>执行进度</span>
                  <span className="progress-percent">{job.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${job.progress}%`,
                      backgroundColor: getStatusColor(job.status),
                    }}
                  />
                </div>
                {job.remainingTime && (
                  <div className="progress-footer">
                    预计剩余时间: {job.remainingTime}
                  </div>
                )}
              </div>
            )}

            {job.status === '排队中' && job.estimatedWait && (
              <div className="queue-info">
                ⏱️ 预计等待时间: {job.estimatedWait}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobMonitor


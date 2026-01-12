import React, { useState } from 'react'
import './ResourceManager.css'

function ResourceManager() {
  const [viewMode, setViewMode] = useState('grid')

  const resources = [
    {
      id: 1,
      name: 'HHMX-Node-01',
      type: 'GPU模拟器',
      status: '运行中',
      utilization: 75,
      cpu: '8/16 核心',
      memory: '32/64 GB',
      gpu: '2x A100',
      tasks: 3,
      location: '本地',
    },
    {
      id: 2,
      name: 'HHMX-Node-02',
      type: 'GPU模拟器',
      status: '空闲',
      utilization: 15,
      cpu: '2/16 核心',
      memory: '8/64 GB',
      gpu: '2x A100',
      tasks: 0,
      location: '本地',
    },
    {
      id: 3,
      name: 'HH-SuperSim-20bit',
      type: '数字孪生QPU',
      status: '运行中',
      utilization: 90,
      cpu: '16/16 核心',
      memory: '48/64 GB',
      gpu: 'N/A',
      tasks: 2,
      location: '云端',
    },
    {
      id: 4,
      name: 'Telecom Quantum QPU-05',
      type: '量子真机',
      status: '维护中',
      utilization: 0,
      cpu: 'N/A',
      memory: 'N/A',
      gpu: 'N/A',
      tasks: 0,
      location: '远程',
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case '运行中': return '#27ae60'
      case '空闲': return '#3498db'
      case '维护中': return '#e74c3c'
      case '离线': return '#7f8c8d'
      default: return '#7f8c8d'
    }
  }

  const getUtilizationColor = (utilization) => {
    if (utilization < 50) return '#27ae60'
    if (utilization < 80) return '#f39c12'
    return '#e74c3c'
  }

  const totalResources = resources.length
  const availableResources = resources.filter(r => r.status === '空闲' || r.status === '运行中').length
  const totalUtilization = Math.round(
    resources.reduce((sum, r) => sum + r.utilization, 0) / resources.length
  )

  return (
    <div className="resource-manager">
      <div className="manager-header">
        <h1>资源管理</h1>
        <div className="view-controls">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            📊 网格视图
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            📋 列表视图
          </button>
        </div>
      </div>

      <div className="resource-stats">
        <div className="stat-card">
          <div className="stat-icon">💻</div>
          <div className="stat-content">
            <div className="stat-value">{totalResources}</div>
            <div className="stat-label">总资源数</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{availableResources}</div>
            <div className="stat-label">可用资源</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{totalUtilization}%</div>
            <div className="stat-label">平均利用率</div>
          </div>
        </div>
      </div>

      <div className={`resources-container ${viewMode}`}>
        {resources.map((resource) => (
          <div key={resource.id} className="resource-card card">
            <div className="resource-header">
              <div className="resource-title">
                <h3>{resource.name}</h3>
                <span
                  className="resource-status"
                  style={{ backgroundColor: getStatusColor(resource.status) }}
                >
                  {resource.status}
                </span>
              </div>
              <div className="resource-type">{resource.type}</div>
            </div>

            <div className="resource-utilization">
              <div className="utilization-header">
                <span>资源利用率</span>
                <span
                  className="utilization-percent"
                  style={{ color: getUtilizationColor(resource.utilization) }}
                >
                  {resource.utilization}%
                </span>
              </div>
              <div className="utilization-bar">
                <div
                  className="utilization-fill"
                  style={{
                    width: `${resource.utilization}%`,
                    backgroundColor: getUtilizationColor(resource.utilization),
                  }}
                />
              </div>
            </div>

            <div className="resource-details">
              <div className="detail-item">
                <span className="detail-label">CPU：</span>
                <span className="detail-value">{resource.cpu}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">内存：</span>
                <span className="detail-value">{resource.memory}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">GPU：</span>
                <span className="detail-value">{resource.gpu}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">运行任务：</span>
                <span className="detail-value">{resource.tasks} 个</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">位置：</span>
                <span className="detail-value">{resource.location}</span>
              </div>
            </div>

            <div className="resource-actions">
              <button className="btn btn-primary btn-sm">查看详情</button>
              {resource.status === '维护中' && (
                <button className="btn btn-primary btn-sm">恢复服务</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResourceManager


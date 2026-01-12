import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TaskComposer.css'

function TaskComposer() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    taskName: '苯分子基态能量模拟',
    method: 'DFT',
    basisSet: '6-31G*',
    quantumEnabled: true,
    quantumAlgorithm: 'VQE',
    hamiltonian: '瀚海平面波-FQ',
    backends: ['backend1', 'backend2'],
    aiEnabled: true,
    reproducibilityEnabled: true,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // 这里可以添加提交逻辑
    alert('任务已提交到调度中心！')
    navigate('/job-monitor')
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleBackend = (backendId) => {
    setFormData((prev) => {
      const backends = prev.backends.includes(backendId)
        ? prev.backends.filter((id) => id !== backendId)
        : [...prev.backends, backendId]
      return { ...prev, backends }
    })
  }

  return (
    <div className="task-composer">
      <h1>创建新任务：量子化学替代流程</h1>

      <form onSubmit={handleSubmit}>
        <div className="task-step card">
          <h2>
            <span className="step-number">1</span>
            定义计算目标 (经典化学输入)
          </h2>
          <div className="input-group">
            <label>任务名称：</label>
            <input
              type="text"
              value={formData.taskName}
              onChange={(e) => handleChange('taskName', e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>上传分子结构：</label>
            <div className="upload-options">
              <button type="button" className="btn btn-primary">
                📤 上传 .xyz / .mol 文件
              </button>
              <span className="divider">或</span>
              <button type="button" className="btn btn-primary">
                📚 从模板库选择
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>选择经典方法 (用于对照)：</label>
            <select
              value={formData.method}
              onChange={(e) => handleChange('method', e.target.value)}
            >
              <option>DFT</option>
              <option>Hartree-Fock</option>
            </select>
          </div>

          <div className="input-group">
            <label>选择基组：</label>
            <select
              value={formData.basisSet}
              onChange={(e) => handleChange('basisSet', e.target.value)}
            >
              <option>6-31G*</option>
              <option>STO-3G</option>
              <option disabled>--- 自定义基组接口 ---</option>
            </select>
          </div>
        </div>

        <div className="task-step card">
          <h2>
            <span className="step-number">2</span>
            配置量子替代模块
          </h2>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="q-enable"
              checked={formData.quantumEnabled}
              onChange={(e) => handleChange('quantumEnabled', e.target.checked)}
            />
            <label htmlFor="q-enable">
              <strong>启用量子替代子流程</strong>
            </label>
          </div>

          {formData.quantumEnabled && (
            <>
              <div className="input-group">
                <label>量子算法：</label>
                <select
                  value={formData.quantumAlgorithm}
                  onChange={(e) => handleChange('quantumAlgorithm', e.target.value)}
                >
                  <option>VQE (推荐)</option>
                  <option>QPE</option>
                </select>
              </div>

              <div className="input-group">
                <label>哈密顿量抽象：</label>
                <select
                  value={formData.hamiltonian}
                  onChange={(e) => handleChange('hamiltonian', e.target.value)}
                >
                  <option>瀚海平面波-FQ (默认)</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="task-step card">
          <h2>
            <span className="step-number">3</span>
            选择执行后端 (多后端融合)
          </h2>
          <p className="hint">可多选，用于Benchmark</p>

          <div className="backend-list">
            <div className="backend-item">
              <input
                type="checkbox"
                id="backend1"
                checked={formData.backends.includes('backend1')}
                onChange={() => toggleBackend('backend1')}
              />
              <label htmlFor="backend1">
                <strong>瀚海-GPU模拟器节点</strong> (本地, CUDA-Q加速, NVLink)
                <div className="backend-details">
                  节点: HHMX-Node-01 | 预估时间: ~45分钟
                </div>
              </label>
            </div>

            <div className="backend-item">
              <input
                type="checkbox"
                id="backend2"
                checked={formData.backends.includes('backend2')}
                onChange={() => toggleBackend('backend2')}
              />
              <label htmlFor="backend2">
                <strong>数字孪生-超导QPU</strong> (模拟噪声)
                <div className="backend-details">
                  模型: HH-SuperSim-20bit | 预估时间: ~3小时
                </div>
              </label>
            </div>

            <div className="backend-item">
              <input
                type="checkbox"
                id="backend3"
                checked={formData.backends.includes('backend3')}
                onChange={() => toggleBackend('backend3')}
              />
              <label htmlFor="backend3">
                <strong>量子真机 (排队)</strong>
                <div className="backend-details">
                  后端: Telecom Quantum QPU-05 | 预估排队: ~24小时
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="task-step card">
          <h2>
            <span className="step-number">4</span>
            AI协同与高级选项
          </h2>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="ai-opt"
              checked={formData.aiEnabled}
              onChange={(e) => handleChange('aiEnabled', e.target.checked)}
            />
            <label htmlFor="ai-opt">
              启用AI辅助调度 (自动优化噪声与资源)
            </label>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="repro"
              checked={formData.reproducibilityEnabled}
              onChange={(e) => handleChange('reproducibilityEnabled', e.target.checked)}
            />
            <label htmlFor="repro">启用可复现追踪 (保存任务谱系)</label>
          </div>
        </div>

        <button type="submit" className="btn btn-success submit-button">
          🚀 提交任务到调度中心
        </button>
      </form>
    </div>
  )
}

export default TaskComposer


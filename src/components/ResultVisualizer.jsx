import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import './ResultVisualizer.css'

function ResultVisualizer() {
  const [selectedResult, setSelectedResult] = useState(null)

  const results = [
    {
      id: 1,
      name: '苯分子基态能量模拟',
      date: '2024-01-15',
      method: 'VQE + DFT',
      status: '已完成',
    },
    {
      id: 2,
      name: '水分子结构优化',
      date: '2024-01-14',
      method: 'QPE + Hartree-Fock',
      status: '已完成',
    },
  ]

  // 示例数据 - 能量收敛曲线
  const energyConvergenceData = {
    x: Array.from({ length: 50 }, (_, i) => i + 1),
    y: Array.from({ length: 50 }, (_, i) => 
      -230.5 + 5 * Math.exp(-i / 10) + (Math.random() - 0.5) * 0.1
    ),
    type: 'scatter',
    mode: 'lines+markers',
    name: '能量收敛',
    line: { color: '#3498db', width: 2 },
    marker: { size: 4 },
  }

  // 分子轨道能级图
  const orbitalData = {
    x: ['HOMO-2', 'HOMO-1', 'HOMO', 'LUMO', 'LUMO+1', 'LUMO+2'],
    y: [-0.5, -0.3, -0.2, 0.1, 0.3, 0.5],
    type: 'bar',
    marker: {
      color: ['#e74c3c', '#e74c3c', '#e74c3c', '#3498db', '#3498db', '#3498db'],
    },
    name: '轨道能量 (eV)',
  }

  // 3D 分子结构数据（简化示例）
  const molecule3DData = {
    x: [0, 1.4, 2.1, 1.4, 0, -1.4, -2.1, -1.4],
    y: [0, 0, 1.2, 2.4, 2.4, 2.4, 1.2, 0],
    z: [0, 0, 0, 0, 0, 0, 0, 0],
    mode: 'markers',
    type: 'scatter3d',
    marker: {
      size: 10,
      color: ['#e74c3c', '#3498db', '#3498db', '#3498db', '#3498db', '#3498db', '#3498db', '#3498db'],
    },
    name: '原子位置',
  }

  const layout1 = {
    title: '能量收敛曲线',
    xaxis: { title: '迭代次数' },
    yaxis: { title: '能量 (Hartree)' },
    template: 'plotly_white',
    height: 400,
  }

  const layout2 = {
    title: '分子轨道能级图',
    xaxis: { title: '轨道' },
    yaxis: { title: '能量 (eV)' },
    template: 'plotly_white',
    height: 400,
  }

  const layout3 = {
    title: '3D 分子结构',
    scene: {
      xaxis: { title: 'X (Å)' },
      yaxis: { title: 'Y (Å)' },
      zaxis: { title: 'Z (Å)' },
    },
    template: 'plotly_white',
    height: 500,
  }

  return (
    <div className="result-visualizer">
      <div className="visualizer-header">
        <h1>结果分析</h1>
        <div className="result-selector">
          <label>选择计算结果：</label>
          <select
            value={selectedResult || ''}
            onChange={(e) => setSelectedResult(e.target.value)}
          >
            <option value="">-- 请选择 --</option>
            {results.map((result) => (
              <option key={result.id} value={result.id}>
                {result.name} ({result.date})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedResult && (
        <div className="visualization-content">
          <div className="result-info card">
            <h2>{results.find(r => r.id === parseInt(selectedResult))?.name}</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">计算方法：</span>
                <span className="value">
                  {results.find(r => r.id === parseInt(selectedResult))?.method}
                </span>
              </div>
              <div className="info-item">
                <span className="label">计算日期：</span>
                <span className="value">
                  {results.find(r => r.id === parseInt(selectedResult))?.date}
                </span>
              </div>
              <div className="info-item">
                <span className="label">基态能量：</span>
                <span className="value">-230.5234 Hartree</span>
              </div>
              <div className="info-item">
                <span className="label">HOMO-LUMO 能隙：</span>
                <span className="value">0.3 eV</span>
              </div>
            </div>
          </div>

          <div className="visualizations">
            <div className="card">
              <Plot
                data={[energyConvergenceData]}
                layout={layout1}
                config={{ responsive: true }}
              />
            </div>

            <div className="card">
              <Plot
                data={[orbitalData]}
                layout={layout2}
                config={{ responsive: true }}
              />
            </div>

            <div className="card">
              <Plot
                data={[molecule3DData]}
                layout={layout3}
                config={{ responsive: true }}
              />
            </div>
          </div>

          <div className="result-actions card">
            <h3>数据导出</h3>
            <div className="action-buttons">
              <button className="btn btn-primary">📥 导出 CSV</button>
              <button className="btn btn-primary">📊 导出图表</button>
              <button className="btn btn-primary">📄 生成报告</button>
            </div>
          </div>
        </div>
      )}

      {!selectedResult && (
        <div className="empty-state card">
          <div className="empty-icon">📈</div>
          <h2>请选择一个计算结果进行可视化分析</h2>
          <p>从上方下拉菜单中选择已完成的计算任务</p>
        </div>
      )}
    </div>
  )
}

export default ResultVisualizer


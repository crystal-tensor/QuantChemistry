# 量子化学 - 量子化学替代流程平台

一个现代化的量子化学计算平台，旨在"无需学习量子编程"和"降低使用门槛"。

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **路由**: React Router v6
- **可视化**: Plotly.js (用于图表和3D可视化)
- **样式**: CSS3 (现代化设计)

## 核心组件

1. **Dashboard (工作空间)** - 任务概览和快速操作
2. **TaskComposer (可视化任务配置)** - 创建和配置计算任务
3. **JobMonitor (任务调度中心)** - 监控任务执行状态
4. **ResultVisualizer (可视化分析)** - 使用 Plotly.js 可视化计算结果
5. **ResourceManager (资源管理)** - 管理计算资源
6. **Auth (用户认证)** - 用户登录和认证

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
├── src/
│   ├── components/          # React 组件
│   │   ├── Auth.jsx        # 用户认证
│   │   ├── Dashboard.jsx   # 工作空间
│   │   ├── JobMonitor.jsx  # 任务监控
│   │   ├── Layout.jsx      # 布局组件
│   │   ├── ResourceManager.jsx  # 资源管理
│   │   ├── ResultVisualizer.jsx # 结果可视化
│   │   └── TaskComposer.jsx     # 任务配置
│   ├── context/            # React Context
│   │   └── AuthContext.jsx # 认证上下文
│   ├── App.jsx             # 主应用组件
│   ├── main.jsx            # 应用入口
│   └── index.css           # 全局样式
├── index.html              # HTML 入口
├── package.json            # 项目配置
└── vite.config.js          # Vite 配置
```

## 功能特性

- ✅ 现代化 UI 设计
- ✅ 响应式布局
- ✅ 路由导航
- ✅ 用户认证系统
- ✅ 任务创建和配置
- ✅ 实时任务监控
- ✅ 数据可视化 (Plotly.js)
- ✅ 资源管理

## 演示模式

当前为演示模式，登录时可以使用任意用户名和密码。

## 开发说明

- 使用 React Hooks 进行状态管理
- 使用 React Router 进行路由管理
- 使用 Context API 进行全局状态管理
- 所有组件都使用函数式组件和 Hooks


import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import TaskComposer from './components/TaskComposer'
import JobMonitor from './components/JobMonitor'
import ResultVisualizer from './components/ResultVisualizer'
import ResourceManager from './components/ResourceManager'
import Auth from './components/Auth'
import { AuthProvider, useAuth } from './context/AuthContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/auth" />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="task-composer" element={<TaskComposer />} />
        <Route path="job-monitor" element={<JobMonitor />} />
        <Route path="results" element={<ResultVisualizer />} />
        <Route path="resources" element={<ResourceManager />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App


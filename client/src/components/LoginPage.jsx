import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationType, setNotificationType] = useState('error')
  const [notificationMessage, setNotificationMessage] = useState('')

  const Notification = ({ type, message, onClose }) => {
    return (
      <div className={`notification-popup ${type}`}>
        <div className="notification-content">
          <span>{message}</span>
          <button className="notification-close" onClick={onClose}>&times;</button>
        </div>
      </div>
    )
  }

  const onSubmithandler = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      
      if (response.ok) {
        setRedirect(true)
      } else {
        const errorData = await response.json()
        setNotificationType('error')
        setNotificationMessage(errorData.message || 'Login failed')
        setShowNotification(true)
      }
    } catch (error) {
      setNotificationType('error')
      setNotificationMessage('An error occurred while logging in.')
      setShowNotification(true)
    } finally {
      setUsername('')
      setPassword('')
    }
  }

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showNotification])

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="auth-container">
      {showNotification && (
        <Notification
          type={notificationType}
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
      
      <form className='auth-form' onSubmit={onSubmithandler}>
        <h1 className="form-title">Welcome Back</h1>
        
        <div className="form-group">
          <input 
            type="text" 
            placeholder='Username'
            className="form-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <input 
            type="password" 
            placeholder='Password'
            className="form-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button className="auth-button">Login</button>
        
        <div className="form-footer">
          <span>Don't have an account? </span>
          <Link to="/register" className="auth-link">Sign up</Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
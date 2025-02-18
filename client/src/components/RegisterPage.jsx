import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [notificationType, setNotificationType] = useState('success')
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

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      })
      
      if(response.status === 200) {
        setNotificationType('success')
        setNotificationMessage('Registration successful!')
      } else {
        setNotificationType('error')
        setNotificationMessage('Registration failed. Please try again.')
      }
      setShowNotification(true)
    } catch(error) {
      setNotificationType('error')
      setNotificationMessage('An error occurred. Please try again later.')
      setShowNotification(true)
    }
    setPassword('');
    setUsername('');
  }

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showNotification])

  return (
    <div className="auth-container">
      {showNotification && (
        <Notification
          type={notificationType}
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
      
      <form className='auth-form' onSubmit={onSubmitHandler}>
        <h1 className="form-title">Create Account</h1>
        
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
        
        <button className="auth-button">Register</button>
        
        <div className="form-footer">
          <span>Already have an account? </span>
          <Link to="/login" className="auth-link">Login</Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
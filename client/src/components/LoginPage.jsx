import React from 'react'

const LoginPage = () => {
  return (
    <div className="auth-container">
      <form className='auth-form'>
        <h1 className="form-title">Welcome Back</h1>
        
        <div className="form-group">
          <input 
            type="text" 
            placeholder='Username'
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <input 
            type="password" 
            placeholder='Password'
            className="form-input"
          />
        </div>
        
        <button className="auth-button">Login</button>
        
        <div className="form-footer">
          <span>Don't have an account? </span>
          <a href="/register" className="auth-link">Sign up</a>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
import React from 'react'

const RegisterPage = () => {
  return (
    <div className="auth-container">
      <form className='auth-form'>
        <h1 className="form-title">Create Account</h1>
        
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

        <div className="form-group">
          <input 
            type="password" 
            placeholder='Confirm Password'
            className="form-input"
          />
        </div>
        
        <button className="auth-button">Register</button>
        
        <div className="form-footer">
          <span>Already have an account? </span>
          <a href="/login" className="auth-link">Login</a>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
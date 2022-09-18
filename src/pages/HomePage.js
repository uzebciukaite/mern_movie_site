import React from 'react'
import LoginPage from './Login'
import RegisterPage from './Register'

const HomePage = () => {
  return (
    <div className="homepage">
        <RegisterPage/>
        <LoginPage/>
    </div>
  )
}

export default HomePage
import { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

// Auth wrapper toggling between the login and registration cards.
export function AuthScreen({ onLogin, onRegister }) {
  const [mode, setMode] = useState('login')
  return (
    <div className="auth-wrap">
      {mode === 'login' ? (
        <LoginForm onLogin={onLogin} onShowRegister={() => setMode('register')} />
      ) : (
        <RegisterForm onRegister={onRegister} onShowLogin={() => setMode('login')} />
      )}
    </div>
  )
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api'; // Commented out for demo
import './Auth.css';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulated API call for demo
      setTimeout(() => {
        console.log('Login attempt:', { email, password });
        // const res = await API.post('/auth/login', { email, password });
        // localStorage.setItem('token', res.data.token);
        // navigate('/dashboard/publications');
        setIsLoading(false);
        alert('Login successful! (Demo mode)');
      }, 1500);
      
      // Real implementation:
      // const res = await API.post('/auth/login', { email, password });
      // localStorage.setItem('token', res.data.token);
      // navigate('/dashboard/publications');
    } catch (err) {
      console.error(err);
      alert('Invalid credentials!');
      setIsLoading(false);
    }
  };

  return (
    <>


      <div className="login-page">
        <div className="background-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <div className="login-container">
          <div className="login-header">
            <div className="brand-logo">
              PH.
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your Portfolio Helper account</p>
          </div>

          <div className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label className="input-label" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">
                Password
              </label>
              <div className="password-container">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="button-spinner"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="login-footer">
            <p>
              Don't have an account?{' '}
              <a href="/register">Create one here</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
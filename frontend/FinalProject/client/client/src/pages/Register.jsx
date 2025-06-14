import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../services/api'; // Commented out for demo
import './Register.css';
function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({});
  // const navigate = useNavigate();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/)) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9!@#$%^&*]/)) strength += 25;
    return strength;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Update password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulated API call for demo
      setTimeout(() => {
        console.log('Register attempt:', formData);
        // await API.post('/auth/register', formData);
        // alert('Registration successful! Please log in.');
        // navigate('/pages/Login');
        setIsLoading(false);
        alert('Registration successful! Please log in. (Demo mode)');
      }, 2000);
      
      // Real implementation:
      // await API.post('/auth/register', formData);
      // alert('Registration successful! Please log in.');
      // navigate('/pages/Login');
    } catch (err) {
      console.error(err);
      alert('Error registering user.');
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return '#ef4444';
    if (passwordStrength < 50) return '#f97316';
    if (passwordStrength < 75) return '#eab308';
    return '#22c55e';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <>
      

      <div className="register-page">
        <div className="background-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <div className="register-container">
          <div className="register-header">
            <div className="brand-logo">
              PH
            </div>
            <h1 className="register-title">Create Account</h1>
            <p className="register-subtitle">Join Portfolio Helper and showcase your work</p>
          </div>

          <div className="register-form">
            <div className="input-group">
              <label className="input-label" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`input-field ${errors.name ? 'error' : ''}`}
              />
              {errors.name && (
                <div className="error-message">
                  ⚠️ {errors.name}
                </div>
              )}
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
                className={`input-field ${errors.email ? 'error' : ''}`}
              />
              {errors.email && (
                <div className="error-message">
                  ⚠️ {errors.email}
                </div>
              )}
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">
                Password
              </label>
              <div className="password-container">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`input-field ${errors.password ? 'error' : ''}`}
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
              
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className="strength-fill"
                      style={{
                        width: `${passwordStrength}%`,
                        backgroundColor: getPasswordStrengthColor()
                      }}
                    ></div>
                  </div>
                  <span 
                    className="strength-text"
                    style={{ color: getPasswordStrengthColor() }}
                  >
                    {getPasswordStrengthText()}
                  </span>
                </div>
              )}
              
              {errors.password && (
                <div className="error-message">
                  ⚠️ {errors.password}
                </div>
              )}
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="password-container">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="error-message">
                  ⚠️ {errors.confirmPassword}
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="register-button"
              disabled={isLoading}
              onClick={handleRegister}
            >
              {isLoading ? (
                <>
                  <div className="button-spinner"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className="register-footer">
            <p>
              Already have an account?{' '}
              <a href="/pages/Login">Sign in here</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
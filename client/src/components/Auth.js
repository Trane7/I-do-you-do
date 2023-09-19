import { useState } from 'react'

const Auth = () => {

  const [isLogIn, setIsLogIn] = useState(true)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)

  console.log(email, password, confirmPassword)

  const viewLogin = (status) => {
    setError(null)
    setIsLogIn(status)
  }

  //checking if the user is signed in or not
  const handleSubmit = async (e, endpoint) => {
    email.preventDefault()
    if (!isLogIn && password !== confirmPassword) {
      setError( 'Make sure passwords are matching!')
      return
    }

    const response = await fetch(`${process.env.REACT_APP_SEVERURL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({email, password})
    })

    const data = await response.json()
    
    if (data.detail) {
      setError(data.detail)
    } else {
      setCookie('Email', data.email)
      setCookie('AuthToken', data.token)
    }
  }


    return (
      <div className="auth-container">
        <div className="auth-container-box">
          {/* the form for loggin in with the functionality */}
          <form>
            <h2>{isLogIn ? 'Please log in' : 'Please sign up'}</h2>
            <input 
              type="email" 
              placeholder="email" 
              onChange={(e) => setEmail(e.target.value)}
              />
            <input 
              type="password" 
              placeholder="password" 
              onChange={(e) => setPassword(e.target.value)}
              />
            {!isLogIn &&<input 
              type="password" 
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              />}
            <input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')}/>
            {error && <p>{error}</p>}

          </form>
          {/* sign in and logout buttons with color changing depending on if the user logged in or not */}
          <div className="auth-options">
            <button 
            onClick={() => viewLogin(false)}
            style={{backgroundColor : !isLogIn ? 'rgb(255, 255, 255' : 'rgb(188, 188, 188'}}
            >Sign Up</button>
            <button 
            onClick={() => viewLogin(true)}
            style={{backgroundColor : isLogIn ? 'rgb(255, 255, 255' : 'rgb(188, 188, 188'}}
            >Login</button>
          </div>
        </div> 
      </div>
    );
  }
  
  export default Auth;
  
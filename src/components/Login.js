import React, { Component } from 'react';
import './Login.module.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true,
    };
  }

  render() {
    const { isLogin } = this.state;

    return (
      <div className='login-form'>
        <form>
          <h1>{isLogin ? 'Login' : 'Register'}</h1>
          <input placeholder='Username' type='text' />
          <input placeholder='Password' type='password' />
          {!isLogin && <input placeholder='Confirm password' type='password' />}
          <button>Login</button>
          <p>
            Do not have an account?{' '}
            <span
              onClick={() => {
                this.setState((prevState) => ({ isLogin: !prevState.isLogin }));
              }}
            >
              {isLogin ? 'Register' : 'Login'}
            </span>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
import * as React from 'react';
import LoginForm from '../components/LoginForm';

const SignupPage = () => {
  return(
    <>
      <LoginForm isSignup={true} />
    </>
  )
}

export default SignupPage;
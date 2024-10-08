import * as React from 'react';
import LoginForm from '../components/LoginForm';

export default function SignupPage() {
  return(
    <>
      <LoginForm isSignup={true} />
    </>
  )
}
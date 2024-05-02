import * as React from 'react';
import LoginForm from '../components/LoginForm';

const SignupPage = () => {
  const [isSignup, setIsSignup] = React.useState(true);
    return(
      <>
        <LoginForm
          isSignup={isSignup}
        />
      </>
    )
}

export default SignupPage;
import * as React from "react";
import LoginForm from "../components/LoginForm";

export default function LoginPage({ user }) {
  console.log("test", user);
  return (
    <>
      <LoginForm isSignup={false} />
    </>
  );
}

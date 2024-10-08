import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getErrorMessage } from "./errorMessage";
import API from "../api";
/* MaterialUI */
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { Button, Typography } from "@mui/material";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
/* MaterialUI icon */
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);

export default function LoginForm({ isSignup }) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChangeEmail = (event) => setInputEmail(event.target.value);
  const handleChangePassword = (event) => setInputPassword(event.target.value);

  const handleSignupClick = () => {
    navigate("/auth/signup");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const submitUserInformation = async (event) => {
    event.preventDefault();
    if (!inputEmail) {
      setErrorMessage("メールアドレスを入力してください");
    }
    if (!inputPassword) {
      setErrorMessage("パスワードを入力してください");
      return;
    }
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, inputEmail, inputPassword);
        const newUser = auth.currentUser;
        if (newUser) {
          const newUserId = newUser.uid;
          API.post(
            `${process.env.REACT_APP_API_URL}/data/signupData`,
            newUserId
          );
          navigate("/home");
        }
      } else {
        await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          API.post(`${process.env.REACT_APP_API_URL}/data/loginData`, userId);
          navigate("/home");
        } else {
          console.error("userIdがない");
        }
      }
    } catch (err) {
      console.error(
        `firebaseで${isSignup ? "ユーザー登録" : "サインイン"}時にエラー発生`,
        err
      );
      setErrorMessage(getErrorMessage(err.code));
    }
  };
  return (
    <Box
      onSubmit={submitUserInformation}
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label="Email"
        variant="standard"
        onChange={handleChangeEmail}
        required
      />
      <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password" required>
          Password
        </InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          onChange={handleChangePassword}
          required
        />
        <Button type="submit" color="primary" variant="contained" fullWidth>
          {isSignup ? "サインアップ" : "サインイン"}
        </Button>
        {isSignup ? (
          ""
        ) : (
          <Button onClick={() => handleSignupClick()}>サインアップ</Button>
        )}
      </FormControl>
      {errorMessage && <Typography>{errorMessage}</Typography>}
    </Box>
  );
}

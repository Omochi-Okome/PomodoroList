import React, { useEffect, useState } from "react";
import {useNavigate}from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const PersonalInformation = () => {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;


  return(
    <div>
      <h2>メールアドレス：{user.email}</h2>
    </div>

  )
}

export default PersonalInformation;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function LogoutPage() {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const logout = async () => {
      try {
        await signOut(auth);
        console.log("ログアウトに成功しました。");
        navigate("/auth/login");
      } catch (err) {
        console.log(err);
      }
    };
    logout();
  }, [auth, navigate]);

  return <div>ログアウト中...</div>;
}

import {useEffect} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`)
      .then(res => {
        console.log('ログアウトに成功しました')
        navigate('login');
      })
      .catch((err) => console.log('ログアウトできませんでした。',err))
  })

  return (
    <div>
      ログアウト中...
    </div>
  )
}

export default LogoutPage
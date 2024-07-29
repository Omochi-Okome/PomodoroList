import React, {useState, useEffect} from "react";
import API from "../../api";
import { getAuth } from "firebase/auth";

const UserActivity = () => {
  const [userActivity, setUserActivity] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchUserActivity(user);
    } else {
      console.error('ユーザー認証が無効です');
    }
  }, [user]); 

  const fetchUserActivity = async(user) => {
    try {
      const response = await API.get(`${process.env.REACT_APP_API_URL}/data`, {
        withCredentials: true,
        params: {
          userId: user.uid
      },
      });
      setUserActivity(response.data);
    } catch(err) {
      console.error(err);
    }
  }

  return(
    <div>
      <div>
        {console.log(userActivity)}
        {userActivity.length > 0 && userActivity[0] ? (
          <div>
            <h2>ユーザーID: {userActivity[0].userId}</h2>
            <h2>総ログイン回数: {userActivity[0].loginCount}</h2>
            <h2>追加したToDo: {userActivity[0].addCount}</h2>
            <h2>完了したToDo: {userActivity[0].finishCount}</h2>
            <h2>完了したポモドーロ: {userActivity[0].completePomodoros}</h2>
          </div>
        ) : (
          <p>データ読み込み中...</p>
        )}
      </div>
    </div>
  )
}

export default UserActivity;
import axios from "axios";
import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom";

import { User } from "../types/api/user";

export const useAuth = () => {
  const history = useHistory();
  const [ loding, setLoding ] = useState(false);

  const login = useCallback((id: string) => {
    setLoding(true);

    axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
      if (res.data) {
        history.push('/home');
      } else {
        alert('ユーザーが見つかりません');
      }
    })
    .catch(() => alert('ログインできません'))
    .finally(() => setLoding(false));

  }, [history]);
  return { login, loding };
}

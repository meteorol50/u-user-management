import axios from "axios";
import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom";

import { User } from "../types/api/user";
import { useLoginUser } from "./useLoginUser";
import { useMessage } from "./useMessage";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [ loding, setLoding ] = useState(false);

  const login = useCallback((id: string) => {
    setLoding(true);

    axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
      if (res.data) {
        setLoginUser(res.data);
        showMessage({ title: 'ログインしました', status: 'success'});
        history.push('/home');
      } else {
        showMessage({ title: 'ユーザーが見つかりません', status: 'error'});
        setLoding(false);
      }
    })
    .catch(() => {
      showMessage({ title: 'ログインできません', status: 'error'});
      setLoding(false);
    });

  }, [history, showMessage, setLoginUser]);
  return { login, loding };
}

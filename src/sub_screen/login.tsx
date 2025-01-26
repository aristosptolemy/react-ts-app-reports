import React, { useState, useEffect, ChangeEvent } from 'react';
import '../css/login.css';
import { LoginTest } from '../back_end/Server_End';

interface LoginInputs {
  username: string;
  password: string;
}

interface SettingProps {
  setCurrentPage: (page: string) => void;
  setisLoading: (value: boolean) => void;
}


export default function LoginPage({ setCurrentPage, setisLoading }: SettingProps) {
  const [UserName, setUserName] = useState<string>('');
  const [PassWord, setPassWord] = useState<string>('');
  const [LoginError, setLoginError] = useState<string>('');

  const login = async () => {
    setisLoading(true);
    const loginjudgement = await LoginTest(UserName, PassWord);
    if (loginjudgement.login_result){
      setCurrentPage('mainPage');
      console.log('ログイン成功');
    }else{
      setLoginError('ユーザーID、またはパスワードが間違っています。');
      console.log('ログイン失敗');
    }
    setisLoading(false)
  }
  useEffect(() => {
    setLoginError('');
  }, [])



  return (
    <div className="login-window">
      <div className="login-BG">
        <h2 className="login-title">ログイン</h2>
        <div className="login-page">
          <div>
            <input className="loginInput" placeholder='ログインID' type='text' onChange={(e) => setUserName(e.target.value)}/>
          </div>
          <div>
            <input className="loginInput" placeholder='パスワード' type='password' onChange={(e) => setPassWord(e.target.value)}/>
          </div>
          <div>{LoginError}</div>
          <div>
            <a className="buttonUnderlineSt" id="main_back" type="button" onClick={login}>
              ログイン
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

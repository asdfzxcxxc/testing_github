// /auth css 필요없음
// 전달받은 파라미터를 통해 코드를 추출하고, 그 코드로 엑세스 토큰을 추출하고
// 추출한 엑세스 토큰을 이용해 카카오 개인 정보에 접근해 데이터를 추출해옴
// 그리고 엑토, 리토, 이메일, 생일을 localStorage에 저장해놓음
import { useEffect } from "react";
import axios from 'axios';
import qs from "qs";

const AuthSignUp = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const REDIRECT_URI = "http://localhost:3000/authsignup";
  const REST_API_KEY = "2f24e2a9b9b8cf99534a84ef99af7f87";

  var getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code
    });

    try {
      // access token 가져오기
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );
      window.Kakao.init(REST_API_KEY);
      // access token 설정
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      

      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      localStorage.setItem("userEmail", data.kakao_account.email);
      localStorage.setItem("birthday", data.kakao_account.birthday);
    } catch (err) {
      console.log(err);
    }

    const email = localStorage.getItem("userEmail");
    await axios({
      url: `http://44.194.225.221:8080/checkDB`,
      method: 'get',
      params: {
        userEmail: email
      }
    }).then((res) => {
      if (res.data.code === 201) {
        alert(res.data.msg);
        localStorage.clear();
        window.location='/home'
      }else if(res.data.code === 200){
        alert(res.data.msg);
        window.location='/selecttype'
      }
    }).catch((err) =>
      console.log(err));
  };

  useEffect(async () => {
    getToken();
   }, [])

  return null;
};
export default AuthSignUp;
"use client";
import React, { useContext, useEffect, useState } from "react";
import { LogoFacebook, LogoGoogle } from "@/Icons/icon_Logo";

import { toast } from "react-toastify";
import useRequest from "@/hooks/request/request";
import { authLoginType, authModel } from "@/model/authModel";
import { LoadingSVGWatting } from "@/Icons/Loading";
import { authValidate } from "@/util/validate/authReq";
import { auth } from "@/apis/Auth";
import { useRouter } from "next/navigation";
import { loginProvider } from "@/hooks/redux/action/authProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";

import { EnvConfig } from "@/configs/envConfig";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  hasGrantedAnyScopeGoogle,
  useGoogleLogin,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Google_s } from "@/apis/Google";
import { hash64 } from "@/util/hash";

function Login({ Value }: { Value: any }) {
  const routes = useRouter();
  const [req_state, req_dispatch] = useRequest();
  const { Is_Loading } = req_state;
  const [ValueError, setValueError] = useState<any>({});
  const [valueLogin, setValueLogin] = useState<authLoginType>(
    authModel.initLogin
  );

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      Google_s.Post_Login_Google(tokenResponse).then((res) => {
        if (res.status === 200) {
          toast.success(res.message);
          localStorage.setItem("Access_Token", res.data.Access_Token);
          localStorage.setItem("is_Login", res.data.is_Login);
          req_dispatch({ type: "SUCCESS" });
          dispacth(loginProvider(res.data));
          setValueLogin(authModel.initLogin);
          routes.push("/");
        } else {
          req_dispatch({ type: "SUCCESS" });
          toast.error(res.message);
        }
      });
    },

    onError: () => {
      console.log("Login Failed");
    },
  });

  const dispacth = useDispatch();
  const getState = useSelector((state: RootState) => state.auth);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Is_Loading) {
      req_dispatch({ type: "REQUEST" });
      const checkError = authValidate.login(
        valueLogin.User_Email,
        valueLogin.User_Pass
      );
      setValueError(checkError.Error);
      if (!checkError.status) {
        auth
          .Login({ ...valueLogin, User_Pass: hash64(valueLogin.User_Pass) })
          .then((res) => {
            if (res.status === 200) {
              toast.success(res.message);
              localStorage.setItem("Access_Token", res.data.Access_Token);
              localStorage.setItem("is_Login", res.data.is_Login);
              req_dispatch({ type: "SUCCESS" });
              dispacth(loginProvider(res.data));
              setValueLogin(authModel.initLogin);
              routes.push("/");
            } else {
              req_dispatch({ type: "SUCCESS" });
              toast.error(res.message);
            }
          })
          .catch((err) => {
            req_dispatch({ type: "SUCCESS" });
            toast.error("Error" + err.status);
          });
      } else {
        let Arraykey = Object.keys(checkError.Error);
        Arraykey.map((key) => {
          toast.error(checkError.Error[key]);
        });
      }
    } else {
      toast.warning("Please dont spam");
    }
  };

  return (
    <div className={`FromLS LoginForm ${Value.ChangeForm ? "active" : ""}`}>
      <form onSubmit={submitForm}>
        <h1>Login</h1>
        <div className="inputText">
          <label htmlFor="Email"> Email</label>
          <input
            type="text"
            required
            value={valueLogin.User_Email}
            onChange={(e) =>
              setValueLogin({ ...valueLogin, User_Email: e.target.value })
            }
          />
          <div className="toastInput">
            {ValueError?.email != undefined && ValueError.email}
          </div>
        </div>
        <div className="inputText">
          <label htmlFor="Pass">Password</label>
          <input
            type="password"
            required
            value={valueLogin.User_Pass}
            onChange={(e) =>
              setValueLogin({
                ...valueLogin,
                User_Pass: e.target.value,
              })
            }
          />

          <div className="toastInput">
            {ValueError?.pass != undefined && ValueError.pass}
          </div>
        </div>
        <div className="selection" style={{ color: "#000" }}>
          <div className="remeber">
            <input type="checkbox" name="" />
            <p>Remember</p>
          </div>
          <p>Forgot Password</p>
        </div>
        <button
          className="Loginbtn"
          id={Is_Loading ? "Loginbtn" : "normal1"}
          type="submit"
        >
          {Is_Loading ? <LoadingSVGWatting /> : ""}
          Login
        </button>
      </form>
      <div className="otherOptions">
        <div className="titleOther" style={{ color: "#000" }}>
          Or
        </div>

        <button
          className="optionLogin google"
          onClick={() => {
            loginGoogle();
          }}
        >
          <i>
            <LogoGoogle />
          </i>
          <h3> Sign in with Google</h3>
        </button>

        <button className="optionLogin facebook">
          <i>
            {" "}
            <LogoFacebook />{" "}
          </i>
          <h3> Sign in with Facebook</h3>
        </button>
      </div>
      <div className="btnLink mt-20U ">
        <p style={{ color: "#000" }}>
          Dont have an account
          <span
            style={{ color: "#fff", cursor: "pointer" }}
            onClick={Value.HandleChangeForm}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

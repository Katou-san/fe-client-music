'use client'
import useRequest from "@/hooks/request/request";
import { authModel, authSignupType } from "@/model/authModel";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Selector } from "@reduxjs/toolkit";
import { authValidate } from "@/util/validate/authReq";
import { auth } from "@/apis/Auth";
import { useDispatch } from "react-redux";
import { signupProvider } from "@/hooks/redux/action/authProvider";

function Register({ Value }: { Value: any }) {


  const routes = useRouter()
  const dispatch = useDispatch()
  const [req_state, req_dispatch] = useRequest();
  const { Is_Loading } = req_state;
  const [valueSignup, setValueSignup] = useState<authSignupType>(authModel.initSignup);
  const [ValueError, setValueError] = useState({});


  const SubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Is_Loading) {
      req_dispatch({ type: "REQUEST" });
      const checkError = authValidate.signup(valueSignup.User_Email, valueSignup.User_Name, valueSignup.User_Pass, valueSignup.User_ConfirmPass)
      setValueError(checkError.Error);
      if (!checkError.status) {
        auth.Sigup(valueSignup)
          .then((res) => {
            if (res.status === 200) {
              toast.success(res.message);
              localStorage.setItem("Access_Token", res.data.Access_Token);
              localStorage.setItem("is_Login", res.data.is_Login);
              req_dispatch({ type: "SUCCESS" });
              dispatch(signupProvider(res.data))
              setValueSignup(authModel.initSignup);
              routes.push('/')
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
        Arraykey.map(key => {
          toast.error(checkError.Error[key]);

        })

      }
    } else {
      toast.warning("Please dont spam");
    }
  };

  return (
    <div className={`FromLS RegisterForm `}>
      <form onSubmit={SubmitRegister}>
        <h1>Sign Up</h1>
        <div className="inputText">
          <label htmlFor="SEmail"> Email</label>
          <input
            type="text"
            required
            value={valueSignup.User_Email}
            onChange={(e) => setValueSignup({ ...valueSignup, User_Email: e.target.value })}
          />

          <div className="toastInput">
            {/* {Object.keys(ValueError).length > 0 ? ValueError.Email : ""} */}
          </div>
        </div>
        <div className="inputText">
          <label htmlFor="SEmail"> Name</label>
          <input
            type="text"
            required
            value={valueSignup.User_Name}
            onChange={(e) => setValueSignup({ ...valueSignup, User_Name: e.target.value })}
          />

          <div className="toastInput">
            {/* {Object.keys(ValueError).length > 0 ? ValueError.Name : ""} */}
          </div>
        </div>
        <div className="inputText">
          <label htmlFor="SPass">Password</label>
          <input
            type="password"
            value={valueSignup.User_Pass}
            onChange={(e) => setValueSignup({ ...valueSignup, User_Pass: e.target.value })}
            required
          />

          <div className="toastInput">
            {/* {Object.keys(ValueError).length > 0 ? ValueError.Password : ""} */}
          </div>
        </div>

        <div className="inputText">
          <label htmlFor="SRPass">Confirm Pass</label>
          <input
            type="password"
            required
            value={valueSignup.User_ConfirmPass}
            onChange={(e) =>
              setValueSignup({ ...valueSignup, User_ConfirmPass: e.target.value })
            }
          />

          <div className="toastInput">
            {/* {Object.keys(ValueError).length > 0
              ? ValueError.ConfirmPassword
              : ""} */}
          </div>
        </div>
        <button
          className="mt-30U Loginbtn"
          // id={Is_Loading ? "Registerbtn" : "normal2"}
          type="submit"
        >
          {/* {Is_Loading ? <LoadingSVGWatting /> : ""} */}
          Register
        </button>
        <div className="btnLink mt-20U">
          <p style={{ color: "#000" }}>
            I have an account
            <span
              style={{ color: "#fff", cursor: "pointer" }}
              onClick={Value.HandleChangeForm}
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;

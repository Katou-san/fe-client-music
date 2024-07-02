'use client'
import useRequest from "@/hooks/request/request";
import { authModel, authSignupType } from "@/model/authModel";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Selector } from "@reduxjs/toolkit";

function Register({ Value }: { Value: any }) {


  const routes = useRouter()
  const [req_state, req_dispatch] = useRequest();
  const { Is_Loading } = req_state;
  const [valueSignup, setValueSignup] = useState<authSignupType>(authModel.initSignup);
  const [ValueError, setValueError] = useState({});


  // const SubmitRegister = (e) => {
  //   e.preventDefault();
  //   if (!Is_Loading) {
  //     dispatch({ type: "REQUEST" });
  //     setValueError(Check_Error_Register(FormValue).Detail_Error);
  //     if (!Check_Error_Register(FormValue).Has_Error) {
  //       const Name = FormValue.User_Email.split("@");
  //       const value = {
  //         ...FormValue,
  //         User_ConfirmPass: FormValue.User_Confirm_Pass,
  //       };
  //       SigupService(value)
  //         .then((res) => {
  //           if (res.status === 200) {
  //             toast.success(res.message);
  //             dispatch_Login({ type: "CHANGE", payload: res.data });
  //             Get_Playlist_User(
  //               res.data.Data_User.User_Id,
  //               res.data.Access_Token
  //             )
  //               .then((resopne) => {
  //                 dispatch_Playlist_user({
  //                   type: "CHANGE",
  //                   payload: resopne.data,
  //                 });
  //               })
  //               .catch((err) => console.error(err));

  //             dispatch({ type: "SUCCESS", payload: { data: res.data } });
  //             localStorage.setItem("Access_Token", res.data.Access_Token);
  //             localStorage.setItem("is_Login", res.data.is_Login);
  //             Navigate("/");
  //           } else {
  //             dispatch({ type: "ERROR", payload: {} });
  //             toast.error(res.message);
  //           }
  //         })
  //         .catch((err) => {
  //           dispatch({ type: "ERROR", payload: { error: err.data } });
  //           toast.error("2");
  //         });
  //     } else {
  //       dispatch({ type: "ERROR", payload: {} });
  //       const Error_Value = Check_Error_Register(FormValue).Detail_Error;
  //       let Arraykey = Object.keys(Error_Value);
  //       Arraykey.map((key) => toast.error(Error_Value[key]));
  //     }
  //   } else {
  //     toast.warning("Please dont spam");
  //   }
  // };

  return (
    <div className={`FromLS RegisterForm `}>
      <form onSubmit={() => { }}>
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

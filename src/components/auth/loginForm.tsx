'use client'

import { LogoFacebook, LogoGoogle } from "@/Icons/icon_Logo";

// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import React, { useContext, useState } from "react";

// import { User_Init } from "../../../Modules/Init_Provider";
// import { Check_Error_Login } from "../../../Modules/Handle_Login";
// import { LogoGoogle, LogoFacebook } from "../../../Component/Logo_Icon/Logo";
// import { LoadingSVGWatting } from "../../../Component/Logo_Icon/Loading";

// import { Get_Playlist_User, LoginService } from "../../../Service/User_Service";

// import { contextLogin } from "../../../Hook/index_Context";
// import useAxios from "../../../Hook/Custom_Hook/useAxios_Get";
// import "../../app/auth/_auth.scss"
function Login({ Value }: { Value: any }) {
  // const Navigate = useNavigate();
  // const { dispatch_Login, dispatch_Playlist_user } = useContext(contextLogin);

  // const [state, dispatch] = useAxios();
  // const { Is_Loading } = state;
  // const [ValueError, setValueError] = useState({});
  // const [FormLogin, setFormLogin] = useState(User_Init);

  // const Change_Value_Login = (value) => {
  //   setFormLogin({ ...FormLogin, ...value });
  // };

  // const LoginSubmitForm = (e) => {
  //   e.preventDefault();
  //   if (!Is_Loading) {
  //     dispatch({ type: "REQUEST" });
  //     setValueError(Check_Error_Login(FormLogin).Detail_Error);
  //     if (!Check_Error_Login(FormLogin).Has_Error) {
  //       LoginService(FormLogin)
  //         .then((res) => {
  //           if (res.status === 200) {
  //             toast.success(res.message);
  //             dispatch_Login({ type: "CHANGE", payload: res.data });
  //             Get_Playlist_User(
  //               res.data.Data_User.User_Id,
  //               res.data.Access_Token
  //             ).then((resopne) => {
  //               dispatch_Playlist_user({
  //                 type: "CHANGE",
  //                 payload: resopne.data,
  //               });
  //             });
  //             dispatch({ type: "SUCCESS", payload: { data: res.data } });
  //             localStorage.setItem("Access_Token", res.data.Access_Token);
  //             localStorage.setItem("is_Login", res.data.is_Login);
  //             setFormLogin(User_Init);
  //             Navigate("/");
  //           } else {
  //             dispatch({ type: "ERROR", payload: { error: null } });
  //             toast.error(res.message);
  //           }
  //         })
  //         .catch((err) => {
  //           dispatch({ type: "ERROR", payload: { error: err.data } });
  //           toast.error("Error" + err.status);
  //         });
  //     } else {
  //       const Error_Value = Check_Error_Login(FormLogin).Detail_Error;
  //       let Arraykey = Object.keys(Error_Value);
  //       Arraykey.map((key) => toast.error(Error_Value[key]));
  //     }
  //   } else {
  //     toast.warning("Please dont spam");
  //   }
  // };

  return (
    <div className={`FromLS LoginForm ${Value.ChangeForm ? "active" : ""}`}>
      <form onSubmit={() => { }}>
        <h1>Login</h1>
        <div className="inputText">
          <label htmlFor="Email"> Email</label>
          <input
            type="text"
            required
          // value={FormLogin.User_Email}
          // onChange={(e) => Change_Value_Login({ User_Email: e.target.value })}
          />
          <div className="toastInput">
            {/* {Object.keys(Check_Error_Login(FormLogin).Detail_Error).length > 0
              ? ValueError.Email
              : ""} */}
          </div>
        </div>
        <div className="inputText">
          <label htmlFor="Pass">Password</label>
          <input
            type="password"
            required
          // value={FormLogin.User_Pass}
          // onChange={(e) => Change_Value_Login({ User_Pass: e.target.value })}
          />

          <div className="toastInput">
            {/* {Object.keys(Check_Error_Login(FormLogin).Detail_Error).length > 0
              ? ValueError.Password
              : ""} */}
          </div>
        </div>
        <div className="selection" style={{ color: "#000" }}>
          <div className="remeber">
            <input type="checkbox" name="" />
            <p >Remember</p>
          </div>
          <p>Forgot Password</p>
        </div>
        <button
          className="Loginbtn"
          // id={Is_Loading ? "Loginbtn" : "normal1"}
          type="submit"
        >
          {/* {Is_Loading ? <LoadingSVGWatting /> : ""} */}
          Login
        </button>
      </form>
      <div className="otherOptions">
        <div className="titleOther" style={{ color: "#000" }}>Or</div>
        <button className="optionLogin google" >
          <i><LogoGoogle /></i>
          <h3 > Sign in with Google</h3>

        </button>
        <button className="optionLogin facebook">
          <i>  <LogoFacebook /> </i>
          <h3 > Sign in with Facebook</h3>

        </button>
      </div>
      <div className="btnLink mt-20U " >

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

"use client";
import { useState } from "react";
import "../auths/_auth.scss";
import "./_forget.scss";
import { User } from "@/apis/User";
import { resetValidate } from "@/util/validate/authReset";
import { toast } from "react-toastify";
const Forget = () => {
  const [value_email, set_value_email] = useState("");
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkError = resetValidate.resetEmail(value_email);
    if (!checkError.status) {
      User.Forget({ email: value_email });
    } else {
      const key = Object.keys(checkError.Error);
      toast.error(checkError.Error[key[0]]);
    }
  };
  return (
    <div className="frameForget">
      <div className={`FromLS FogetForm LoginForm ${true ? "active" : ""}`}>
        <form onSubmit={submitForm}>
          <h1>Forget password</h1>
          <div className="inputText">
            <label htmlFor="Email"> Email</label>
            <input
              type="text"
              required
              value={value_email}
              onChange={(e) => set_value_email(e.target.value)}
            />
            {/* <div className="toastInput">
                {ValueError?.email != undefined && ValueError.email}
              </div> */}
          </div>

          <div className="btnreset">
            <button
              className="Loginbtn"
              //   id={Is_Loading ? "Loginbtn" : "normal1"}
              type="submit"
            >
              {/* {Is_Loading ? <LoadingSVGWatting /> : ""} */}
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forget;

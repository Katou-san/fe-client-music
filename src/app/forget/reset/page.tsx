"use client";
import { useState } from "react";
import "../../auths/_auth.scss";
import "./_reset.scss";
import { User } from "@/apis/User";
import { useSearchParams } from "next/navigation";
import { resetValidate } from "@/util/validate/authReset";
import { toast } from "react-toastify";
import { hash64 } from "@/util/hash";

const Forget = () => {
  const seachParam = useSearchParams();
  const token = seachParam.get("id");
  const [value_pass, set_value_pass] = useState("");
  const [value_repass, set_value_repass] = useState("");
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkError = resetValidate.resetPass(value_pass, value_repass);
    if (!checkError.status) {
      User.Reset({
        token: token,
        pass: hash64(value_pass),
        repass: hash64(value_repass),
      });
    } else {
      const key = Object.keys(checkError.Error);
      toast.error(checkError.Error[key[0]]);
    }
  };
  return (
    <div className="frameReset">
      <div className={`FromLS ResetForm LoginForm ${false ? "active" : ""}`}>
        <form onSubmit={submitForm}>
          <h1>Reset password</h1>
          <div className="inputText">
            <label> Password</label>
            <input
              type="password"
              required
              value={value_pass}
              onChange={(e) => set_value_pass(e.target.value)}
            />
            {/* <div className="toastInput">
                {ValueError?.email != undefined && ValueError.email}
              </div> */}
          </div>
          <div className="inputText">
            <label> Confirm password</label>
            <input
              type="password"
              required
              value={value_repass}
              onChange={(e) => set_value_repass(e.target.value)}
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

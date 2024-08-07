"use client";
import { useEffect, useState } from "react";
import "../auths/_auth.scss";
import "./_forget.scss";
import { User } from "@/apis/User";
import { resetValidate } from "@/util/validate/authReset";
import { toast } from "react-toastify";
import { ArrowLineLeft_Icon } from "@/Icons/icon_Figma";
import Blob from "@/components/auth/Blob/BlobCP";
import { useRouter } from "next/navigation";
const Forget = () => {
  const [value_email, set_value_email] = useState("");
  const [errorValue, setErrorValue] = useState<any>()

  const routes = useRouter()

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
  useEffect(() => {
    setErrorValue(resetValidate.resetEmail(value_email).Error)
  }, [value_email])
  return (
    <div className="frameForget">
      <Blob />
      <div className={`FogetForm`}>
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
            <div className="toastInput">
              {errorValue?.email != undefined && errorValue?.email != '' && value_email != '' ? errorValue?.email : ''}
            </div>
          </div>

          <div className="framereset">
            <button
              className="btnreset"

              type="submit"
            >
              Confirm
            </button>
            <div className="btnforworad" onClick={() => {
              routes.push('/auths')
            }}>
              <ArrowLineLeft_Icon color="#38a8f3" w={30} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forget;

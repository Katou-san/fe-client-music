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
import { delay } from "@/util/function";
const Forget = () => {
  const [value_email, set_value_email] = useState("");
  const [errorValue, setErrorValue] = useState<any>()
  const [waitting, set_Waiting] = useState(false)
  const routes = useRouter()

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!waitting) {
      const checkError = resetValidate.resetEmail(value_email);
      if (!checkError.status) {
        User.Forget({ email: value_email })
          .then((res) => {
            if (res.status == 200) {
              toast.success(res.message)
              set_Waiting(true)
            } else {
              toast.error(res.message)
            }
          })
      } else {
        const key = Object.keys(checkError.Error);
        toast.error(checkError.Error[key[0]]);
      }
    }

  };

  useEffect(() => {
    if (waitting) {
      delay(3000).then(() => set_Waiting(!waitting))
    }
  }, [waitting])

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
              {!waitting ? "Send mail" : "Please check mailbox"}
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

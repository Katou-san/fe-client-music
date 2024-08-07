"use client";
import { useEffect, useState } from "react";
import "../../auths/_auth.scss";
import "../_forget.scss"
import './_reset.scss'
import { User } from "@/apis/User";
import { useRouter, useSearchParams } from "next/navigation";
import { resetValidate } from "@/util/validate/authReset";
import { toast } from "react-toastify";
import { hash64 } from "@/util/hash";
import Blob from "@/components/auth/Blob/BlobCP";
import { ArrowLineLeft_Icon } from "@/Icons/icon_Figma";

const Forget = () => {
  const seachParam = useSearchParams();
  const token = seachParam.get("id");
  const [value_reset, set_Value] = useState({ pass: '', repass: '' });
  const [errorValue, setErrorValue] = useState<any>()
  const routes = useRouter()

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkError = resetValidate.resetPass(value_reset.pass, value_reset.repass);
    if (!checkError.status) {
      User.Reset({
        token: token,
        pass: hash64(value_reset.pass),
        repass: hash64(value_reset.repass),
      }).then((res) => {
        if (res.status == 200) {

        }
      })
    } else {
      const key = Object.keys(checkError.Error);
      toast.error(checkError.Error[key[0]]);
    }
  };

  useEffect(() => {
    if (value_reset.pass != '' && value_reset.repass != '') {
      setErrorValue(resetValidate.resetPass(value_reset.pass, value_reset.repass).Error)
    } else {
      setErrorValue({})
    }

  }, [value_reset])

  return (
    <div className="frameForget frameReset">
      <Blob />
      <div className={`FogetForm`}>
        <form onSubmit={submitForm}>
          <h1>Forget password</h1>
          <div className="inputText">
            <label htmlFor="Email"> Pass</label>
            <input
              type="password"
              required
              value={value_reset.pass}
              onChange={(e) => set_Value({ ...value_reset, pass: e.target.value })}
            />
            <div className="toastInput">
              {errorValue?.pass != undefined && value_reset.pass != '' ? errorValue?.pass : ''}
            </div>
          </div>
          <div className="inputText">
            <label htmlFor="Email"> Confirm pass</label>
            <input
              type="password"
              required
              value={value_reset.repass}
              onChange={(e) => set_Value({ ...value_reset, repass: e.target.value })}
            />
            <div className="toastInput">
              {errorValue?.confirmpass != undefined && errorValue?.confirmpass != '' ? errorValue?.confirmpass : ''}
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
              routes.push('/forget')
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

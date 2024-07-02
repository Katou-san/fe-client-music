'use client'
import React, { ReactNode, useState } from "react";
// import Login from "../ui/Login";
// import Register from "../ui/Register";
// import "react-toastify/dist/ReactToastify.css";
import "./_auth.scss"
import { LoginDynamic, SignupDynamic } from "@/performance/components";
import Blob from "@/components/auth/Blob/BlobCP";
function Page({ children }: { children: ReactNode }) {
    const [ChangeForm, setChangeForm] = useState(false);
    const [valueError, setValueError] = useState({});
    const valueSend = {
        HandleChangeForm: () => {
            setChangeForm((prev) => !prev);
        },
        ChangeForm,
        GetValueError: (value: object) => {
            setValueError(value);
        },
    };
    return (
        <div className="farme">
            <Blob />
            <div className="formContent ">
                <LoginDynamic Value={valueSend} />
                <SignupDynamic Value={valueSend} />
            </div>
        </div>
    );
}

export default Page;

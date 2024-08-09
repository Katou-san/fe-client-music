'use client'
import React, { ReactNode, useState } from "react";
import "./_auth.scss"
import Blob from "@/components/auth/Blob/BlobCP";
import Login from "@/components/auth/loginForm";
import Register from "@/components/auth/signupForm";
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
                <Login Value={valueSend} />
                <Register Value={valueSend} />
            </div>
        </div>
    );
}

export default Page;

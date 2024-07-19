
import React, { useEffect, useRef, useState } from "react";
import './_logoutDialog.scss'
import { LoadingSVGWatting } from "@/Icons/Loading";
type Props = {
    drop_Down: boolean;
    set_Drop: () => void;
    style?: React.CSSProperties;
    on_Function: () => void;
};

const LogoutDialog = ({ drop_Down, set_Drop, style, on_Function = () => { } }: Props) => {
    const itemRef = useRef<HTMLInputElement | null>(null);
    const [is_Loading, set_Loading] = useState(false);
    useEffect(() => {
        let handle = (e: any) => {
            if (itemRef.current && !itemRef.current.contains(e.target)) {
                set_Drop();
            }
        };
        document.addEventListener("mousedown", handle);
        return () => {
            document.removeEventListener("mousedown", handle);
        };
    }, []);

    const HandleBtn = (type: boolean) => {
        if (type) {
            on_Function()
            set_Drop()
        } else {
            set_Drop()
        }
    }

    return (
        <div
            className={`LogoutDialog ${drop_Down && "activeLogoutDialog"}`}
            style={style}
            ref={itemRef}
        >
            {is_Loading && (
                <div className="frameLoading">
                    <LoadingSVGWatting w={70} />
                </div>
            )}
            {!is_Loading && (
                <>
                    <h1>Logout</h1>
                    <div className="ContentDialog overflow__Text" >
                        Do you want to logout?
                    </div>
                    <div className="frameBtnOption">
                        <div className="btnOption falseI cursor-pointer" onClick={() => HandleBtn(false)}>
                            <h3>Cancel</h3>
                        </div>
                        <div className="btnOption cursor-pointer trueI" onClick={() => HandleBtn(true)}>
                            <h3>Accept</h3>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LogoutDialog;

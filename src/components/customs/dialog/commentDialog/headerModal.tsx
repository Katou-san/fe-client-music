"use client";
import { RootState } from "@/hooks/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./_headerModal.scss";
import { LoadingSVGWatting } from "@/Icons/Loading";
import { toast } from "react-toastify";
import { logoutProvider } from "@/hooks/redux/action/authProvider";
type Props = {
    drop_Down: boolean;
    set_Drop: () => void;
    style?: React.CSSProperties;
};

const HeederModalDropDown = ({ drop_Down, set_Drop, style }: Props) => {
    const userProvider = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch()
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

    const handleLogout = () => {
        if (userProvider.Access_Token != '' && userProvider.is_Login) {
            dispatch(logoutProvider())
        } else {
            toast.warning('You are logged out!')
        }
    }

    return (
        <div
            className={`dropDownHeader ${drop_Down && "activeDropDownHeader"}`}
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
                    <h1>Menu</h1>
                    <ul>
                        <li className="overflow__Text">Profile</li>
                        <li className="overflow__Text falseI" >Logout</li>
                    </ul>
                </>
            )}
        </div>
    );
};

export default HeederModalDropDown;

"use client";
import { RootState } from "@/hooks/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./_headerModal.scss";
import { LoadingSVGWatting } from "@/Icons/Loading";
import { toast } from "react-toastify";
import { logoutProvider } from "@/hooks/redux/action/authProvider";
import LogoutDialog from "@/components/customs/dialog/logoutDialog/LogoutDialog";
import { Logout_Icon, NodeFind_Icon, User_Icon } from "@/Icons/icon_Figma";
import { useRouter } from "next/navigation";
import { useLayout } from "@/contexts/providerLayout";
type Props = {
    drop_Down: boolean;
    set_Drop: () => void;
    style?: React.CSSProperties;
};

const HeederModalDropDown = ({ drop_Down, set_Drop, style }: Props) => {
    const { setShowFind } = useLayout()
    const [drop_Dialog, set_Dialog] = useState(false)
    const userProvider = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch()
    const itemRef = useRef<HTMLInputElement | null>(null);
    const [is_Loading, set_Loading] = useState(false);
    const routes = useRouter()
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

    const handleProfile = () => {
        if (userProvider.Access_Token != '' && userProvider.is_Login) {
            routes.push(`/profile?id=${userProvider.User_Id}`);
            set_Drop();
        }
    }

    const handleLogout = () => {
        if (userProvider.Access_Token != '' && userProvider.is_Login) {
            dispatch(logoutProvider())
            set_Drop();
        } else {
            toast.warning('You are logged out!')
            set_Drop();
        }
    }

    return (
        <>
            <div
                className={`dropDownHeader ${!drop_Dialog ? drop_Down && "activeDropDownHeader" : ""}`}
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
                            <li className="overflow__Text iconUser" onClick={handleProfile}>
                                <User_Icon />
                                <h3>Profile</h3>
                            </li>
                            <li className="overflow__Text iconUser" onClick={() => {
                                setShowFind(true)
                                set_Drop()
                            }}>
                                <NodeFind_Icon w={27} />
                                <h3>Find song</h3>
                            </li>
                            <li className="overflow__Text falseI iconLogout" onClick={() => set_Dialog(true)}>
                                <Logout_Icon />
                                <h3>Logout</h3>

                            </li>
                        </ul>
                    </>
                )}
            </div>
            <LogoutDialog set_Drop={() => set_Dialog(false)} drop_Down={drop_Dialog} on_Function={handleLogout} style={{ top: '100%', left: "-20%" }} />
        </>

    );
};

export default HeederModalDropDown;

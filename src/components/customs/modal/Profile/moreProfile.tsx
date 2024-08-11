"use client";
import { RootState } from "@/hooks/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./_moreProfie.scss";
import { LoadingSVGWatting } from "@/Icons/Loading";
type Props = {
    drop_Down: boolean;
    set_Drop: () => void;
    style?: React.CSSProperties
    type?: number
    func?: () => void
};

const MoreProfileDropDown = ({ drop_Down, set_Drop, style, type = 0, func = () => { } }: Props) => {
    const userProvider = useSelector((state: RootState) => state.auth);
    const itemRef = useRef<HTMLInputElement | null>(null);
    const [is_Loading, set_Loading] = useState(false)
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

    useEffect(() => {

    }, [drop_Down]);

    const handleDeleteComment = () => {
        if (userProvider.Access_Token != '' && userProvider.is_Login) {

        }
    }

    return (
        <div
            className={`dropDownProfile ${drop_Down && "activeDropDownProfile"}`}
            style={style}
            ref={itemRef}
        >
            {is_Loading && <div className="frameLoading">
                <LoadingSVGWatting w={70} />
            </div>}
            {!is_Loading && <>
                <ul>
                    <li
                        className={` ${type == 1 ? "paused" : ""} overflow__Text`}
                        onClick={() => {
                            func()
                            set_Drop()
                        }}
                    >
                        Change password
                    </li>
                    <li
                        className={` paused overflow__Text`}
                        onClick={set_Drop}
                    >
                        Closed
                    </li>

                </ul> </>}
        </div>
    );
};

export default MoreProfileDropDown;

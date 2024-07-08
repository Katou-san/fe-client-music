"use client";
import Menu from "@/components/header/menu/menu";
// import Menu from "@/components/header/menu/menu";
import { User_Icon } from "@/Icons/icon_Figma";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import "./_avatar.scss";
import Image from "next/image";
import { UserIcon } from "@/Icons/icon_v1";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import { Send } from "@/apis/Send";
import { URLValidate } from "@/util/validate/url";

export default function Avartar() {
  const is_Login = false;
  const [avatar, set_Avatar] = useState("");
  const [StatusMenu, Set_StatusMenu] = useState(false);
  const getStateAuth = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (getStateAuth.is_Login) {
      if (URLValidate.isUrl(getStateAuth.Avatar)) {
        Send.Avatar(getStateAuth.Avatar).then((res) =>
          set_Avatar(URL.createObjectURL(res))
        );
      } else {
        set_Avatar(getStateAuth.Avatar);
      }
    }
  }, [getStateAuth]);

  const TogoMenu = () => {
    return Set_StatusMenu((prev) => !prev);
  };
  return (
    <div className="FrameBtnLogin cursor_pointer">
      <Link href={"/auths"}>
        <div className="LoginButton" id={getStateAuth.is_Login ? "Hidden" : ""}>
          <i>
            <UserIcon />
          </i>
          <span>{getStateAuth.User_Name}</span>
        </div>
      </Link>
      <div
        className="btnAvartar cursor_pointer"
        id={!getStateAuth.is_Login ? "Hidden" : ""}
        onClick={TogoMenu}
      >
        <Image src={avatar ?? ""} alt="" width={1000} height={1000} />
        <span className="overflow__Text">{getStateAuth.User_Name}</span>
      </div>
      {/* <Menu showMenu={StatusMenu} event={TogoMenu} /> */}
    </div>
  );
}

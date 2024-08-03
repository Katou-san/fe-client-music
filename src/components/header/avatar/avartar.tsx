"use client";
import React, { useEffect, useState } from "react";
import "./_avatar.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import { Send } from "@/apis/Send";
import { URLValidate } from "@/util/validate/url";
import imgTemp from "../../../../public/temp.jpg";

export default function Avartar() {
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
      <div
        className="btnAvartar cursor_pointer"
        id={!getStateAuth.is_Login ? "Hidden" : ""}
        onClick={TogoMenu}
      >
        <Image
          src={avatar || imgTemp}
          alt=""
          width={100}
          height={100}
          loading="lazy"
        />
        <span className="overflow__Text">{getStateAuth.User_Name}</span>
      </div>
    </div>
  );
}

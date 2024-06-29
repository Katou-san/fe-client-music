'use client'
import Menu from "@/components/header/menu/menu";
// import Menu from "@/components/header/menu/menu";
import { User_Icon } from "@/Icons/icon_Figma";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import "./_avatar.scss"
import Image from "next/image";
import { UserIcon } from "@/Icons/icon_v1";
// import { UserIcon } from "../../Logo_Icon/Icon";
// import { Link } from "react-router-dom";
// import "./AvaterHeader.css";
// import Menu from "../MenuHeader/MenuHeader";
// import { Get_User_Avatar } from "../../../Service/Get_File_Service";
// import { contextLogin } from "../../../Hook/index_Context";

export default function Avartar() {
  const is_Login = false
  // const { state_Login } = useContext(contextLogin);
  // const { is_Login } = state_Login;
  // const { Avatar, User_Name } = state_Login.Data_User;
  // const [Avatar_url, Set_Avatar_url] = useState(null);
  const [StatusMenu, Set_StatusMenu] = useState(false);

  // useEffect(() => {
  //   if (is_Login) {
  //     Get_User_Avatar(Avatar)
  //       .then((res) => {
  //         Set_Avatar_url(URL.createObjectURL(res));
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [state_Login]);

  const TogoMenu = () => {
    return Set_StatusMenu((prev) => !prev);
  };
  return (
    <div className="FrameBtnLogin cursor_pointer">
      <Link href={'/auths'} >
        <div className="LoginButton" id={is_Login ? "Hidden" : ""}>
          <i><UserIcon /></i>
          <span>Login</span>
        </div>
      </Link>
      <div
        className="btnAvartar cursor_pointer"
        id={!is_Login ? "Hidden" : ""}
        onClick={TogoMenu}
      >
        <Image src={""} alt="" width={1000} height={1000} />
        <span className="overflow__Text">{'User_Name'}</span>
      </div>
      {/* <Menu showMenu={StatusMenu} event={TogoMenu} /> */}
    </div>
  );
}

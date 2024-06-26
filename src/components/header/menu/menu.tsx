'use client'

import { AddSongIcon, AIIcon2, ChangeAccountIcon, LogoutIcon, SettingIcon } from "@/Icons/icon_v1";
import React, { useContext, useRef } from "react";
// import {
//   Init_Value_Login,
//   Init_Value_Playlist_Login,
// } from "../../../Util/Init_Value";


// import { contextComponent, contextLogin } from "../../../Hook/index_Context";
// import { useNavigate } from "react-router-dom";
export default function Menu({ showMenu, event }: { showMenu: any, event: any }) {
  // const { dispatch_Login, dispatch_Playlist_user } = useContext(contextLogin);
  // const { Set_Show_Add_Song, dispatch_Show_Manage } =
  //   useContext(contextComponent);
  const menuElement = useRef();
  // const Navigate = useNavigate();
  return (
    <div className="optionNav" id={showMenu ? "ShowMenu" : ""}>
      <ul
        // ref={menuElement}

        className="ulForm">
        <li onClick={event}>
          <ChangeAccountIcon />
          <span>Change account</span>
        </li>
        <li onClick={event}>
          <SettingIcon />
          <span>Setting</span>
        </li>
        <li
          onClick={() => {
            // Navigate("/manage");
          }}
        >
          <AIIcon2 />
          <span>Manage</span>
        </li>
        <li
          onClick={() => {
            event();
            // Set_Show_Add_Song((prev) => !prev);
          }}
        >
          <AddSongIcon />
          <span>Add Song</span>
        </li>
        <li
          onClick={() => {
            event();
            localStorage.removeItem("is_Login");
            localStorage.removeItem("Access_Token");
            // dispatch_Login({
            //   type: "CHANGE",
            //   payload: { Init_Value_Login, is_Login: false },
            // });
            // dispatch_Playlist_user({
            //   type: "CHANGE",
            //   payload: { Playlist: [], List_Add_Songs: [], List_Like_Song: [] },
            // });
          }}
        >
          <LogoutIcon />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}

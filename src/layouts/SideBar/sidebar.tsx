"use client";
import React from "react";
import "./_sidebar.scss";

import { Logo_DarkHole } from "@/Icons/icon_Logo";
import Link from "next/link";
import { AddListMusicIcon } from "@/Icons/icon_v1";

import {
  sidebarConfig,
  sidebarLibraryConfig,
  SidebarType,
} from "@/configs/sidebarConfig";
import { usePathname } from "next/navigation";
function Sidebar() {
  const route = usePathname();

  return (
    <aside className="Sidebar">
      <div className="HeaderSidebar">
        <span></span>
        <Logo_DarkHole w={70} color="#A5D7E8" />
        <h1>Yuta</h1>
        <span></span>
      </div>
      <div className="CenterSidebar">
        <div className="title">
          <h1>Menu</h1>
        </div>
      </div>
      <div className="ContentLF">
        <ul>
          {sidebarConfig.map((item: SidebarType, index) => {
            return (
              <Link
                href={item.url}
                key={index}
                // "active" : "inactive"
                className={route == item.url ? "active" : "inactive"}
              >
                <li>
                  {item.icons} <h3>{item.title}</h3>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>

      <div className="CenterSidebar">
        <div className="title">
          <h1>Library</h1>
        </div>
        <div onClick={() => {}} className="btnPlaylist">
          <AddListMusicIcon />
          <span>Create playlist</span>
        </div>
      </div>

      <div className="ContentLF">
        <ul>
          {sidebarLibraryConfig.map((item: SidebarType, index) => {
            return (
              <Link
                href={item.url}
                key={index}
                // "active" : "inactive"
                className={route == item.url ? "active" : "inactive"}
              >
                <li>
                  {item.icons}

                  <h3>{item.title}</h3>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>

      {/* <LeftListMusic Value_Change={Togo} /> */}
    </aside>
  );
}
export default Sidebar;

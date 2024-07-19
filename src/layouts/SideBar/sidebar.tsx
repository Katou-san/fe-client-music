"use client";
import React, { useEffect, useRef, useState } from "react";
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
import ModalPlaylist from "@/components/sidebar/ModalPlaylist/modalPlaylist";
function Sidebar() {
  const route = usePathname();
  const itemRef = useRef<HTMLInputElement | null>(null);
  const [modal_Open, set_Open] = useState(false);
  useEffect(() => {
    let handle = (e: any) => {
      if (itemRef.current && !itemRef.current.contains(e.target)) {
        set_Open(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  }, []);

  const handle_CloseModal = () => {
    set_Open(false);
  };
  return (
    <aside className="Sidebar">
      <div className="HeaderSidebar">
        <span></span>
        <Logo_DarkHole w={70} color="#A5D7E8" />
        <h1>Hotaru</h1>
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

      <div className="CenterSidebar" ref={itemRef}>
        <div className="title">
          <h1>Library</h1>
        </div>
        <div
          onClick={() => {
            set_Open((prev) => !prev);
          }}
          className="btnPlaylist"
        >
          <AddListMusicIcon />
          <span>Create playlist</span>
        </div>

        <ModalPlaylist modal_Open={modal_Open} onClose={handle_CloseModal} />
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
    </aside>
  );
}
export default Sidebar;

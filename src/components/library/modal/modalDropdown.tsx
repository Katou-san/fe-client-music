"use client";
import { Playlist } from "@/apis/Playlist";
import { RootState } from "@/hooks/redux/store";
import { playlistType } from "@/model/playlistModel";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
type Props = {
  drop_Down: boolean;
  set_Drop: () => void;
  playlist: playlistType
};

const ModalDropdown = ({ drop_Down, set_Drop, playlist }: Props) => {
  const userProvider = useSelector((state: RootState) => state.auth)
  const itemRef = useRef<HTMLInputElement | null>(null);
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

  const handleDelete = () => {
    if (userProvider.Access_Token != '' && userProvider.is_Login) {
      Playlist.Delete(playlist.Playlist_Id)
        .then((res) => {
          if (res.status == 200) {
            toast.success(res.message)
          } else {
            toast.error(res.message)
          }
        })
    } else {
      toast.warning('Please login to delete your playlist')
    }

  }

  return (
    <div
      className={`dropDownItemLine ${drop_Down && "activeDropDownItemLine"}`}
      ref={itemRef}
    >
      <ul>
        <li className="paused" onClick={handleDelete}>Delete</li>
      </ul>
    </div>
  );
};

export default ModalDropdown;

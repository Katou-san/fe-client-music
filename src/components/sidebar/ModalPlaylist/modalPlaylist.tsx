import React, { useState } from "react";
import "./_modalPlaylist.scss";
import { Close_Icon } from "@/Icons/icon_Figma";
import { create_Playlist, playlistModel } from "@/model/playlistModel";
import { playlistValidate } from "@/util/validate/playlistReq";
import { Playlist } from "@/apis/Playlist";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
type Props = {
  modal_Open: boolean;
  onClose: () => void;
};
const ModalPlaylist = ({ modal_Open, onClose }: Props) => {
  const userProvider = useSelector((state: RootState) => state.auth)
  const [value_Playlist, set_Value] = useState<create_Playlist>(
    playlistModel.init_create
  );

  const handleCreate = () => {
    if (userProvider.Access_Token != '' && userProvider.is_Login) {
      const validate = playlistValidate.create(
        value_Playlist.Playlist_Name,
      );
      if (!validate.status) {
        Playlist.Create({ ...value_Playlist, Type: 1, Playlist_Name: userProvider.User_Name }).then((res) => {
          if (res.status === 200) {
            toast.success("created successfully!");
            onClose()
          }
        });
      } else {
        const getKey = Object.keys(validate.Error);
        toast.error(validate.Error[getKey[0]]);
      }
    } else {
      toast.warning("You need login to create a playlist")
    }

  };

  return (
    <div
      className={`frameModalPlaylist ${modal_Open == true && "ActiveframeModalPlaylist"
        }`}
    >
      <header>
        <h3>Create playlist</h3>
        <div className="frameIcon" onClick={onClose}>
          <Close_Icon color="#000" w={30} />
        </div>
      </header>
      <div className="contentFrame">
        <input
          type="text"
          className="inputNamePlaylist"
          placeholder="Name"
          value={value_Playlist.Playlist_Name}
          onChange={(e) =>
            set_Value({ ...value_Playlist, Playlist_Name: e.target.value })
          }
        />
        <div className="inputCheck">
          <h3>Public</h3>
          <input
            type="checkbox"
            name=""
            id="inputModalPlaylist"
            onChange={(e) => {
              set_Value({
                ...value_Playlist,
                is_Publish: e.currentTarget.checked,
              });
            }}
          />
        </div>
      </div>
      <div className="footerModalPlaylist">
        <div className="btnModal btnClose" onClick={onClose}>
          Close
        </div>
        <div className="btnModal btnAction" onClick={handleCreate}>
          Action
        </div>
      </div>
    </div>
  );
};

export default ModalPlaylist;

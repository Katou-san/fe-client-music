import { Send } from "@/apis/Send";
import { useAudio } from "@/contexts/providerAudio";
import { LineSoundAnimation } from "@/Icons/cusIcons/lineSound";
import { Star_Icon } from "@/Icons/icon_Figma";
import { AddIcon } from "@/Icons/icon_v1";
import { LoadingSVGWatting } from "@/Icons/Loading";
import { songType } from "@/model/songModel";
import { URLValidate } from "@/util/validate/url";
import imgTemp from "../../../../public/temp.jpg"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { create_likeType, likeModel } from "@/model/likeModel";
import { Like } from "@/apis/Like";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import { Track } from "@/apis/Track";
import { toast } from "react-toastify";
import PlaylistModalDropDown from "@/components/customs/modal/playlistModal";


type Props = {
  item: songType;
  index: number;
  active: boolean;
};
const ItemListPopup = ({ item, index, active }: Props) => {
  const { setIndex, currentIndex } = useAudio();

  const userProvider = useSelector((state: RootState) => state.auth)
  const infoProvider = useSelector((state: RootState) => state.info)
  const [drop_Down, set_Drop] = useState(false)
  const [stateLike, set_StateLike] = useState<create_likeType>(
    likeModel.init_create
  );
  const [is_Loading, set_Loading] = useState(false)
  const [url, set_url] = useState("");

  useEffect(() => {
    set_Loading(true)
    if (item.Song_Id != '' && item.Song_Id != undefined) {
      if (URLValidate.isUrl(item.Song_Image)) {
        Send.Image_S(item.Song_Image).then((res) => {
          set_url(URL.createObjectURL(res))
        }
        );
      } else {
        set_url(item.Song_Image);
      }
    }
  }, [item, index, active]);

  useEffect(() => {
    if (userProvider.Access_Token != "" && userProvider.is_Login) {
      if (item && active) {
        Like.Get_Current(item.Song_Id, 0).then((res) => {
          if (res.status == 200) {
            set_StateLike(res.data)
            set_Loading(false);
          }
        });
      }
    }
    set_Loading(false);
  }, [active])

  const handleLike = () => {
    if (userProvider.Access_Token != "" && userProvider.is_Login && infoProvider.Like != '') {
      if (item.Song_Id != null && item.Song_Id != '') {
        if (stateLike.State == 1) {
          Like.Togo_Create_Update({ ...stateLike, Topic_Id: item.Song_Id, State: 0, Type: 0 })
            .then(res => {
              Get_Like()
              Track.Delete(infoProvider.Like, item.Song_Id)
            })
        } else {
          Like.Togo_Create_Update({ ...stateLike, Topic_Id: item.Song_Id, State: 1, Type: 0 })
            .then(res => {
              Get_Like()
              Track.Create({ Playlist_Id: infoProvider.Like, Song_Id: item.Song_Id })
            })
        }
      }

    } else {
      toast.error("You need login");
    }
  }

  const Get_Like = () => {
    Like.Get_Current(item.Song_Id, 0).then((res) => {
      if (res.status == 200) {
        set_StateLike(res.data)
      }
    })
  }



  return (
    <div
      className={`ItemListPopup cursor_pointer ${currentIndex == index && "isActiveItemPopup"
        }`}
    >
      {is_Loading && <div className="frameLoading">
        <LoadingSVGWatting w={70} color="#000" />
      </div>}
      {!is_Loading &&
        <>
          <div className="indexListPopup" onClick={() => setIndex(index)}>
            {currentIndex == index && <LineSoundAnimation />}
            {currentIndex != index && index + 1}
          </div>
          <div className="frameImagePopup" onClick={() => setIndex(index)}>
            <Image src={url || imgTemp} width={20} height={20} alt="" loading="lazy" />
          </div>
          <div className="infomationItemPopup" onClick={() => setIndex(index)}>
            <h1 className="overflow__Text">{item.Song_Name}</h1>
            <h3 className="overflow__Text">{item.Artist}</h3>
          </div>
          <div className="frameIconItemPopup">
            <div className="frameIcon" onClick={handleLike}>
              <Star_Icon w={30} active={stateLike.State == 1} />
            </div>
            <div className="frameIcon addIcon" onClick={() => set_Drop(true)}>
              <AddIcon />
            </div>
            <PlaylistModalDropDown drop_Down={drop_Down} set_Drop={() => set_Drop(false)} song={item} style={{ left: '35%', top: "0%" }} />
          </div>
        </>}
    </div>
  );
};

export default ItemListPopup;

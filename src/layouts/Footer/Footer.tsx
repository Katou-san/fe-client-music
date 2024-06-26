import { useState, useEffect, useRef, useContext } from "react";
// import {
//   Get_Song_Img,
//   Get_Song_Audio,
// } from "../../../Service/Get_File_Service";
// import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
// import {
//   PlayIcon,
//   PauseIcon,
//   ShuffleIcon,
//   RepeatIcon,
//   ForwardIcon,
//   BackwardIcon,
//   VolumeIcon,
// } from "../../Logo_Icon/Icon";
// import { Handle_Song } from "../../../Modules/Handle_Song/HandleSong";
import "./_footer.scss";
// import { Find_Song } from "../../../Service/Song_Service";
// import { contextComponent } from "../../../Hook/index_Context";

function Footer() {
  // const audioRef = useRef();
  // const { state_Current_Play, dispatch_Current_Play } =
  //   useContext(contextComponent);
  // const { Current_Index, Current_Playlist } = state_Current_Play;

  // const [volume, setvolume] = useState(50);
  // const [List_Current_Song, Set_List_Current_Song] = useState([]);

  // const [Data_Song, Set_Data_Song] = useState({});
  // const [Image, setImage] = useState("");
  // const [Audio, setAudio] = useState("");
  // const [Random, setRandom] = useState(true);

  // useEffect(() => {
  //   Set_List_Current_Song(Current_Playlist);
  // }, [Current_Playlist]);

  // useEffect(() => {
  //   if (List_Current_Song.length > 0) {
  //     Find_Song(List_Current_Song[Current_Index])
  //       .then((res) => {
  //         Set_Data_Song(res.data);
  //         Get_Song_Img(res.data.Song_Image).then((blob) =>
  //           setImage(URL.createObjectURL(blob))
  //         );
  //         Get_Song_Audio(res.data.Song_Src).then((blob) =>
  //           setAudio(URL.createObjectURL(blob))
  //         );
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [List_Current_Song, Current_Index]);

  // const Random_btn = () => {
  //   setRandom((prev) => !prev);
  //   if (Random) {
  //     Set_List_Current_Song(Handle_Song.Random_Song(Current_Playlist));
  //   } else {
  //     Set_List_Current_Song(Current_Playlist);
  //   }
  // };
  return (
    <footer>
      hello
      {/* <div className="footerEnd">
        <div className="LeftF">
          <img src={Image} alt="" srcSet="" />
          <div className="ContentFE">
            <h3>{Data_Song ? Data_Song.Song_Name : ""}</h3>
            <p>{Data_Song ? Data_Song.User_Id : ""}</p>
          </div>
        </div>
        <div className="CenterF">
          <AudioPlayer
            src={Audio}
            ref={audioRef}
            volume={volume / 100}
            onClickNext={() =>
              dispatch_Current_Play({
                type: "CHANGE",
                payload: {
                  Current_Index: Handle_Song.Next_Song(
                    Current_Index,
                    List_Current_Song.length - 1
                  ),
                },
              })
            }
            onClickPrevious={() =>
              dispatch_Current_Play({
                type: "CHANGE",
                payload: {
                  Current_Index: Handle_Song.Pre_Song(
                    Current_Index,
                    List_Current_Song.length - 1
                  ),
                },
              })
            }
            layout="stacked-reverse"
            autoPlay={false}
            customIcons={{
              play: <PlayIcon w={50} />,
              pause: <PauseIcon w={50} />,
              next: <ForwardIcon w={30} />,
              previous: <BackwardIcon w={30} />,
              loop: <RepeatIcon w={30} color={"red"} />,
              loopOff: <RepeatIcon w={30} />,
            }}
            showJumpControls={false}
            showSkipControls={true}
            customProgressBarSection={[
              RHAP_UI.CURRENT_TIME,
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.DURATION,
            ]}
            customVolumeControls={[RHAP_UI.LOOP]}
            customAdditionalControls={[<ShuffleIcon w={30} />]}
          />
          <div className="volumebtn">
            <VolumeIcon value={volume} />
            <input
              type="range"
              value={volume}
              onChange={(e) => {
                audioRef.current.audio.current.volume = e.target.value / 100;
                setvolume(e.target.value);
              }}
              max={100}
            />
          </div>
        </div>
      </div> */}
    </footer>
  );
}

export default Footer;

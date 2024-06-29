'use client'
import { useEffect, useRef } from "react";
import "./_footer.scss";
import Image from "next/image";
import { BackwardIcon, ForwardIcon, RepeatIcon } from "@/Icons/icon_v1";
import { List1_Icon, Pause_Icon, Play_Icon, Shuffle_Icon, Volume_Icon } from "@/Icons/icon_Figma";
import { useAudio } from "@/contexts/providerAudio";
import { secondsToMinute } from "@/util/time";
import { useLayout } from "@/contexts/providerLayout";


function Footer() {
  const { setShowPopup } = useLayout()
  const progressbarRef = useRef<HTMLInputElement>(null)
  const volumeRef = useRef<HTMLInputElement>(null)
  const { is_Playing, setPlay, duration, currentTime, changeRange, setVolume, next, prev, volume, currentIndex } = useAudio()
  const url = "https://www.siliconera.com/wp-content/uploads/2024/05/star-rail-hope-is-a-thing-with-feathers-guide.jpg"
  useEffect(() => {
    if (progressbarRef.current?.max != undefined) {
      progressbarRef.current.max = String(duration)
    }
  }, [duration, currentIndex])

  return (
    <footer>
      <div className="frameFooter">
        <div className="contentStart">
          <Image alt="" src={url} width={1000} height={1000} />
          <div className="contentFooter">
            <h1 className="overflow__Text">Name</h1>
            <h3 className="overflow__Text">by artist</h3>
          </div>
        </div>
        <div className="frameCenter">
          <div className="contentCenter">
            <div className="topCenter">
              <div className="btnFooter">
                <span></span>
                <div className="btnShuffle cursor_pointer">
                  <Shuffle_Icon w={30} />
                </div>
                <div className="btnBackward cursor_pointer" onClick={() => prev(progressbarRef)}>
                  <BackwardIcon />
                </div>
                <div className="btnPlayPause cursor_pointer" onClick={() => {
                  setPlay(progressbarRef)

                }}>
                  {is_Playing ? <Pause_Icon w={30} /> : <Play_Icon w={50} />}
                </div>
                <div className="btnForward cursor_pointer" onClick={() => next(progressbarRef)}>
                  <ForwardIcon />
                </div>
                <div className="btnRepeat cursor_pointer">
                  <RepeatIcon active={false} w={22} />
                </div>


                <span></span>
              </div>
            </div>
            <div className="bottonCenter">
              <div className="timeFooterStart">{secondsToMinute(currentTime)}</div>
              <div className="frameLineSong">
                <input type="range" name="" id="lineSong" defaultValue={0} ref={progressbarRef}
                  max={duration}
                  onChange={(e) => {
                    if (progressbarRef.current?.value != undefined) {
                      changeRange(Number(progressbarRef.current.value))
                    }
                    progressbarRef.current?.style.setProperty('--seek-before-width', `${Number(progressbarRef.current.value) / duration * 100}`)
                  }} />
              </div>

              <div className="timeFooterEnd">{secondsToMinute(duration)}</div>
            </div>


          </div>

        </div>
        <span></span>
        <div className="contentEnd">
          <div className="IconList cursor_pointer" onClick={setShowPopup}>
            <List1_Icon />
          </div>
          <div className="frameVolume cursor_pointer">
            <Volume_Icon type={volume > 6 ? 2 : volume > 0 ? 1 : 0} />
            <div className="framerangeVolume">
              <input type="range" defaultValue={5} className="rangeVolume" max={10} ref={volumeRef} onChange={() => {
                if (volumeRef.current?.value != undefined) {
                  setVolume(Number(volumeRef.current.value))
                }
              }} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

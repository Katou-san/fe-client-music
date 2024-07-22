'use client'
import React from "react";
import "./_yourSong.scss";
import { ArrowLineRight_Icon, Circle_Icon } from "@/Icons/icon_Figma";
import { storageType } from "@/model/storageModel";
import { useRouter } from "next/navigation";
type Props = {
  storage: storageType;
};

const ItemYourSong = ({ storage }: Props) => {
  const routes = useRouter()
  const handleManage = () => {
    routes.push('/manage')
  }

  return (
    <div className="yourSong">
      <div className="headerYourSong">Your Song</div>
      <div className="itemYourSong">
        <div className="topItemYourSong">

          <div className="frameStorage">
            <h3>Storage</h3>
            <div className="contentStorage">
              <div className="frameIcon">
                <Circle_Icon style={{ strokeDasharray: 160, strokeDashoffset: -(storage.Used / storage.Limit) * 160 }} />
              </div>
              <div className="storageDetail">
                <h3>Limit: {storage.Limit} mb</h3>
                <h3>Used: {Math.round(storage.Used)} mb</h3>
              </div>
            </div>
          </div>
          <div className="frameSubscription">
          </div>
        </div>
        <div className="bottomItemYourSong">
          <div className="frameinfo">Quantity: 12 songs</div>
          <div className="btnView" onClick={handleManage}>
            <h3>Manage</h3>
            <ArrowLineRight_Icon w={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemYourSong;

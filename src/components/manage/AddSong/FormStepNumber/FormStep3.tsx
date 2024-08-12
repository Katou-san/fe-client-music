'use client'
import React, { useEffect, useState } from "react";
import MiniItem from "../Item_Mini/Mini_Item";
import { Logo_DarkHole } from "@/Icons/icon_Logo";
import { ErrorIcon } from "@/Icons/icon_v1";
import { Handle_Form_Step } from "@/util/step/stepError";
import { create_songType } from "@/model/songModel";
type Props = {
  Get_Value_Form: (value: any) => void
  Value_Form: create_songType
}
export default function FormStep3({ Get_Value_Form, Value_Form }: Props) {
  const [isLoading, Set_isLoading] = useState(false);
  const [Check_Value_Form, Set_Check_Value_Form] = useState(false);

  useEffect(() => {
    Set_isLoading(true);
    Set_Check_Value_Form(false);
    if (!Handle_Form_Step("all", Value_Form).Has_Error) {
      Set_Check_Value_Form(true);
      Set_isLoading(false);
    } else {
      Set_Check_Value_Form(false);
      Set_isLoading(false);
    }
  }, []);

  return (
    <div className="FormStep" id="FormStep3">
      <div className="CenterContentAddSong">
        <div className="IconLoading">
          {isLoading && <Logo_DarkHole w={50} color={"#000"} />}
        </div>
        <h4>{isLoading && "Watting...."}</h4>
        {isLoading ? (
          ""
        ) : Check_Value_Form ? (
          <div className="notification_Mini_Item">
            <MiniItem audioFile={Value_Form.Song_Audio} imageFile={Value_Form.Song_Image} Value_Form={{ ...Value_Form, _id: '', Artist_Name: '', Like: 0, Song_Id: '', Create_Date: '' }} active={false} list={[{ ...Value_Form, _id: '', Artist_Name: '', Like: 0, Song_Id: '', Create_Date: '' }]} index={0} />
            <h4 className="Color_completed">Value was Checked</h4>
            <div className="checkboxes__item">
              <label className="checkbox style-c">
                <input
                  type="checkbox"
                  defaultChecked={Value_Form.is_Publish ?? false}
                  onChange={(e) => {
                    Get_Value_Form({ is_Publish: e.currentTarget.checked });
                  }}
                />
                <div className="checkbox__checkmark"></div>
                <div className="checkbox__body">
                  {Value_Form.is_Publish
                    ? "Your song is  published"
                    : "Your song is not published"}
                </div>
              </label>
            </div>
          </div>
        ) : (
          <div className="notification_Mini_Item">
            <ErrorIcon w={50} />
            <h4 className="Color_failed">Something is Wrong</h4>
          </div>
        )}
      </div>
    </div>
  );
}

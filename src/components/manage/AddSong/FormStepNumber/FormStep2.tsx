'use client'
import { Category } from "@/apis/Category";
import { cateType, list_Cate } from "@/model/cateModel";
import { create_songType } from "@/model/songModel";
import React, { useEffect, useState } from "react";
// import { Get_All_Category } from "../../../../Service/Category_Service"
type Props = {
  Get_Value_Form: (value: any) => void
  Value_Form: create_songType
};
export default function FormStep2({ Get_Value_Form, Value_Form }: Props) {
  const [listCategory, set_ListCategory] = useState<list_Cate>([]);
  useEffect(() => {
    Category.Get_All().then((res) => set_ListCategory(res.data))
  }, []);

  return (
    <div className="FormStep">
      <div className="LeftContentAddSong">
        <div className="LyricsAddSong">
          <h4>Lyrics</h4>
          <textarea
            value={Value_Form.Lyrics ? Value_Form.Lyrics : ""}
            onChange={(e) => {
              Get_Value_Form({ Lyrics: e.target.value });
            }}
          ></textarea>
        </div>
      </div>
      <div className="RightContentAddSong">
        <div className="SelecttionAddSong">
          <h4>Category</h4>
          <select
            onChange={(e) => Get_Value_Form({ Category_Id: e.target.value })}

          >
            <option className="test" value="null">
              choose cate
            </option>
            {listCategory.map((item, index) => (
              <option selected={item.Category_Id == Value_Form.Category_Id} key={index} value={item.Category_Id} >
                {item.Category_Name}
              </option>
            ))}
          </select>
        </div>
        <div className="SelecttionAddSong" id="typeColor">
          <h4>Type</h4>
          <input
            type="color"
            value={Value_Form.Color ? Value_Form.Color : "#ffffff"}
            onChange={(e) => {
              Get_Value_Form({ Color: e.target.value });
            }}
          />
        </div>
        <div className="MoreTag">
          <h4>Add Tag</h4>
          <textarea
            value={Value_Form.Tag ? Value_Form.Tag : ""}
            onChange={(e) => {
              Get_Value_Form({ Tag: e.target.value });
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

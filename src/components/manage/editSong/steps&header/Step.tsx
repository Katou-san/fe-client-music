import React from "react";
// import { FailIcon, CheckIcon } from "../../../Logo_Icon/Icon";
import "../editSong.scss";
import { Status_Step } from "@/configs/addSong_Step";
import { CheckIcon, FailIcon } from "@/Icons/icon_v1";
type Props = {
  value: Status_Step
  CurrentStep: number
}
export default function Step({ value, CurrentStep }: Props) {
  return (
    <div className="StepForm">
      <div
        className={`IconFormAddSong ${value.Status !== "" ? (value.Status ? "completed" : "failed") : ""
          }`}
        id={value.Number - 1 === CurrentStep ? "changing" : ""}
      >
        {value.Status === "" ? (
          <h5 className="color_White font_18">{value.Number}</h5>
        ) : value.Status ? (
          <CheckIcon />
        ) : (
          <FailIcon />
        )}
        <span
          className={` ${value.Status !== "" ? (value.Status ? "completed" : "failed") : ""
            }`}
        ></span>
      </div>
      <div className="TitleFormAddSong">{value.Title}</div>
    </div>
  );
}

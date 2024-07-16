import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Step from "./steps&header/Step";
import FormStep1 from "./FormStepNumber/FormStep1";
import FormStep2 from "./FormStepNumber/FormStep2";
import FormStep3 from "./FormStepNumber/FormStep3";
import "./AddSong.scss";
import { CloseIcon } from "@/Icons/icon_v1";
import { List_Status_Step, Status_Step } from "@/configs/addSong_Step";
import { create_songType, SongModel } from "@/model/songModel";
import { LoadingSVGWatting } from "@/Icons/Loading";
import { Check_Error_Step, Handle_Form_Step } from "@/util/step/stepError";
import { songValidate } from "@/util/validate/songReq";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import { Song } from "@/apis/Song";
import { Form_Data } from "@/util/FormData/Form_Data";

type Props = {
  handleShow: () => void;
  isShow: boolean;
  onClose: () => void;
  onReload: () => void;
};

export default function AddSong({ isShow, onClose, onReload }: Props) {
  const userProvider = useSelector((state: RootState) => state.auth)
  const [formValue, Set_ValueForm] = useState<create_songType>(SongModel.init_create);
  const [CurrentStep, Set_CurrentStep] = useState(0);
  const [is_Loading, set_Loading] = useState(false)

  const itemRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    let handle = (e: any) => {
      if (itemRef.current && !itemRef.current.contains(e.target)) {
        Set_ValueForm(SongModel.init);
        Set_CurrentStep(0);
        onClose()
      }
    };
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  }, []);

  const Get_ValueForm = (value: any) => {
    Set_ValueForm({ ...formValue, ...value });
  };

  const handleStep = (type: "next" | "prev") => {
    if (type == "next") {
      return CurrentStep >= List_Status_Step.length - 1
        ? Set_CurrentStep(0)
        : Set_CurrentStep(CurrentStep + 1);
    }
    if (type == "prev") {
      return CurrentStep <= 0
        ? Set_CurrentStep(0)
        : Set_CurrentStep(CurrentStep - 1);
    }
  };

  const SubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    set_Loading(true);
    if (!is_Loading) {
      const handleError = songValidate.create(formValue)
      if (!handleError.status) {
        if (userProvider.Access_Token != '' && userProvider.is_Login) {
          const frormData = Form_Data(formValue)
          Song.Create(frormData)
            .then((res) => {
              if (res.status == 200) {
                onReload()
                toast.success(res.message);
                Set_ValueForm(SongModel.init);
                Set_CurrentStep(0);
                onClose()
              } else {
                toast.error(res.message);
              }
              set_Loading(false)
            })

            .catch((err) => {
              toast.error(err.message)
              set_Loading(false)
            })
        } else {
          toast.warning('Please login to upload!')
          set_Loading(false)
        }
      } else {
        const getKey = Object.keys(handleError.Error)
        toast.error(handleError.Error[getKey[0]])
        set_Loading(false)
      }
    } else {
      toast.warning("Dont spawn bro! I hit you now!");
    }
  };

  return (
    <div
      className={`FrameAddSong ${isShow ? "Animation_Show_Form_BLUR" : "scale-0"
        }`} ref={itemRef}
    >
      <form
        className={`FormAddSong ${!isShow ? "scale-0" : ""}`}
        encType="multipart/form-data"
        method="post"
        onSubmit={SubmitForm}
      >
        <div
          className="CloseButton"
          onClick={() => {
            Set_ValueForm(SongModel.init);
            Set_CurrentStep(0);
            onClose()
          }}
        >
          <CloseIcon w={30} color={"red"} />
        </div>
        <div className="HeaderFormAddSong">
          {List_Status_Step.map((ItemStep, index) => (
            <Step key={index} value={ItemStep} CurrentStep={CurrentStep} />
          ))}
        </div>
        <div className="ContentAddSong">
          {CurrentStep === 0 && (
            <FormStep1 Get_Value_Form={Get_ValueForm} Value_Form={formValue} />
          )}
          {CurrentStep === 1 && (
            <FormStep2 Get_Value_Form={Get_ValueForm} Value_Form={formValue} />
          )}
          {CurrentStep === 2 && (
            <FormStep3 Get_Value_Form={Get_ValueForm} Value_Form={formValue} />
          )}
        </div>

        <div className="FooterFormAddSong">
          <div
            className={`btnAddSongForm ${CurrentStep === 0 ? "disabled" : ""}`}
            onClick={() => {
              handleStep('prev')
            }}
          >
            Prev Step
          </div>

          <div
            className={`btnAddSongForm ${CurrentStep === 2 ? "none" : ""}`}
            onClick={() => {
              Check_Error_Step(List_Status_Step, CurrentStep, formValue);
              handleStep('next')
            }}
          >
            Next Step
          </div>
          {CurrentStep === 2 && (
            <button
              className={`btnAddSongForm btn_Add_Submit 
                ${Handle_Form_Step("all", formValue).Has_Error
                  ? "disabled"
                  : "completed"
                }
                    `}
              type="submit"
              id={is_Loading ? "warning" : ""}
            >
              {!Handle_Form_Step("all", formValue).Has_Error &&
                (is_Loading ? (
                  <LoadingSVGWatting w={30} strokeWidth={50} />
                ) : (
                  ""
                ))}
              Create Song
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

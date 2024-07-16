import { create_songType } from "@/model/songModel";

export const Handle_Form_Step = (step: 0 | 1 | "all", value: create_songType) => {
    let Error: any = {};
    if (step === 0 || step === "all") {
        if (value.Song_Name === undefined || value.Song_Name.trim() === "") {
            Error["Song_Name"] = "Please enter a name song";
        }
        if (value.Song_Image === "" || value.Song_Image === undefined) {
            Error["File_Img"] = "Please select a picture file";
        }
        if (value.Song_Audio === "" || value.Song_Audio === undefined) {
            Error["File_Audio"] = "Please select a audio file";
        }
    }
    if (step === 1 || step === "all") {
        if (
            value.Category_Id === undefined ||
            value.Category_Id.trim() === "null"
        ) {
            Error["Category_Id"] = "Please chose a category";
        }
    }
    if (step === "all") {
        if (value === null) {
            Error["Infomation"] = "Please enter Infomation";
        }

        if (Object.keys(value).length < 4) {
            Error["Infomation"] = "Infomation Null or empty";
        }
    }

    return { Detail_Error: Error, Has_Error: Object.keys(Error).length !== 0 };
};

export const Check_Error_Step = (array: any, index: any, Value_Object: create_songType) => {
    array.map((value: any) => {
        if (value.Number - 1 === index) {
            if (Handle_Form_Step(index, Value_Object).Has_Error) {
                return (value.Status = false);
            } else {
                return (value.Status = true);
            }
        } else {
            return 0;
        }
    });
};

export const Delay_Loading = (time: number) =>
    new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
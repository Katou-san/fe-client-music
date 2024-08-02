import { create_songType, update_songType } from "@/model/songModel";

const HandleErrors = {
    isEmail: (value: string) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    },
    CheckLenght: (value: string) => {
        return value.trim().length > 4;
    },
    isNotEqual: (value1: string, value2: string) => {
        return value1 === value2;
    },
    checkFile: (value: any) => {
        return value != null && value != ''
    },
    emty: (value: any) => value != null && value != undefined && value != ''
};

const createValidate = (value: create_songType) => {
    const Error: any = {};
    let status = false;
    if (!HandleErrors.CheckLenght(value.Song_Name)) {
        Error["name"] = "Please enter playlist name";
        status = true;
    }

    if (!HandleErrors.CheckLenght(value.Artist)) {
        Error["artist"] = "Please enter playlist artist";
        status = true;
    }

    if (!HandleErrors.checkFile(value.Song_Audio)) {
        Error["audio"] = "Please enter playlist artist";
        status = true;
    }

    if (!HandleErrors.emty(value.Category_Id)) {
        Error["category"] = "Please enter playlist artist";
        status = true;
    }

    if (value.Song_Image != undefined) {
        const Img = value.Song_Image as File
        if (Img.size > 2097152) {
            Error["image"] = "Image size must be under 2MB";
            status = true;
        }
    }
    return { status, Error };
};

const updateValidate = (value: update_songType) => {
    const Error: any = {};
    let status = false;
    if (value?.Song_Name != undefined) {
        if (!HandleErrors.CheckLenght(value.Song_Name)) {
            Error["name"] = "Please enter playlist name";
            status = true;
        }
    }

    if (value?.Artist != undefined && value?.Artist != null) {
        if (!HandleErrors.CheckLenght(value.Artist)) {
            Error["artist"] = "Please enter playlist artist";
            status = true;
        }
    }

    if (value?.Song_Image != undefined && value?.Song_Image != null) {
        const Img = value.Song_Image as File
        if (Img.size > 2097152) {
            Error["image"] = "Image size must be under 2MB";
            status = true;
        }
    }
    return { status, Error };
};


export const songValidate = {
    create: createValidate,
    update: updateValidate
};

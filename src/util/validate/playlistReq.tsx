import { update_Playlist } from "@/model/playlistModel";

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
};

const createValidate = (Name: string, Artist: string) => {
  const Error: any = {};
  let status = false;
  if (!HandleErrors.CheckLenght(Name)) {
    Error["name"] = "Please enter playlist name";
    status = true;
  }

  if (!HandleErrors.CheckLenght(Artist)) {
    Error["artist"] = "Please enter playlist artist";
    status = true;
  }

  return { status, Error };
};

const updateValidate = (value: update_Playlist) => {
  const Error: any = {};
  let status = false;
  if (value.Playlist_Name != undefined) {
    if (!HandleErrors.CheckLenght(value.Playlist_Name)) {
      Error["name"] = "Please enter playlist name";
      status = true;
    }
  }

  if (value.Artist != undefined) {
    if (!HandleErrors.CheckLenght(value.Artist)) {
      Error["artist"] = "Please enter playlist artist";
      status = true;
    }
  }

  if (value.Image != undefined) {
    const Img = value.Image as File
    if (Img.size > 2097152) {
      Error["image"] = "Image size must be under 2MB";
      status = true;
    }
  }


  if (value.Thumbnail != undefined) {
    const Thumnail = value.Image as File
    if (Thumnail.size > 2097152) {
      Error["thumnail"] = "Thumnail size must be under 2MB";
      status = true;
    }
  }


  return { status, Error };
};

export const playlistValidate = {
  create: createValidate,
  update: updateValidate
};

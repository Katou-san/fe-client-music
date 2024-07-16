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

export const playlistValidate = {
  create: createValidate,
};

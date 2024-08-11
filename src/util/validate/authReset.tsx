import { changePass_userType, update_userType } from "@/model/userModel";

const HandleErrors = {
  isEmail: (value: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  },
  CheckLenght: (value: string) => {
    const a = value.trim().length;
    if (a < 25 && a > 3) {
      return true;
    }
    return false;
  },
  CheckLenghtPass: (value: string) => {
    const a = value.trim().length;
    if (a < 32 && a >= 8) {
      return true;
    }
    return false;
  },
  isEqual: (value1: string, value2: string) => {
    return value1 === value2;
  },
  checkPhone: (value: string) => {
    if (typeof Number(value) == "number") {
      if (value.length == 10) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
};

const resetEmailValidate = (email: string) => {
  const Error: any = {};
  let status = false;
  if (!HandleErrors.isEmail(email)) {
    Error["email"] = "Is not a valid email";
    status = true;
  }

  return { status, Error };
};

const resetPassValidate = (pass: string, confirmPass: string) => {
  const Error: any = {};
  let status = false;

  if (!HandleErrors.CheckLenghtPass(pass)) {
    Error["pass"] = "Password must be 8 to 32 characters ";
    status = true;
  }



  return { status, Error };
};


const changePassValidate = (value: changePass_userType) => {
  const Error: any = {};
  let status = false;

  if (!HandleErrors.CheckLenghtPass(value.oldpass)) {
    Error["pass"] = "Current pass must be 8 to 32 characters ";
    status = true;
  }


  if (!HandleErrors.CheckLenghtPass(value.pass)) {
    Error["pass"] = "New password must be 8 to 32 characters ";
    status = true;
  }

  if (HandleErrors.isEqual(value.pass, value.oldpass)) {
    Error["pass"] = "Password not change";
    status = true;
  }


  if (!HandleErrors.CheckLenghtPass(value.repass)) {
    Error["pass"] = "Confirm password must be 8 to 32 characters ";
    status = true;
  } else {
    if (!HandleErrors.isEqual(value.pass, value.repass)) {
      Error["pass"] = "new password not macth";
      status = true;
    }
  }

  return { status, Error };
};

export const resetValidate = {
  resetEmail: resetEmailValidate,
  resetPass: resetPassValidate,
  changePass: changePassValidate
};

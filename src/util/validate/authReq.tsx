import { update_userType } from "@/model/userModel";

const HandleErrors = {
    isEmail: (value: string) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    },
    CheckLenght: (value: string) => {
        const a = value.trim().length;
        if (a < 25 && a > 4) {
            return true;
        }
        return false;
    },
    CheckLenghtPass: (value: string) => {
        const a = value.trim().length;
        if (a < 32 && a > 8) {
            return true;
        }
        return false;
    },
    isNotEqual: (value1: string, value2: string) => {
        return value1 === value2;
    },
    checkPhone: (value: string) => {
        if (typeof Number(value) == 'number') {
            if (value.length == 10) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
};



const loginValidate = (email: string, pass: string) => {
    const Error: any = {

    };
    let status = false;
    if (!HandleErrors.isEmail(email)) {
        Error["email"] = "Is not a valid email";
        status = true;
    }

    if (!HandleErrors.CheckLenght(pass)) {
        Error["pass"] = "Please enter password";
        status = true;
    }

    return { status, Error };
}

const signupValidate = (email: string, name: string, pass: string, confirmPass: string) => {
    const Error: any = {};
    let status = false;
    if (!HandleErrors.isEmail(email)) {
        Error["email"] = "Is not a valid email";
        status = true;
    }
    if (!HandleErrors.CheckLenght(name)) {
        Error["name"] = "Name must be 4 to 25 characters ";
        status = true;
    }

    if (!HandleErrors.CheckLenghtPass(pass)) {
        Error["pass"] = "Password must be 8 to 32 characters ";
        status = true;
    }

    if (!HandleErrors.isNotEqual(pass, confirmPass)) {
        Error["ConfirmPass"] = "Confirm password not match";
        status = true;
    }

    return { status, Error };
}


const updateValidate = (value: update_userType) => {
    const Error: any = {};
    let status = false;

    if (value.User_Name != undefined) {
        if (!HandleErrors.CheckLenght(value.User_Name)) {
            Error["name"] = "Name must be 4 to 25 characters ";
            status = true;
        }
    }


    if (value.Phone != undefined) {
        if (!HandleErrors.checkPhone(value.Phone)) {
            Error["phone"] = "phone must be 10 characters or not in correct format";
            status = true;
        }
    }





    return { status, Error };
}

export const authValidate = {
    login: loginValidate,
    signup: signupValidate,
    update: updateValidate
}
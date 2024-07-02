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
        Error["name"] = "name need more than 4 characters";
        status = true;
    }

    if (!HandleErrors.CheckLenght(pass)) {
        Error["pass"] = "Please enter password";
        status = true;
    }

    if (!HandleErrors.isNotEqual(pass, confirmPass)) {
        Error["ConfirmPass"] = "Confirm password not match";
        status = true;
    }

    return { status, Error };
}

export const authValidate = {
    login: loginValidate,
    signup: signupValidate
}
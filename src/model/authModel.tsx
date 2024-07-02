const initAuth = {
    is_Login: false,
    Access_Token: "",
    User_Id: "",
    User_Name: "",
    Avatar: "",
};

const initLogin = {
    User_Email: "",
    User_Pass: "",
};

const initSignup = {
    User_Email: "",
    User_Name: "",
    User_Pass: "",
    User_ConfirmPass: "",
};

const authRes = {
    is_Login: false,
    Access_Token: "",
    User_Id: "",
    User_Name: "",
    Avatar: "",
};

export const authModel = {
    init: initAuth,
    initLogin: initLogin,
    initSignup: initSignup,
    authRes: authRes
};

export type authType = typeof initAuth;
export type authLoginType = typeof initLogin;
export type authSignupType = typeof initSignup;
export type authResType = typeof authRes;


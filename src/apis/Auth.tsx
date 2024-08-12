import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";
import { authLoginType, authSignupType } from "@/model/authModel";
// import { Login_request_type } from "@/model/auth";
// import { Login_Type, Register_Type } from "@/util/respone_Type/interface-auth";

export const auth = {
  Login: async (body: authLoginType): Promise<any> =>
    await http.post(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_LOGIN}`,
      body,
      header()
    ),
  Sigup: async (body: authSignupType) =>
    await http.post(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_SIGNUP}`,
      body,
      header()
    ),
  Auth: async () => {
    return await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_AUTH}`,
      header()
    );
  },
};

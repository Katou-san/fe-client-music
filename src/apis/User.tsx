import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";
import { changePass_userType } from "@/model/userModel";
// import { Update_User_Type } from "@/util/respone_Type/user-respone";

export const User = {
  Get_Id: async (id: string): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_USER}/id/${id}`,
      header()
    ),
  Change_Pass: async (body: changePass_userType): Promise<any> =>
    await http.post(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PASS}`,
      body,
      header()
    ),
  Update: async (id: string, body: any): Promise<any> =>
    await http.put(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_USER}`,
      body,
      header()
    ),
  Delete: async (id: string) =>
    await http.delete(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_USER}/${id}`,
      header()
    ),
  Forget: async (body: any) =>
    await http.post(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_RESET_EMAIL}`,
      body,
      header()
    ),
  Reset: async (body: any) =>
    await http.post(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_RESET}`,
      body,
      header()
    ),
};

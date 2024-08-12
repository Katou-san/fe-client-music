import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";
// import { Update_User_Type } from "@/util/respone_Type/user-respone";

export const Visit = {
  Get: async (): Promise<any> => {
    console.log(EnvConfig.NEXT_PUBLIC_CLIENT + EnvConfig.NEXT_PUBLIC_VISIT);
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_VISIT}`
    ),
      header();
  },
};

import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";
import header from "./@header";

export const Ads = {
  Get_Random: async (): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_ADS_RANDOM}`,
      header()
    ),
};

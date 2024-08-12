import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";
import header from "./@header";

export const Propose = {
  Get_Silder: async () =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PROPOSE}/slider`,
      header()
    ),
  Get_Song: async () =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PROPOSE}/song`,
      header()
    ),
  Get_Playlist: async () =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PROPOSE}/playlist`,
      header()
    ),
  Get_Album: async () =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PROPOSE}/album`,
      header()
    ),
  Get_Artist: async () =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PROPOSE}/artist`,
      header()
    ),
};

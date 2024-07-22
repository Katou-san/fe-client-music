import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";

export const Propose = {
  Get_Silder: async () =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PROPOSE}/slider`
    ),
  Get_Song: async () =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PROPOSE}/song`
    ),
  Get_Playlist: async () =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PROPOSE}/playlist`
    ),
  Get_Artist: async () =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PROPOSE}/artist`
    ),
};

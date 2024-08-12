import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";
import { create_commentType, update_commentType } from "@/model/commentModel";
import { create_followType } from "@/model/followModel";

export const Follow = {
  Get_Follow: async (id: string): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_FOLLOW}/${id}`,
      header()
    ),
  Get_Current: async (id: string): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_FOLLOWS}/${id}`,
      header()
    ),
  Create: async (body: create_followType): Promise<any> =>
    await http.post(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_FOLLOW}`,
      body,
      header()
    ),
  Update: async (id: string, body: update_commentType): Promise<any> =>
    await http.put(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_FOLLOW}/${id}`,
      body,
      header()
    ),
  Delete: async (id: string): Promise<any> =>
    await http.delete(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_FOLLOW}/${id}`,
      header()
    ),
};

import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";
import { create_replyType, replyType } from "@/model/replyModel";

export const Reply = {
  Get_Id: async (id: string): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_REPLY}/${id}`
    ),
  Create: async (body: create_replyType): Promise<any> =>
    await http.post(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_REPLY}`,
      body, header()
    ),
  Update: async (id: string, body: replyType): Promise<any> =>
    await http.put(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_REPLY}/${id}`,
      body, header()
    ),
  Delete: async (id: string): Promise<any> =>
    await http.delete(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_REPLY}/${id}`, header()
    ),
};

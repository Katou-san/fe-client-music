import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";
import { replyType } from "@/model/replyModel";

export const Reply = {
  Get_Id: async (id: string): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_REPLY}/${id}`
    ),
  Create: async (body: any): Promise<any> =>
    await http.post(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_REPLY}`,
      body
    ),
  Update: async (id: string, body: replyType): Promise<any> =>
    await http.put(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_REPLY}/${id}`,
      body
    ),
  Delete: async (id: string): Promise<any> =>
    await http.delete(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_REPLY}/${id}`
    ),
};

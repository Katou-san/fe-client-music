import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";
import { replyType } from "@/model/replyModel";

export const Repost = {
    Get_Id: async (id: string): Promise<any> =>
        await http.get(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_REPOST}/${id}`
        ),
    Get_Current: async (id: string, song: string): Promise<any> =>
        await http.get(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_REPOSTS}/${id}/${song}`
        ),
    Get_Song: async (id: string): Promise<any> =>
        await http.get(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_REPOSTS}/${id}`
        ),
    Create: async (id: string): Promise<any> =>
        await http.post(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_REPOST}`, { Song_Id: id }, header()
        ),
    Delete: async (id: string): Promise<any> =>
        await http.delete(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_REPOST}/${id}`, header()
        ),
};

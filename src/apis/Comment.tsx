import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";
import { create_commentType, update_commentType } from "@/model/commentModel";


export const Comment = {
    Get_SongId: async (id: string): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_COMMENT}/${id}`),
    Create: async (body: create_commentType): Promise<any> =>
        await http.post(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_COMMENT}`, body, header()),
    Update: async (id: string, body: update_commentType): Promise<any> =>
        await http.put(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_COMMENT}/${id}`, body, header()),
    Delete: async (id: string): Promise<any> =>
        await http.delete(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_COMMENT}/${id}`, header()),
};

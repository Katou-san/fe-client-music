import header from "@/api/@header";
import { http } from "@/api/@rootHttp";
import { EnvConfig } from "@/configs/Env_Config";
import { Update_User_Type } from "@/util/respone_Type/user-respone";

export const Playlist = {
    Get_Id: async (type: string, id: string): Promise<any> =>
        await http.get(
            `${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_PLAYLIST}/${type}/${id}`
        ),
    Get_Album: async () =>
        await http.get(
            `${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_PLAYLIST}/2`,
            header()
        ),
    Get_Playlist: async (type: string) =>
        await http.get(
            `${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_PLAYLIST_MANAGE}/${type}/1`,
            header()
        ),
    Create: async (body: any): Promise<any> =>
        await http.post(
            `${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_PLAYLIST}`,
            body,
            header()
        ),
    Update: async (id: string, body: any): Promise<any> =>
        await http.put(
            `${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_PLAYLIST}/${id}`,
            body,
            header()
        ),
    Delete: async (id: string) =>
        await http.delete(
            `${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_PLAYLIST}/${id}`,
            header()
        ),
};

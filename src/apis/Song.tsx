import header from "@/api/@header";
import { http } from "@/api/@rootHttp";
import { EnvConfig } from "@/configs/Env_Config";


export const Song = {
    Get_Id: async (id: string): Promise<any> =>
        await http.get(
            `${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_SONG}/${id}`
        ),
    Get_All: async () =>
        await http.get(
            `${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_SONG}`
        ),
    Get_Admin: async (): Promise<any> =>
        await http.get(
            `${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_SONG_MANAGE}/admin`,
            header()
        ),
    Get_User: async (): Promise<any> =>
        await http.get(
            `${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_SONG_MANAGE}/user`,
            header()
        ),
    Create: async (body: any): Promise<any> =>
        await http.post(
            `${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_SONG}`,
            body,
            header()
        ),
    Update: async (id: string, body: any): Promise<any> =>
        await http.put(
            `${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_SONG}/${id}`,
            body,
            header()
        ),
    Delete: async (id: string) =>
        await http.delete(
            `${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_SONG}/${id}`,
            header()
        ),
};

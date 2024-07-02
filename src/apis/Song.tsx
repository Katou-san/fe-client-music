import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";


export const Song = {
    Get_Id: async (id: string): Promise<any> =>
        await http.get(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_SONG}/${id}`
        ),
    Get_All: async () =>
        await http.get(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_SONG}`
        ),
    Get_User: async (): Promise<any> =>
        await http.get(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_SONG_MANAGE}/user`,
            header()
        ),
    Create: async (body: any): Promise<any> =>
        await http.post(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_SONG}`,
            body,
            header()
        ),
    Update: async (id: string, body: any): Promise<any> =>
        await http.put(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_SONG}/${id}`,
            body,
            header()
        ),
    Delete: async (id: string) =>
        await http.delete(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_SONG}/${id}`,
            header()
        ),
};

import header from "@/api/@header";
import { http } from "@/api/@rootHttp";
import { EnvConfig } from "@/configs/Env_Config";


export const Track = {
    Get_Track: async (id: string): Promise<any> =>
        await http.get(
            `${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_TRACK}/${id}`
        ),

    Create: async (body: any): Promise<any> =>
        await http.post(
            `${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_TRACK}`,
            body,
            header()
        ),

    Delete: async (id: string) =>
        await http.delete(
            `${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_TRACK}/${id}`,
            header
        ),
};

import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";


export const Track = {
    Get_Track: async (id: string): Promise<any> =>
        await http.get(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_TRACK}/${id}`
        ),

    Create: async (body: any): Promise<any> =>
        await http.post(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_TRACK}`,
            body,
            header()
        ),

    Delete: async (id: string) =>
        await http.delete(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_TRACK}/${id}`,
            header
        ),
};

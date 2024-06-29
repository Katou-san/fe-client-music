import header from "@/api/@header";
import { http } from "@/api/@rootHttp";
import { EnvConfig } from "@/configs/Env_Config";


export const Send = {
    Image_S: async (id: string): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_SEND}${EnvConfig.NEXT_PUBLIC_GET_IMAGE}/${id}`, header('file')),
    Audio: async (id: string): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_SEND}${EnvConfig.NEXT_PUBLIC_GET_AUDIO}/${id}`, header('file')),
    Avatar: async (id: string): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_SEND}${EnvConfig.NEXT_PUBLIC_GET_AVATAR}/${id}`, header('file')),
    Thumnail_P: async (id: string): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_SEND}${EnvConfig.NEXT_PUBLIC_GET_THUMNAIL_P}/${id}`, header('file')),
    Image_P: async (id: string): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_SEND}${EnvConfig.NEXT_PUBLIC_GET_IMAGE_P}/${id}`, header('file'))
};

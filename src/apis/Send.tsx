import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";


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
        await http.get(`${EnvConfig.NEXT_PUBLIC_SEND}${EnvConfig.NEXT_PUBLIC_GET_IMAGE_P}/${id}`, header('file')),
    Logo: async (id: string): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_SEND}${EnvConfig.NEXT_PUBLIC_GET_LOGO}/${id}`, header('file')),
    Image_A: async (id: string): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_SEND}${EnvConfig.NEXT_PUBLIC_GET_IMAGE_A}/${id}`, header('file')),
    Audio_A: async (id: string): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_SEND}${EnvConfig.NEXT_PUBLIC_GET_AUDIO_A}/${id}`, header('file'))
};

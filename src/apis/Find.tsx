import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";


export const Find = {
    Find_audio: async (body: any): Promise<any> =>
        await http.post(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_FIND}`, body, header()),

};

import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";


export const Category = {
    Get_Id: async (id: string): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_CATEGORY}/${id}`),
    Get_All: async () =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_CATEGORY}`),
};

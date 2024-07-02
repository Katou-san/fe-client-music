import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";

export const Role = {
    Get_Id: async (id: string): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_ROLE}/${id}`, header()),
};

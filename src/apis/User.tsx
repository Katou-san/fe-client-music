import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";
// import { Update_User_Type } from "@/util/respone_Type/user-respone";

export const User = {
    Get_Id: async (id: string): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_USER}/${id}`, header()),
    Update: async (id: string, body: any): Promise<any> =>
        await http.put(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_USER}/${id}`, body, header()),
    Delete: async (id: string) =>
        await http.delete(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_USER}/${id}`, header())

};
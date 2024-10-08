import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";

export const Bill = {
    Get_Current: async (id: string): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_BILLS}/${id}`, header()),
    Get_Bill: async (): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_BILL}`, header()),
    Check_Bill: async (): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_CHECK_BILLS}`, header()),
    Check_Bill_Id: async (id: string): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_CHECK_BILLS}/${id}`, header()),
    Delete: async (id: string) =>
        await http.delete(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_BILL}/${id}`, header()),
};

import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";

export const Subcription = {
  Get_Id: async (id: string): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_SUBSCRIPTION}/${id}`,
      header()
    ),
  Get_Sub: async () =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_SUBSCRIPTION}`,
      header()
    ),
  Create: async (body: any): Promise<any> =>
    await http.post(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_SUBSCRIPTION}`,
      body,
      header()
    ),
  Update: async (id: string, body: any): Promise<any> =>
    await http.put(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_SUBSCRIPTION}/${id}`,
      body,
      header()
    ),
  Delete: async (id: string) =>
    await http.delete(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_SUBSCRIPTION}/${id}`,
      header()
    ),
};

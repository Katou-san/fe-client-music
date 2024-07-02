import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";

export const Propose = {
    Get_Silder: async () => await http.get(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PROPOSE}/slider`)
};

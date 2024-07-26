import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";


export const Payment = {
    VNPay_payment: async (id: string): Promise<any> =>
        await http.post(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PAYMENT}${EnvConfig.NEXT_PUBLIC_ZALO}/payment/${id}`, {},
            header()
        ),

};

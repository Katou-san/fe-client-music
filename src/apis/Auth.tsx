import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";
// import { Login_request_type } from "@/model/auth";
// import { Login_Type, Register_Type } from "@/util/respone_Type/interface-auth";


// export const Auth = {
//     Login: async (body: Login_request_type): Promise<any> =>
//         await http.post(`${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_LOGIN}`, body),
//     Sigup: async (body: Register_Type) =>
//         await http.post(`${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_SIGNUP}`, body),
//     Auth: async () => {
//         return await http.get(`${EnvConfig.NEXT_PUBLIC_HOST}${EnvConfig.NEXT_PUBLIC_AUTH}`, header())
//     }
// };

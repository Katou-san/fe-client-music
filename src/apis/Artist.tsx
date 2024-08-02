
import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";
import { create_artistType, update_artistType } from "@/model/artistModel";

export const Artist = {
    Get_Current: async (): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_ARTIST}`, header()),
    Get_Type: async (type: boolean): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_ARTISTS}/${type}`, header()),
    Get_All: async (): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_ARTISTS}/all`, header()),
    Search: async (value: string): Promise<any> =>
        await http.get(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_ARTIST_SEARCH}/${value}`),
    Create: async (body: create_artistType): Promise<any> =>
        await http.post(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_ARTIST}`, body, header()),
    Update: async (id: string, body: update_artistType): Promise<any> =>
        await http.put(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_ARTIST}/${id}`, body, header()),

    Delete: async (id: string) =>
        await http.delete(`${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_ARTIST}/${id}`, header()),
};

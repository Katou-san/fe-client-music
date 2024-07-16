import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";
import { create_TrackType } from "@/model/trackModel";


export const Track = {
    Get_Track: async (id: string): Promise<any> =>
        await http.get(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_TRACK}/${id}`
        ),

    Create: async (body: create_TrackType): Promise<any> =>
        await http.post(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_TRACK}`,
            body,
            header()
        ),

    Delete: async (Playlist_Id: string, Song_Id: string) =>
        await http.delete(
            `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_TRACK}/${Playlist_Id}/${Song_Id}`,
            header()
        ),
};

import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";
import { create_Playlist } from "@/model/playlistModel";
// import { Update_User_Type } from "@/util/respone_Type/user-respone";

export const Playlist = {
  Get_Default: async (): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PLAYLIST_MANAGE}/0`,
      header()
    ),
  Get_User_Playlist: async (): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PLAYLIST_MANAGE}/1`,
      header()
    ),
  Get_User_Album: async (): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PLAYLIST_MANAGE}/2`,
      header()
    ),
  Get_Id: async (type: number, id: string): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PLAYLIST}/${type}/${id}`
    ),
  Get_Album: async () =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PLAYLIST}/2`,
      header()
    ),
  Get_Playlist: async () =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PLAYLIST}/1`,
      header()
    ),
  Create: async (body: create_Playlist): Promise<any> =>
    await http.post(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PLAYLIST}`,
      body,
      header()
    ),
  Create_Album: async (body: any): Promise<any> =>
    await http.post(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PLAYLIST}`,
      body,
      header()
    ),
  Update: async (id: string, body: any): Promise<any> =>
    await http.put(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PLAYLIST}/${id}`,
      body,
      header()
    ),
  Delete: async (id: string) =>
    await http.delete(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_PLAYLIST}/${id}`,
      header()
    ),
};

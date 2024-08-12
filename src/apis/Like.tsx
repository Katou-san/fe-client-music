import header from "@/apis/@header";
import { http } from "@/apis/@rootHttp";
import { EnvConfig } from "@/configs/envConfig";
import { create_likeType } from "@/model/likeModel";

export const Like = {
  Get_Current: async (Topic_Id: string, type: number): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_LIKE}/${Topic_Id}/${type}`,
      header()
    ),

  Get_Song: async (Topic_Id: string): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_LIKES}/${Topic_Id}/0`,
      header()
    ),
  Get_Playlist: async (Topic_Id: string): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_LIKES}/${Topic_Id}/1`,
      header()
    ),
  Get_Album: async (Topic_Id: string): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_LIKES}/${Topic_Id}/2`,
      header()
    ),
  Get_Comment: async (Topic_Id: string): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_LIKES}/${Topic_Id}/3`,
      header()
    ),
  Get_Reply: async (Topic_Id: string): Promise<any> =>
    await http.get(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_LIKES}/${Topic_Id}/4`,
      header()
    ),
  Togo_Create_Update: async (body: create_likeType): Promise<any> =>
    await http.put(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_LIKE}`,
      body,
      header()
    ),
  Delete: async (id: string) =>
    await http.delete(
      `${EnvConfig.NEXT_PUBLIC_CLIENT}${EnvConfig.NEXT_PUBLIC_CATEGORY}/${id}`,
      header()
    ),
};

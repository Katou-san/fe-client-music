const list_Ads_init = [
    {
        Ads_Id: "",
        User_Id: "",
        Partner_Id: "",
        Ads_Name: "",
        Ads_Image: "",
        Ads_Audio: "",
        Content: "",
        is_Publish: false,
        Visit: 0,
        Send_num: 0,
        Start_time: "",
        End_time: "",
    },
];

const create_Ads = {
    Partner_Id: "",
    Ads_Name: "",
    Ads_Image: "",
    Ads_Audio: "",
    Content: "",
    is_Publish: false,
    Visit: 0,
    Send_num: 0,
    Start_time: "",
    End_time: "",
}

const update_Ads = {
    Partner_Id: "",
    Ads_Name: "",
    Ads_Image: "",
    Ads_Audio: "",
    Content: "",
    is_Publish: false,
    Start_time: "",
    End_time: "",
}

export const adsModel = {
    init: list_Ads_init[0],
    init_list: list_Ads_init,
    init_create: create_Ads,

}

export type adsType = typeof list_Ads_init[0]
export type list_AdsType = typeof list_Ads_init
export type create_AdsType = {
    Partner_Id: string,
    Ads_Name: string,
    Ads_Image: any,
    Ads_Audio: any,
    Content: string,
    is_Publish: boolean,
    Visit: number,
    Send_num: number,
    Start_time: string,
    End_time: string,
}

export type update_AdsType = {
    Partner_Id?: string,
    Ads_Name?: string,
    Ads_Image?: any,
    Content?: string,
    is_Publish?: boolean,
    Visit?: number,
    Send_num?: number,
    Start_time?: string,
    End_time?: string,
}
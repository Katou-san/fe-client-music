const list_Partner_init = [
    {
        Partner_Id: "",
        Partner_Name: "",
        Phone: "",
        Logo: "",
        Contract_num: "",
        Status: false,
    },
];

const list_Partner_Temp = [
    {
        Partner_Id: "1",
        Partner_Name: "1",
        Phone: "1",
        Logo: "1",
        Contract_num: "1",
        Status: false,
    },
    {
        Partner_Id: "2",
        Partner_Name: "2",
        Phone: "2",
        Logo: "2",
        Contract_num: "2",
        Status: false,
    },
];

const Create_Partner = {
    Partner_Name: "",
    Phone: "",
    Logo: "",
    Contract_num: "",
    Status: false,
};

const init_Update = {
    Partner_Name: "",
    Phone: "",
    Logo: "",
    Status: false,
}

export const partnerModel = {
    init: list_Partner_init[0],
    init_list: list_Partner_init,
    init_create: Create_Partner,
    init_update: init_Update,
    temp_list: list_Partner_Temp
};



export type partnerType = (typeof list_Partner_init)[0];
export type list_PartnerType = typeof list_Partner_init;
export type create_PartnerType = {
    Partner_Name: string,
    Phone: string,
    Logo: any,
    Contract_num: string,
    Status: boolean,
}

export type update_PartnerType = {
    Partner_Name?: string,
    Phone?: string,
    Logo: any,
    Status?: boolean,
}


const initBill = [{
    Bill_Id: "",
    User_Id: "",
    Sub_Id: "",
    Create_Date: "",
    Expiration_Date: "",
}]

export const billModel = {
    init: initBill[0],
    init_list: initBill
}

export type billType = typeof initBill[0]
export type list_billType = typeof initBill
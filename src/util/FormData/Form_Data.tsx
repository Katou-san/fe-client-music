const Form_Data = (data: any, deny: Array<any> = []) => {
    const ArrayKey = Object.keys(data)
    const formdata = new FormData();
    ArrayKey.map((key, i) => {
        if (!deny.includes(key)) {
            if (data[key] != undefined && data[key] != null && data[key] != '') {
                formdata.append(key, data[key]);
            }

        }
    })
    return formdata
}

export { Form_Data }
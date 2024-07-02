import { EnvConfig } from "@/configs/envConfig"

const header = (type?: 'file') => {
    let header = {}

    if (type == 'file') {
        return {
            responseType: "blob",
        }
    }
    if (typeof window !== 'undefined') {
        header = { headers: { 'x-access-token': localStorage.getItem(EnvConfig.LocalToken) ?? "" } }
    } else {
        header = { headers: { 'x-access-token': "" } }
    }
    return header
}

export default header 
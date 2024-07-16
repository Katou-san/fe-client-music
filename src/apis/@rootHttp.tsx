import axios from "axios";
import { toast } from "react-toastify";

class HttpError extends Error {
    status: number
    payload: any
    constructor({ status, payload }: { status: number, payload: any }) {
        super("Http Error")
        this.status = status
        this.payload = payload
    }
}

const Validate = (url: string, body?: any) => {
    if (url.length <= 0 || url.includes("undefined")) {
        toast.error("Error: url is empty or undefined")
        console.error({ Error: `${url}` })
        return false
    }
    return true
}

export const http = {
    get: async (url: string, option: any = undefined) => {
        if (Validate(url)) {
            const request = await axios.get(url, option)
            if (request.status !== 200) {
                return new Error("Error: url is not valid")
            }
            if (request.data.status !== 200) {
            }
            return request.data
        } else {
            throw new Error("url is not valid")
        }

    },
    post: async (url: string, body: any, option?: any) => {
        if (Validate(url, body)) {
            const request = await axios.post(url, body, option || undefined)
            if (request.data.status !== 200) {
                toast.error(request.data.message)
            }
            if (request.status !== 200) {
                return new Error("Error: url is not valid")
            }
            return request.data
        } else {
            throw new Error("url is not valid")
        }

    },
    put: async (url: string, body: any, option?: any) => {
        if (Validate(url, body)) {
            const request = await axios.put(url, body, option || undefined)
            if (request.status !== 200) {
                toast.error(request.data.message)
                // return new HttpError(request.data)
            }
            return request.data
        }
    },
    delete: async (url: string, option?: any) => {
        if (Validate(url)) {
            const request = await axios.delete(url, option)
            if (request.status !== 200) {
                toast.error(request.data.message)
                // return new HttpError(request.data)
            }
            return request.data
        }
    },


}
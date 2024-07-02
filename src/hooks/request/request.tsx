'use client'
import { Request_Action } from "@/hooks/request/action/requestAction";
import { useReducer } from "react";

export default function useRequest() {
    const [req_State, req_Dispatch] = useReducer(Request_Action, {
        data: {},
        is_Loading: false,
        error: null,
    });

    return [req_State, req_Dispatch];
}

export { useRequest };

const Request_Action = (state: any, action: any) => {
    const { type }: { type: "REQUEST" | "SUCCESS" | "ERROR", payload: any } = action;
    switch (type) {
        case "REQUEST":
            return { ...state, is_Loading: true };
        case "SUCCESS":
            return { ...state, is_Loading: false };
        case "ERROR":
            return { ...state, is_Loading: false };
        default:
            break;
    }
};



export { Request_Action };
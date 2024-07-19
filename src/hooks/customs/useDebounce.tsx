import { useEffect, useState } from "react"


type Props = {
    value: any,
    delay?: number
}
export default function useDebounce(value: string, delay = 1000) {
    const [deValue, set_DeValue] = useState(value)

    useEffect(() => {
        const handle = setTimeout(() => {
            set_DeValue(value)
        }, delay)

        return () => {
            clearTimeout(handle)
        }
    }, [value, delay])

    return deValue
}
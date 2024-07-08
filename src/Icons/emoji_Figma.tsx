export function Happy_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d="M7.88124 15.7559C8.37391 16.1826 9.02309 16.4909 9.72265 16.6928C10.4301 16.897 11.2142 17 12 17C12.7858 17 13.5699 16.897 14.2774 16.6928C14.9769 16.4909 15.6261 16.1826 16.1188 15.7559" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx="9" cy="10" r="1.25" fill={color} stroke={color} strokeWidth="0.5" strokeLinecap="round" />
            <circle cx="15" cy="10" r="1.25" fill={color} stroke={color} strokeWidth="0.5" strokeLinecap="round" />
        </svg>

    )
}

export function Wow_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx="9" cy="9" r="1.25" fill={color} stroke={color} strokeWidth="0.5" strokeLinecap="round" />
            <circle cx="15" cy="9" r="1.25" fill={color} stroke={color} strokeWidth="0.5" strokeLinecap="round" />
            <path d="M15 15.5C15 16.8807 13.6569 18 12 18C10.3431 18 9 16.8807 9 15.5C9 14.1193 10.3431 13 12 13C13.6569 13 15 14.1193 15 15.5Z" fill={color} />
        </svg>

    )
}

export function SuperHappy_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d="M9.40192 13.5C9.66523 13.9561 10.0439 14.3348 10.5 14.5981C10.9561 14.8614 11.4734 15 12 15C12.5266 15 13.0439 14.8614 13.5 14.5981C13.9561 14.3348 14.3348 13.9561 14.5981 13.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <rect x="6.875" y="7.875" width="3.25" height="2.25" rx="1.125" fill={color} stroke={color} strokeWidth="0.25" strokeLinecap="round" />
            <rect x="13.875" y="7.875" width="3.25" height="2.25" rx="1.125" fill={color} stroke={color} strokeWidth="0.25" strokeLinecap="round" />
        </svg>

    )
}
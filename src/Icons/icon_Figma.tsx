export function Close_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071Z" fill={color} />
        </svg>
    )
}






export function Bell_Icon({ w = 23, color = "#fff", active }: { w?: number; color?: string, active: boolean }) {
    return (
        <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {!active && <>
                <path d="M6.44784 7.96942C6.76219 5.14032 9.15349 3 12 3V3C14.8465 3 17.2378 5.14032 17.5522 7.96942L17.804 10.2356C17.8072 10.2645 17.8088 10.279 17.8104 10.2933C17.9394 11.4169 18.3051 12.5005 18.8836 13.4725C18.8909 13.4849 18.8984 13.4973 18.9133 13.5222L19.4914 14.4856C20.0159 15.3599 20.2782 15.797 20.2216 16.1559C20.1839 16.3946 20.061 16.6117 19.8757 16.7668C19.5971 17 19.0873 17 18.0678 17H5.93223C4.91268 17 4.40291 17 4.12434 16.7668C3.93897 16.6117 3.81609 16.3946 3.77841 16.1559C3.72179 15.797 3.98407 15.3599 4.50862 14.4856L5.08665 13.5222C5.10161 13.4973 5.10909 13.4849 5.11644 13.4725C5.69488 12.5005 6.06064 11.4169 6.18959 10.2933C6.19123 10.279 6.19283 10.2645 6.19604 10.2356L6.44784 7.96942Z" stroke={color} strokeWidth="2" />
                <path d="M8 17C8 17.5253 8.10346 18.0454 8.30448 18.5307C8.5055 19.016 8.80014 19.457 9.17157 19.8284C9.54301 20.1999 9.98396 20.4945 10.4693 20.6955C10.9546 20.8965 11.4747 21 12 21C12.5253 21 13.0454 20.8965 13.5307 20.6955C14.016 20.4945 14.457 20.1999 14.8284 19.8284C15.1999 19.457 15.4945 19.016 15.6955 18.5307C15.8965 18.0454 16 17.5253 16 17" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </>}
            {active && <>
                <path d="M6.50248 6.97519C6.78492 4.15083 9.16156 2 12 2C14.8384 2 17.2151 4.15083 17.4975 6.97519L17.7841 9.84133C17.8016 10.0156 17.8103 10.1028 17.8207 10.1885C17.9649 11.3717 18.3717 12.5077 19.0113 13.5135C19.0576 13.5865 19.1062 13.6593 19.2034 13.8051L20.0645 15.0968C20.8508 16.2763 21.244 16.866 21.0715 17.3412C21.0388 17.4311 20.9935 17.5158 20.9368 17.5928C20.6371 18 19.9283 18 18.5108 18H5.48923C4.07168 18 3.36291 18 3.06318 17.5928C3.00651 17.5158 2.96117 17.4311 2.92854 17.3412C2.75601 16.866 3.14916 16.2763 3.93548 15.0968L4.79661 13.8051C4.89378 13.6593 4.94236 13.5865 4.98873 13.5135C5.62832 12.5077 6.03508 11.3717 6.17927 10.1885C6.18972 10.1028 6.19844 10.0156 6.21587 9.84133L6.50248 6.97519Z" fill={color} />
                <path d="M10.0681 20.6294C10.1821 20.7357 10.4332 20.8297 10.7825 20.8967C11.1318 20.9637 11.5597 21 12 21C12.4403 21 12.8682 20.9637 13.2175 20.8967C13.5668 20.8297 13.8179 20.7357 13.9319 20.6294" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </>}

        </svg>

    )
}

export function Favorite_Icon({ w = 23, color = "#fff", active }: { w?: number; color?: string, active: boolean }) {
    return (
        <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {!active && <path d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z" stroke={color} strokeWidth="2" />}
            {active && <path d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z" fill={color} stroke={color} strokeWidth="2" />}
        </svg>
    )
}


export function ArrowLineLeft_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6L9 12L15 18" stroke={color} strokeWidth="2" />
        </svg>
    )
}

export function ArrowLineRight_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke={color} strokeWidth="2" />
        </svg>
    )
}

export function ArrowLineUp_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 15L12 9L6 15" stroke={color} strokeWidth="2" />
        </svg>
    )
}

export function ArrowLineDown_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 9L12 15L6 9" stroke={color} strokeWidth="2" />
        </svg>
    )
}

export function List1_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12C2 10.1308 2 9.19615 2.40192 8.5C2.66523 8.04394 3.04394 7.66523 3.5 7.40192C4.19615 7 5.13077 7 7 7H17C18.8692 7 19.8038 7 20.5 7.40192C20.9561 7.66523 21.3348 8.04394 21.5981 8.5C22 9.19615 22 10.1308 22 12C22 13.8692 22 14.8038 21.5981 15.5C21.3348 15.9561 20.9561 16.3348 20.5 16.5981C19.8038 17 18.8692 17 17 17H7C5.13077 17 4.19615 17 3.5 16.5981C3.04394 16.3348 2.66523 15.9561 2.40192 15.5C2 14.8038 2 13.8692 2 12Z" stroke={color} strokeWidth="2" />
            <path d="M19 4C19 2.89543 18.1046 2 17 2H7C5.89543 2 5 2.89543 5 4" stroke={color} strokeWidth="2" />
            <path d="M19 20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20" stroke={color} strokeWidth="2" />
            <rect x="5.5" y="10.5" width="5" height="1" rx="0.5" stroke={color} />
        </svg>

    )
}

export function List2_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="20" height="9" rx="2" stroke={color} strokeWidth="2" />
            <path d="M16 18V18C16 19.1046 15.1046 20 14 20H10C8.89543 20 8 19.1046 8 18V18" stroke={color} strokeWidth="2" />
            <path d="M19 14V14C19 15.1046 18.1046 16 17 16H7C5.89543 16 5 15.1046 5 14V14" stroke={color} strokeWidth="2" />
        </svg>

    )
}

export function Comment_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12C4 7.58172 7.58172 4 12 4V4C16.4183 4 20 7.58172 20 12V17.0909C20 17.9375 20 18.3608 19.8739 18.6989C19.6712 19.2425 19.2425 19.6712 18.6989 19.8739C18.3608 20 17.9375 20 17.0909 20H12C7.58172 20 4 16.4183 4 12V12Z" stroke={color} strokeWidth="2" />
            <path d="M9 11L15 11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 15H15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}



export function Volume_Icon({ w = 23, color = "#fff", type = 1 }: { w?: number; color?: string, type: number }) {
    if (type === 0) {
        return (
            <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.15838 13.9306C2.44537 12.7423 2.44537 11.2577 3.15838 10.0694V10.0694C3.37596 9.70674 3.73641 9.45272 4.1511 9.36978L5.84413 9.03117C5.94499 9.011 6.03591 8.95691 6.10176 8.87788L8.17085 6.39498C9.3534 4.97592 9.94468 4.26638 10.4723 4.45742C11 4.64846 11 5.57207 11 7.41928L11 16.5807C11 18.4279 11 19.3515 10.4723 19.5426C9.94468 19.7336 9.3534 19.0241 8.17085 17.605L6.10176 15.1221C6.03591 15.0431 5.94499 14.989 5.84413 14.9688L4.1511 14.6302C3.73641 14.5473 3.37596 14.2933 3.15838 13.9306V13.9306Z" stroke={color} strokeWidth="2" />
                <path d="M15 15L21 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <path d="M21 15L15 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
        )
    }

    if (type === 1) {
        return (
            <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.15838 13.9306C2.44537 12.7423 2.44537 11.2577 3.15838 10.0694V10.0694C3.37596 9.70674 3.73641 9.45272 4.1511 9.36978L5.84413 9.03117C5.94499 9.011 6.03591 8.95691 6.10176 8.87788L8.17085 6.39498C9.3534 4.97592 9.94468 4.26638 10.4723 4.45742C11 4.64846 11 5.57207 11 7.41928L11 16.5807C11 18.4279 11 19.3515 10.4723 19.5426C9.94468 19.7336 9.3534 19.0241 8.17085 17.605L6.10176 15.1221C6.03591 15.0431 5.94499 14.989 5.84413 14.9688L4.1511 14.6302C3.73641 14.5473 3.37596 14.2933 3.15838 13.9306V13.9306Z" stroke={color} strokeWidth="2" />
                <path d="M15.5355 8.46447C16.4684 9.39732 16.9948 10.6611 17 11.9803C17.0052 13.2996 16.4888 14.5674 15.5633 15.5076" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
        )
    }

    if (type === 2) {
        return (
            <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.15838 13.9306C2.44537 12.7423 2.44537 11.2577 3.15838 10.0694V10.0694C3.37596 9.70674 3.73641 9.45272 4.1511 9.36978L5.84413 9.03117C5.94499 9.011 6.03591 8.95691 6.10176 8.87788L8.17085 6.39498C9.3534 4.97592 9.94468 4.26638 10.4723 4.45742C11 4.64846 11 5.57207 11 7.41928L11 16.5807C11 18.4279 11 19.3515 10.4723 19.5426C9.94468 19.7336 9.3534 19.0241 8.17085 17.605L6.10176 15.1221C6.03591 15.0431 5.94499 14.989 5.84413 14.9688L4.1511 14.6302C3.73641 14.5473 3.37596 14.2933 3.15838 13.9306V13.9306Z" stroke={color} strokeWidth="2" />
                <path d="M15.5355 8.46447C16.4684 9.39732 16.9948 10.6611 17 11.9803C17.0052 13.2996 16.4888 14.5674 15.5633 15.5076" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <path d="M19.6569 6.34314C21.1494 7.83572 21.9916 9.85769 21.9999 11.9685C22.0083 14.0793 21.182 16.1078 19.7012 17.6121" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
        )


    }

}




export function Menu_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 23 23" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.51669 4.79613C5.84343 6.09112 4 8.83028 4 12C4 12.1969 4.00711 12.3921 4.0211 12.5855L10.1629 10.9398L8.51669 4.79613ZM11.4148 4.02107L13.1901 10.6463L13.2017 10.6897C13.2517 10.8754 13.3222 11.1373 13.3532 11.3775C13.3922 11.6802 13.4014 12.159 13.1197 12.6469C12.838 13.1348 12.4188 13.3662 12.1371 13.4838C11.9136 13.5771 11.6515 13.647 11.4657 13.6965L11.4223 13.7081L4.79626 15.4836C6.0913 18.1567 8.83039 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C11.8032 4 11.6081 4.00711 11.4148 4.02107Z" fill="#222222" />
            <path d="M9.92945 4.27259C9.67849 3.33602 9.55302 2.86773 9.12083 2.67286C8.68865 2.47799 8.30723 2.66782 7.54439 3.04748C6.97028 3.33321 6.42361 3.67419 5.91239 4.06647C4.87054 4.8659 3.99636 5.86272 3.33975 7C2.68314 8.13728 2.25696 9.39275 2.08555 10.6947C2.00144 11.3336 1.97948 11.9775 2.01909 12.6176C2.07171 13.4681 2.09803 13.8933 2.48288 14.1701C2.86773 14.447 3.33602 14.3215 4.27259 14.0706L10.0681 12.5176C10.9788 12.2736 11.4342 12.1516 11.6413 11.7929C11.8484 11.4342 11.7264 10.9788 11.4824 10.0681L9.92945 4.27259Z" fill="#222222" />
        </svg>

    );
}


export function People_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 23 23" fill={color} xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="9" r="4" fill="#33363F" />
            <circle cx="17" cy="9" r="3" fill="#33363F" />
            <circle cx="7" cy="9" r="3" fill="#33363F" />
            <path fillRule="evenodd" clipRule="evenodd" d="M17.5683 18H19.8949C20.4865 18 20.9402 17.4901 20.7965 16.9162C20.4282 15.4458 19.4478 13 16.9999 13C16.1138 13 15.42 13.3205 14.8779 13.7991C16.3857 14.7773 17.1653 16.4902 17.5683 18Z" fill="#33363F" />
            <path fillRule="evenodd" clipRule="evenodd" d="M9.1221 13.7991C8.58001 13.3205 7.88621 13 7.00012 13C4.5522 13 3.57178 15.4458 3.20355 16.9162C3.05983 17.4901 3.51348 18 4.1051 18H6.43167C6.83476 16.4902 7.61435 14.7773 9.1221 13.7991Z" fill="#33363F" />
            <path d="M12 14C15.7087 14 16.6665 17.301 16.9139 19.0061C16.9932 19.5526 16.5523 20 16 20H8C7.44772 20 7.00684 19.5526 7.08614 19.0061C7.33351 17.301 8.29134 14 12 14Z" fill="#33363F" />
        </svg>

    );
}

export function Play_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 24 24" fill='none' xmlns="http://www.w3.org/2000/svg">
            <path d="M16.1378 10.5689L9.60498 7.30246C8.40816 6.70405 7 7.57434 7 8.91243V15.0875C7 16.4256 8.40816 17.2959 9.60498 16.6975L16.1378 13.4311C17.3171 12.8414 17.3171 11.1585 16.1378 10.5689Z" fill={color} />
        </svg>

    )
}

export function Pause_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="5" width="4" height="14" rx="1" fill={color} />
            <rect x="14" y="5" width="4" height="14" rx="1" fill={color} />
        </svg>

    )
}

export function Repeat_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1222_37952)">
                <path d="M11 9L13 8.5L13.5 10.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 8.5C12.5748 9.77038 11.773 10.8813 10.7013 11.6851C9.62955 12.4889 8.33861 12.9475 6.99999 13C5.7681 13.0002 4.566 12.6213 3.55697 11.9146C2.54794 11.2079 1.78088 10.2078 1.35999 9.05" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 5L1 5.5L0.5 3.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 5.5C1.44757 4.24353 2.25528 3.14671 3.32232 2.34642C4.38936 1.54614 5.66847 1.07785 7 1C8.23789 1.00348 9.4444 1.38976 10.4541 2.10588C11.4639 2.822 12.2274 3.8329 12.64 5" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_1222_37952">
                    <rect width={w} height={w} fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}

export function Shuffle_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7H4.77985C6.93172 7 8.00766 7 8.87921 7.45631C9.25172 7.65134 9.59114 7.90388 9.88499 8.20464C10.5725 8.90832 10.8817 9.93888 11.5 12V12C12.1183 14.0611 12.4275 15.0917 13.115 15.7954C13.4089 16.0961 13.7483 16.3487 14.1208 16.5437C14.9923 17 16.0683 17 18.2202 17H21M21 17L18 14M21 17L18 20" stroke={color} strokeWidth="2" />
            <path fillRule="evenodd" clipRule="evenodd" d="M21.7071 6.29285L18.7071 3.29285L17.2929 4.70706L18.5858 5.99995H18.2202L18.1753 5.99995H18.1753C17.1374 5.99994 16.2935 5.99993 15.6025 6.06086C14.8846 6.12415 14.2534 6.25807 13.657 6.57034C13.2113 6.80365 12.8036 7.10279 12.4474 7.45759C12.6883 7.85126 12.8778 8.25877 13.0406 8.66732C13.1539 8.95136 13.2635 9.26079 13.3726 9.59115C13.5242 9.27595 13.6695 9.06803 13.8303 8.90343C14.0507 8.67787 14.3052 8.48846 14.5846 8.34219C14.8597 8.19815 15.2022 8.10391 15.7782 8.05313C16.3711 8.00085 17.1267 7.99995 18.2202 7.99995H18.5858L17.2929 9.29285L18.7071 10.7071L21.7071 7.70706L22.4142 6.99995L21.7071 6.29285ZM10.5526 16.5423C10.3117 16.1486 10.1222 15.7411 9.95935 15.3326C9.8461 15.0485 9.73651 14.7391 9.62739 14.4088C9.4758 14.724 9.33053 14.9319 9.16971 15.0965C8.94933 15.322 8.69476 15.5114 8.41538 15.6577C8.14027 15.8018 7.79776 15.896 7.22182 15.9468C6.62893 15.9991 5.87329 16 4.77985 16H3V18H4.77985H4.8247H4.82472C5.86257 18 6.70648 18 7.39748 17.939C8.11537 17.8758 8.7466 17.7418 9.34305 17.4296C9.78866 17.1963 10.1964 16.8971 10.5526 16.5423Z" fill={color} />
        </svg>

    )
}



export function User_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 23 23" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M19.6515 19.4054C20.2043 19.2902 20.5336 18.7117 20.2589 18.2183C19.6533 17.1307 18.6993 16.1749 17.4788 15.4465C15.907 14.5085 13.9812 14 12 14C10.0188 14 8.09292 14.5085 6.52112 15.4465C5.30069 16.1749 4.34666 17.1307 3.74108 18.2183C3.46638 18.7117 3.79562 19.2902 4.34843 19.4054V19.4054C9.39524 20.4572 14.6047 20.4572 19.6515 19.4054V19.4054Z" fill="#222222" />
            <circle cx="12" cy="8" r="5" fill="#222222" />
        </svg>
    );
}

export function Sound_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 23 23" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M13 14H8.81763C7.20089 14 5.83017 15.1888 5.60153 16.7893V16.7893C5.29858 18.9099 7.09499 20.7381 9.22059 20.4724L9.77821 20.4027C11.6188 20.1727 13 18.608 13 16.7531V7.38851C13 5.77017 13 4.961 13.474 4.4015C13.9479 3.84201 14.7461 3.70899 16.3424 3.44293L18.6991 3.05015C18.8349 3.02751 18.9028 3.01619 18.9395 3.05588C18.9761 3.09557 18.9594 3.16236 18.926 3.29593L18.0307 6.87721C18.0158 6.93689 18.0083 6.96672 17.9873 6.98673C17.9664 7.00673 17.9362 7.01276 17.8759 7.02482L13 8" stroke="#222222" strokeWidth="2" />
        </svg>

    );
}

export function Playlist_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.1056 3.44721L5.78885 6.10557C5.00831 6.49585 4.61803 6.69098 4.61803 7C4.61803 7.30902 5.00831 7.50415 5.78885 7.89443L11.1056 10.5528C11.5445 10.7722 11.7639 10.882 12 10.882C12.2361 10.882 12.4555 10.7722 12.8944 10.5528L18.2111 7.89443C18.9917 7.50415 19.382 7.30902 19.382 7C19.382 6.69098 18.9917 6.49585 18.2111 6.10557L12.8944 3.44721C12.4555 3.22776 12.2361 3.11803 12 3.11803C11.7639 3.11803 11.5445 3.22776 11.1056 3.44721Z" fill={color} />
            <path fillRule="evenodd" clipRule="evenodd" d="M7.02217 10.4893C7.62603 10.8135 8.33716 11.169 9.15554 11.5782L10.2113 12.1061C11.0891 12.545 11.528 12.7644 12.0001 12.7644C12.4723 12.7644 12.9112 12.545 13.789 12.1061L14.8447 11.5782C15.6631 11.169 16.3742 10.8135 16.9781 10.4893L18.2113 11.1059C18.9918 11.4961 19.3821 11.6913 19.3821 12.0003C19.3821 12.3093 18.9918 12.5044 18.2113 12.8947L12.8946 15.5531C12.4557 15.7725 12.2362 15.8822 12.0001 15.8822C11.7641 15.8822 11.5446 15.7725 11.1057 15.5531L11.1057 15.5531L5.78898 12.8947C5.00844 12.5044 4.61816 12.3093 4.61816 12.0003C4.61816 11.6913 5.00844 11.4961 5.78898 11.1059L7.02217 10.4893Z" fill={color} />
            <path fillRule="evenodd" clipRule="evenodd" d="M7.02169 15.4893C7.62567 15.8135 8.33696 16.1692 9.15557 16.5785L10.2113 17.1063C11.0891 17.5452 11.528 17.7647 12.0001 17.7647C12.4723 17.7647 12.9112 17.5452 13.789 17.1063L14.8447 16.5785C15.6633 16.1692 16.3746 15.8135 16.9786 15.4893L18.2113 16.1056C18.9918 16.4959 19.3821 16.691 19.3821 17C19.3821 17.3091 18.9918 17.5042 18.2113 17.8945L12.8946 20.5528C12.4557 20.7723 12.2362 20.882 12.0001 20.882C11.7641 20.882 11.5446 20.7723 11.1057 20.5528L11.1057 20.5528L5.78898 17.8945C5.00844 17.5042 4.61816 17.3091 4.61816 17C4.61816 16.691 5.00844 16.4959 5.78898 16.1056L7.02169 15.4893Z" fill={color} />
        </svg>

    );
}

export function Admin_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 23 23" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M18.7022 5.78441L12.7878 3.24968C12.2847 3.03406 11.7153 3.03406 11.2122 3.24968L5.29778 5.78441C4.47855 6.13551 3.99051 6.98635 4.10106 7.87077L4.71405 12.7747C4.9342 14.5359 5.81517 16.1477 7.1787 17.284L10.7196 20.2347C11.4613 20.8528 12.5387 20.8528 13.2804 20.2347L16.8213 17.284C18.1848 16.1477 19.0658 14.5359 19.286 12.7747L19.8989 7.87077C20.0095 6.98635 19.5215 6.13551 18.7022 5.78441Z" stroke="#33363F" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 12L11.5687 14.5687C11.7918 14.7918 12.1633 14.7551 12.3383 14.4925L16 9" stroke="#33363F" strokeWidth="2" strokeLinecap="round" />
        </svg>

    );
}

export function Role_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 23 23" fill={color} xmlns="http://www.w3.org/2000/svg">

            <path d="M6 8L11 16" stroke="#33363F" strokeLinecap="round" />
            <path d="M17.7224 20.5C19.2145 17.9157 20 14.9841 20 12C20 9.01588 19.2145 6.08433 17.7224 3.5" stroke="#33363F" strokeLinecap="round" />
            <path d="M14.3923 18C15.4455 16.1758 16 14.1064 16 12C16 9.89356 15.4455 7.82423 14.3923 6" stroke="#33363F" strokeLinecap="round" />
            <path d="M10.9282 16C11.6303 14.7838 12 13.4043 12 12C12 10.5957 11.6303 9.21615 10.9282 8" stroke="#33363F" strokeLinecap="round" />
            <path d="M6.0718 16C5.36965 14.7838 5 13.4043 5 12C5 10.5957 5.36965 9.21615 6.0718 8" stroke="#33363F" strokeLinecap="round" />
        </svg>

    );
}

export function Category_Icon({ w = 23, color = "#fff" }: { w?: number; color?: string }) {
    return (
        <svg width={w} height={w} viewBox="0 0 23 23" fill={color} xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="13" width="4" height="4" rx="2" transform="rotate(90 6 13)" stroke="#33363F" strokeWidth="2" />
            <rect x="17" y="12" width="4" height="4" rx="2" transform="rotate(-90 17 12)" stroke="#33363F" strokeWidth="2" />
            <path d="M18 11L16.5 12.5C15.4829 13.5171 14.9744 14.0256 14.3628 14.1384C14.1229 14.1826 13.8771 14.1826 13.6372 14.1384C13.0256 14.0256 12.5171 13.5171 11.5 12.5V12.5C10.4829 11.4829 9.97442 10.9744 9.36277 10.8616C9.12295 10.8174 8.87705 10.8174 8.63723 10.8616C8.02558 10.9744 7.51705 11.4829 6.5 12.5L5 14" stroke="#33363F" strokeWidth="2" />
        </svg>

    );
}




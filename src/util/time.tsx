const secondsToMinute = (secs: number) => {
    let minute = Math.floor(secs / 60)
    let seconds = Math.floor(secs % 60)
    const minuteValue = minute < 10 ? `0${minute}` : `${minute}`
    const secondsValue = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${minuteValue}:${secondsValue}`
}

export { secondsToMinute }
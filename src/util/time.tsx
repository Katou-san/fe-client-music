const secondsToMinute = (secs: number) => {
    let minute = Math.floor(secs / 60)
    let seconds = Math.floor(secs % 60)
    const minuteValue = minute < 10 ? `0${minute}` : `${minute}`
    const secondsValue = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${minuteValue}:${secondsValue}`
}

const plus_Date = (days: number) => {
    var date = new Date();
    date.setDate(date.getDate() + days);
    return date;
};

const minus_Date = (days: number) => {
    var date = new Date();
    date.setDate(date.getDate() + days);
    return date;
};

const get_Day_in2_Date = (date: Date, date2: Date) => {
    let ms1 = date.getTime();
    let ms2 = date2.getTime();

    return Math.ceil((ms1 - ms2) / (24 * 60 * 60 * 1000));
};

export { secondsToMinute, minus_Date, plus_Date, get_Day_in2_Date }
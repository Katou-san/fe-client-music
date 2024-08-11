import { findType } from "@/model/findSongModal";


const validateFind = (value: findType) => {
    const Error: any = {};
    let status = false;

    if (value.Song_Find != undefined && value.Song_Find != '') {
        const audio = value.Song_Find as File
        if (audio.type.split('/')[0] != 'audio') {
            Error["audio"] = "File is not type audio";
            status = true;
        } else {
            if (audio.size > 2097152) {
                Error["audio"] = "Audio size must be under 2MB";
                status = true;
            }
        }
    } else {
        Error["audio"] = "File is invalid";
        status = true;
    }
    return { status, Error };
}

export { validateFind }
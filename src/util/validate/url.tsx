export const URLValidate = {
    isUrl: (str: string) => {
        try {
            new URL(str)
            return false
        } catch (error) {
            return true
        }
    },






    // "^((https|http|ftp|rtsp|mms)?://)"
    //             + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
    //             + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
    //             + "|" // 允许IP和DOMAIN（域名）
    //             + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
    //             + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
    //             + "[a-z]{2,6})" // first level domain- .com or .museum
    //             + "(:[0-9]{1,4})?" // 端口- :80
    //             + "((/?)|" // a slash isn't required if there is no file name
    //             + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"



    // var pattern = new RegExp('^(https?:\\/\\/)?'

    //     // + // protocol
    //     // '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    //     // '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    //     // '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    //     // '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    //     // '(\\#[-a-z\\d_]*)?$', 'i'

    // ); // fragment locator

    isBlob: (str: string) => {
        return str.split(':')[0] == 'blob'
    }
}
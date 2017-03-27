/**
 * Created by Leon.Hwa on 17/3/21.
 */
const address = {
    banner: (auth = Common.AUTH_KEY.auth_key) => {
        return `http://www.g-cores.com/api/originals/home_slideshow?auth_exclusive=${auth}`
    },
    homePage:(page = 1,auth = Common.AUTH_KEY.auth_key) => {
        return `http://www.g-cores.com/api/originals/home?page=${page}&auth_exclusive=${auth}`
    },

    articlePage:(page = 1,auth = Common.AUTH_KEY.auth_key) =>{
        return `http://www.g-cores.com/api/categories/1/originals?page=${page}&auth_exclusive=${auth}`
    },
    news:(page,auth = Common.AUTH_KEY.auth_key ) =>{
        return `http://www.g-cores.com/api/categories/2/originals?page=${page}&auth_exclusive=${auth}`
    },
    articleDetail:(id,auth = Common.AUTH_KEY.auth_key) => {
        return `http://www.g-cores.com/api/originals/${id}/html_content?auth_exclusive=${auth}&auth_token= &quickdownload=1`
    },
    newsDetail: (id,auth = Common.AUTH_KEY.auth_key) => {
        return `http://www.g-cores.com/api/originals/${id}/html_content?auth_exclusive=${auth}&auth_token=(null)&quickdownload=1`
    },
    bannarDetail: (id,auth = Common.AUTH_KEY.auth_key) => {
        return `http://www.g-cores.com/api/originals/${id}/html_content?auth_exclusive=${auth}&auth_token=(null)&quickdownload=1`
    }
}
export default address
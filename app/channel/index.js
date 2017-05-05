import address from './address'
export default class Channel {

    getBanner(){
        const gen_url = address.banner()
        console.log('bannar url is ' + gen_url)
        return window.fetch(gen_url)
                .then((res) => res.json())
                .then((data) =>{
                  // console.log(data['results'])
                  return data['results']
                })
            .catch((error) => {
              console.log(error)
            })

    }
    getHomePage(page){
        const gen_url = address.homePage(page)
        console.log('home url is ' + gen_url)
        return window.fetch(gen_url)
            .then((res) => res.json())
            .then((data) =>{
                return data['results']
            })
            .catch((error) => {
                console.log(error)
            })

    }

    getNews(page){
        const gen_url = address.news(page)
        console.log('page is ' + gen_url)
        return window.fetch(gen_url)
            .then((res) => res.json())
            .then((data) =>{

                // console.log(data['results'])
                return data['results']
            })
            .catch((error) => {
                console.log(error)
            })

    }
    getArticlePage(page){
        const gen_url = address.articlePage(page)
        console.log('page is ' + gen_url)
        return window.fetch(gen_url)
            .then((res) => res.json())
            .then((data) =>{
                return data['results']
            })
            .catch((error) => {
                console.log(error)
            })

    }
    getComment(type,page,id){
        const gen_url = address.getComment(type,page,id)
        console.log('comment is ' + gen_url)
        return window.fetch(gen_url)
            .then((res) => res.json())
            .then((data) =>{
                // console.log('~~~~~~~ comment ')
                // console.log(data)
                return data['results']
            })
            .catch((error) => {
                console.log(error)
            })

    }
    getPageInfo(id){
        const gen_url = address.getPageInfo(id)
        console.log('getPageInfo is ' + gen_url)
        return window.fetch(gen_url)
            .then((res) => res.json())
            .then((data) =>{
                // console.log('~~~~~~~ getPageInfo ')
                // console.log(data)
                return data['results']
            })
            .catch((error) => {
                console.log(error)
            })

    }
    getTimeLine(id){
        const gen_url = address.getTimeLine(id)
        console.log('getTimeLine is ' + gen_url)
        return window.fetch(gen_url)
            .then((res) => res.json())
            .then((data) =>{
                // console.log('~~~~~~~ getTimeLine ')
                // console.log(data)
                return data['results']
            })
            .catch((error) => {
                console.log(error)
            })

    }
    getTimeLineCategories(page){
        const gen_url = address.getTimeLineCategories(page)
        console.log('getTimeLineCategories is ' + gen_url)
        return window.fetch(gen_url)
            .then((res) => res.json())
            .then((data) =>{
                return data['results']
            })
            .catch((error) => {
                console.log(error)
            })

    }
    getRadio(page){
        const gen_url = address.getRadio(page)
        console.log('getRadio is ' + gen_url)
        return window.fetch(gen_url)
            .then((res) => res.json())
            .then((data) =>{
                return data['results']
            })
            .catch((error) => {
                console.log(error)
            })

    }
    getVideo(page){
        const gen_url = address.getVideo(page)
        console.log('getVideo is ' + gen_url)
        return window.fetch(gen_url)
            .then((res) => res.json())
            .then((data) =>{
                return data['results']
            })
            .catch((error) => {
                console.log(error)
            })

    }

    getCategories(){
        const gen_url = address.getCategories()
        console.log('getCategories is ' + gen_url)
        return window.fetch(gen_url)
            .then((res) => res.json())
            .then((data) =>{
                // console.log(data)
                return data['results']
            })
            .catch((error) => {
                console.log(error)
            })

    }
    getCategorieDetail(id,page){
        const gen_url = address.getCategorieDetail(id,page)
        console.log('getCategorieDetail is ' + gen_url)
        return window.fetch(gen_url)
            .then((res) => res.json())
            .then((data) =>{
                // console.log(data)
                return data['results']
            })
            .catch((error) => {
                console.log(error)
            })

    }

    getCategorieSubscriptInfo(id){
        const gen_url = address.getCategorieSubscriptInfo(id)
        console.log('getCategorieSubscriptInfo is ' + gen_url)
        return window.fetch(gen_url)
            .then((res) => res.json())
            .then((data) =>{
                console.log(data)
                return data['results']
            })
            .catch((error) => {
                console.log(error)
            })

    }
    getSubscript(page){
        const gen_url = address.getSubscript(page)
        console.log('getCategorieSubscriptInfo is ' + gen_url)
        return window.fetch(gen_url)
            .then((res) => res.json())
            .then((data) =>{
                // console.log(data)
                return data['results']
            })
            .catch((error) => {
                console.log(error)
            })

    }
    getMyMark(page){
        const gen_url = address.getMyMark(page)
        console.log('getMyMark is ' + gen_url)
        return window.fetch(gen_url)
            .then((res) => res.json())
            .then((data) =>{
                // console.log(data)
                return data['results']
            })
            .catch((error) => {
                console.log(error)
            })

    }
}

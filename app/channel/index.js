import address from './address'
export default class Channel {

    getBanner(){
        const gen_url = address.banner()
        console.log('bannar url is ' + gen_url)
        return window.fetch(gen_url)
                .then((res) => res.json())
                .then((data) =>{
                  console.log(data['results'])
                  return data['results']
                })
            .catch((error) => {
              console.log(error)
            })

    }
    getHomePage(){
        const gen_url = address.homePage()
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

                console.log(data['results'])
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
                console.log('~~~~~~~ comment ')
                console.log(data)
                return data['results']
            })
            .catch((error) => {
                console.log(error)
            })

    }


}

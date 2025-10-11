export class Model {
    defaultValue
    constructor(){
        this.defaultValue = "puppy"
        this.getData("1.4", undefined, "genres", "genres.name", "movie")
    }
    // async getData(event: Event) {
    //     const formData = new FormData(event.target as HTMLFormElement)
    //     const query = formData.get("search") as string
    //     const dataFromServer = await this.query(query)
    //     return dataFromServer
    // }
    // придумать способ различать энд поинты 
    async getData(versionAPIParams=1, limitItemsParams=10, selectFieldsParams="", endPointParams="", chapterParams="", queryParams="") {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'X-API-KEY': 'S31WEXH-H65M0YV-K1VT142-0Y4QAMT'}
        };
        const baseURL = "https://api.kinopoisk.dev"
        const numberOfPage = "1"
        const versionAPI = versionAPIParams
        const limitItems = limitItemsParams
        const endPoint = endPointParams
        const chapter = chapterParams
        const query = queryParams
        const selectFields = selectFieldsParams
        const response = await fetch(`${baseURL}/v${versionAPI}/${chapter}?page=${numberOfPage}&limit=${limitItems}&${selectFields}=&${endPoint}=${query}`, options) 
        const data = await response.json()
        console.log(`${baseURL}/v${versionAPI}/${chapter}?page=${numberOfPage}&limit=${limitItems}&${selectFields}=&${endPoint}=${query}`);
        console.log(data);
        return data
    }
} 
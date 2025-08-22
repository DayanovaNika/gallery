export class Model {
    constructor(){
        
    }
    async getData(event: Event) {
        const formData = new FormData(event.target as HTMLFormElement)
        const query = formData.get("search") as string
        const dataFromServer = await this.query(query)
        return dataFromServer
    }
    async query(query: string) {
        const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=4jmoKzKcB0CftDxEyOY4dvzdW2-iliOIf3Oza8ERicc&query=${query}&per_page=10&page=1`)
        const data = await response.json()
        return data
    }
} 
import { Model } from "../model/model";
import { View } from "../view/view";

export class Controller {
    model = new Model()
    view = new View()
    constructor(){
        this.setFormListener()
    }
    setFormListener() {
    console.log(this.view.headerView.form);
    this.view.headerView.form.addEventListener("submit", (event) => this.formSubmit(event))
    }
// вынести в модель
    async formSubmit(event: SubmitEvent) {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const query = formData.get("search");
        const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=4jmoKzKcB0CftDxEyOY4dvzdW2-iliOIf3Oza8ERicc&query=${query}&per_page=10&page=1`)
        const data = await response.json()
        
        this.view.mainView.createImageList(data)
    }
}
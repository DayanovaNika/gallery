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

    async formSubmit(event: SubmitEvent) {
        event.preventDefault()
        const data = await this.model.getData(event)
        this.view.mainView.createImageList(data)
    }
}

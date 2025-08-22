import { Model } from "../model/model";
import { View } from "../view/view";

export class Controller {
    model = new Model()
    view = new View()
    constructor(){
        this.setFormListener()
        this.setButtonsListener()
        this.render(this.model.defaultValue)
    }
    setFormListener() {
        this.view.headerView.form.addEventListener("submit", (event) => this.formSubmit(event))
    }
    setButtonsListener() {
        this.view.headerView.buttonsContainer.addEventListener("click", async (event) => {
            const btnValue = this.view.headerView.getBtnValue(event) as string
            this.render(btnValue)
        })
    }
    async formSubmit(event: SubmitEvent) {
        event.preventDefault()
        const data = await this.model.getData(event)
        this.view.mainView.createImageList(data)
    }
    async render(value: string) {
        const data = await this.model.query(value)
        this.view.mainView.createImageList(data)
    }
}
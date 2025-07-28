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
    // вызвать правильно formSubmit
    this.view.headerView.form.addEventListener("submit", (event) => this.formSubmit(event))
    }

    formSubmit(event: Event) {
        event.preventDefault()
        if (event.target) {
            const formData = new FormData(event.target)
        }
        
        // console.log(formData.get("search"));
    }
}

// 1. сделать форму частью обьекта header +
// 2. повесить на форму прослушку
// 3. получить данные с формы
// 4. создать запрос с полученными данными
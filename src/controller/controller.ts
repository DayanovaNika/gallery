import { Model } from "../model/model";
import { View } from "../view/view";
const mokkImages = {
    results: [
        {
            urls: {
                regular: "/chihua.jpg"
            }
        },
        {
            urls: {
                regular: "/chihua.jpg"
            }
        },
        {
            urls: {
                regular: "/chihua.jpg"
            }
        },
        {
            urls: {
                regular: "/chihua.jpg"
            }
        },
        {
            urls: {
                regular: "/chihua.jpg"
            }
        },
        {
            urls: {
                regular: "/chihua.jpg"
            }
        },
        {
            urls: {
                regular: "/chihua.jpg"
            }
        },
        {
            urls: {
                regular: "/chihua.jpg"
            }
        },
        {
            urls: {
                regular: "/chihua.jpg"
            }
        },
        {
            urls: {
                regular: "/chihua.jpg"
            }
        },
    ],
}
export class Controller {
    model = new Model()
    view = new View()
    constructor(){
        this.setFormListener()
        this.setButtonsListener()
        this.setBurgerListener()
        // this.render(this.model.defaultValue)
        this.render(mokkImages)
    }
    setFormListener() {
        this.view.headerView.form.addEventListener("submit", (event) => this.formSubmit(event))
    }
    setButtonsListener() {
        this.view.headerView.buttonsContainer.addEventListener("click", async (event) => {
            const btnValue = this.view.headerView.getBtnValue(event) as string
            this.render(btnValue)
            this.view.headerView.toggleClasses()
        })
    }
    async formSubmit(event: SubmitEvent) {
        event.preventDefault()
        this.view.mainView.showLoader()
        const data = await this.model.getData(event)
        this.view.mainView.createImageList(data)
        this.view.mainView.removeLoader()
    }
    async render(value: any) {
        // this.view.mainView.showLoader()
        // const data = await this.model.query(value)
        this.view.mainView.createImageList(value)
        // this.view.mainView.removeLoader()
    }
    setBurgerListener() {
        this.view.headerView.burger.addEventListener("click", () => {
            this.view.headerView.toggleClasses()
        })
    }
}
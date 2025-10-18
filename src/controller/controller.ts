import { Model } from "../model/model";
import { View } from "../view/view";

export class Controller {
    model = new Model();
    view 
    constructor() {
        this.init();
    }
    async init() {
        this.view = new View(await this.model.genresList);
        this.setFormListener();
        this.setButtonsListener();
        this.setBurgerListener();
    } 
    setFormListener() {
        this.view.headerView.form.addEventListener("submit", (event) =>
        this.formSubmit(event),
        );
    }
    setButtonsListener() {
        this.view.headerView.buttonsContainer.addEventListener(
        "click",
        async (event) => {
            const btnValue = this.view.headerView.getBtnValue(event) as string;
            this.render(btnValue);
            this.view.headerView.toggleClasses();
        },
        );
    }
    async formSubmit(event: SubmitEvent) {
        event.preventDefault();
        this.view.mainView.showLoader();
        const data = await this.model.getData(event);
        this.view.mainView.createImageList(data);
        this.view.mainView.removeLoader();
    }
    setBurgerListener() {
        this.view.headerView.burger.addEventListener("click", () => {
        this.view.headerView.toggleClasses();
        });
    }
    }

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
        // /movie?page=1&limit=10&genres.name=%D1%83%D0%B6%D0%B0%D1%81%D1%8B', options
        this.view.headerView.buttonsContainer.addEventListener(
            "click",
            async (event) => {
                const btnValue = this.view.headerView.getBtnValue(event) as string;
                const responseData = await this.model.getData({
                    version: "1.4",
                    chapter: "movie", 
                    path: "", 
                    params: {
                        "genres.name": `${btnValue}`,
                        "limit": 12,
                        // "rating.kp": ["10"],
                    },
                })

                this.view.mainView.createImageList(responseData)
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

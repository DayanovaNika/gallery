import { Model } from "../model/model";
import { MainView } from "../view/components/main-view";
import { View } from "../view/view";

export class Controller {
    model = new Model();
    view;

    constructor() {
        this.init();
    }

    async init() {
        this.view = new View(await this.model.genresList);
        this.setFormListener();
        this.setButtonsListener();
        this.setBurgerListener();
        this.setListListener();
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
            this.view.mainView.showLoader();
            const responseData = await this.model.getData({
            version: "1.4",
            chapter: "movie",
            path: "",
            params: {
                "genres.name": `${btnValue}`,
                limit: 12,
            },
            });
            this.model.setData(responseData);
            this.model.sortRating(this.model.dataFromServer);
            this.view.mainView.createImageList(this.model.dataFromServer);
            this.view.mainView.removeLoader();
            this.view.headerView.toggleClasses();
        },
        );
    }

    async formSubmit(event: SubmitEvent) {
        event.preventDefault();
        this.view.mainView.showLoader();
        const formValue = new FormData(this.view.headerView.form).get("search");
        console.log(formValue);
        
        const response = await this.model.getData({
            version: "1.4",
            chapter: "movie",
            path: "search",
            params: {
                page: 1,
                limit: 12,
                query: formValue,
            }
        })
        this.model.setData(response);
        this.model.sortRating(this.model.dataFromServer);
        this.view.mainView.createImageList(this.model.dataFromServer);
        this.view.mainView.removeLoader();
    }

    setBurgerListener() {
        this.view.headerView.burger.addEventListener("click", () => {
        this.view.headerView.toggleClasses();
        });
    }

    setListListener() {
    this.view.mainView.listElement.addEventListener("click", async (event) => {
        const isCard = event.target.closest("[data-id]");
        const isId = isCard ? isCard.getAttribute("data-id") : null;
        this.view.mainView.showLoader();
        const response = await this.model.getData({
        version: "1.4",
        chapter: "movie",
        path: isId,
        });
        this.view.mainView.removeLoader();
        console.log(response);
        this.view.mainView.removeList();
        this.view.mainView.makePrewiew();
    });
}
}

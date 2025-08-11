import Creator from "../../core/creator";
import style from "./styles/style.module.css";

const headerParams = {
    tagName: "header",
    attributes: {
        id: "header",
        "data-action": "header",
    },
    classList: style.header
}

const formParams = {
    tagName: "form",
    classList: style.form,
    // attributes: {
    // },
};

const inputSearchParams = {
    tagName: "input",
    classList: style.inputSearch,
    attributes: {
        type: "search",
        name: "search",
        
    },
};

const inputSubmitParams = {
    tagName: "input",
    classList: style.inputSubmit,
    attributes: {
        type: "submit",
        value: ""
    },
};

const wrapperButtonParams = {
    tagName: "div",
    classList: style.wrapperButtons
}

const containerParams = {
    tagName: "div",
    classList: style.container
};

export class HeaderView {
    element = new Creator(headerParams).getElement()
    form
    container
    constructor() {
        this.container = new Creator(containerParams).getElement()
        this.creatorOfButtons()
        this.form = this.formCreator()
        this.element.append(this.container)
    }
    creatorOfButtons() {
        const dataButtons = [
            {
                tagName: "button",
                text: "dog",
                attributes: {
                    "data-value": "dog"
                },
                classList: style.button
            },
            {
                tagName: "button",
                text: "cat",
                attributes: {
                    "data-value": "cat"
                },
                classList: style.button
            },
            {
                tagName: "button",
                text: "horse",
                attributes: {
                    "data-value": "horse"
                },
                classList: style.button
            },
            {
                tagName: "button",
                text: "lion",
                attributes: {
                    "data-value": "lion"
                },
                classList: style.button
            },
            {
                tagName: "button",
                text: "monkey",
                attributes: {
                    "data-value": "monkey"
                },
                classList: style.button
            },
            {
                tagName: "button",
                text: "bear",
                attributes: {
                    "data-value": "bear"
                },
                classList: style.button
            },
        ]
        const wrapperButtons = new Creator(wrapperButtonParams).getElement()

        dataButtons.forEach(btnParams => {
            const currentBtn = new Creator(btnParams).getElement()
            wrapperButtons.append(currentBtn)
        });
        this.container.append(wrapperButtons)
    }
    formCreator() {
        const formElem = new Creator(formParams).getElement()
        const inputSearch = new Creator(inputSearchParams).getElement()
        const inputSubmit = new Creator(inputSubmitParams).getElement()
        formElem.append(inputSearch, inputSubmit)
        this.container.append(formElem)
        return formElem
    }
}
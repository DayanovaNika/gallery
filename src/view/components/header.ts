import Creator from "../../core/creator";

const headerParams = {
    tagName: "header",
    attributes: {
        id: "header",
        "data-action": "header",
    }
}

const formParams = {
    tagName: "form",
    // classList: [],
    // attributes: {
    // },
};

const inputSearchParams = {
    tagName: "input",
    // text: "",
    // classList: [],
    attributes: {
        type: "search"
    },
};

const inputSubmitParams = {
    tagName: "input",
    // text: "",
    // classList: [],
    attributes: {
        type: "submit"
    },
};

const wrapperButtonParams = {
    tagName: "div",
}

export class HeaderView {
    element = new Creator(headerParams).getElement()
    constructor() {
        this.creatorOfButtons()
        this.formCreator()
    }
    creatorOfButtons() {
        const dataButtons = [
            {
                tagName: "button",
                text: "dog",
                attributes: {
                    "data-value": "dog"
                }
            },
            {
                tagName: "button",
                text: "cat",
                attributes: {
                    "data-value": "cat"
                }
            },
            {
                tagName: "button",
                text: "horse",
                attributes: {
                    "data-value": "horse"
                }
            },
            {
                tagName: "button",
                text: "lion",
                attributes: {
                    "data-value": "lion"
                }
            },
            {
                tagName: "button",
                text: "monkey",
                attributes: {
                    "data-value": "monkey"
                }
            },
            {
                tagName: "button",
                text: "bear",
                attributes: {
                    "data-value": "bear"
                }
            },
        ]
        const wrapperButtons = new Creator(wrapperButtonParams).getElement()

        dataButtons.forEach(btnParams => {
            const currentBtn = new Creator(btnParams).getElement()
            wrapperButtons.append(currentBtn)
        });
        this.element.append(wrapperButtons)
    }
    formCreator() {
        const formElem = new Creator(formParams).getElement()
        const inputSearch = new Creator(inputSearchParams).getElement()
        const inputSubmit = new Creator(inputSubmitParams).getElement()
        formElem.append(inputSearch, inputSubmit)
        this.element.append(formElem)
    }

}
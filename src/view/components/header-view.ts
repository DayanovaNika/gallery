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
};

const inputSearchParams = {
    tagName: "input",
    classList: style.inputSearch,
    attributes: {
        type: "search",
        name: "search",
        
    },
}
const inputSubmitParams = {
    tagName: "input",
    classList: style.inputSubmit,
    attributes: {
        type: "submit",
        value: ""
    },
}
const wrapperButtonParams = {
    tagName: "div",
    classList: style.wrapperButtons
}
const containerParams = {
    tagName: "div",
    classList: style.container
}
const burgerParams = {
    tagName: "button",
    classList: style.burger
}
const fadeParams = {
    tagName: "div",
    classList: style.fade
};
const burgerLineFirstParams = {
    tagName: "span",
    classList: style.burgerLineFirst
};
const burgerLineSecParams = {
    tagName: "span",
    classList: style.burgerLineSec
};
const burgerLineThirdParams = {
    tagName: "span",
    classList: style.burgerLineThird
};

export class HeaderView {
    form : HTMLFormElement
    burger
    buttonsContainer
    header
    fade
    constructor() {
        this.buttonsContainer = this.creatorOfButtons()
        this.form = this.formCreator()
        this.burger = this.burgerButton()
        this.fade = this.createFade()
        this.header = this.createHeader()
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
        // this.container.append(wrapperButtons)
        return wrapperButtons
    }
    getBtnValue(event: Event) {
        const target = event.target as HTMLElement;
        const isBtn = target.closest("[data-value]") as HTMLElement | null;
        
        if (!isBtn) {
            return 
        }
        if (isBtn) {
            const btnData = isBtn.getAttribute("data-value")
            return btnData
        }
    }
    formCreator() {
        const formElem = new Creator(formParams).getElement() as HTMLFormElement
        const inputSearch = new Creator(inputSearchParams).getElement()
        const inputSubmit = new Creator(inputSubmitParams).getElement()
        formElem.append(inputSearch, inputSubmit)
        // this.container.append(formElem)
        return formElem
    }
    burgerButton() { 
        const burger = new Creator(burgerParams).getElement() 
        const burgerLineFirst = new Creator(burgerLineFirstParams).getElement()
        const burgerLineSec = new Creator(burgerLineSecParams).getElement()
        const burgerLineThird = new Creator(burgerLineThirdParams).getElement()
        burger.append(burgerLineFirst, burgerLineSec, burgerLineThird)

        return burger
    }
    createHeader() {
        const headerElement = new Creator(headerParams).getElement() as HTMLElement
        const containerElement = new Creator(containerParams).getElement() as HTMLElement
        headerElement.append(containerElement)
        containerElement.append(this.fade, this.burger, this.buttonsContainer, this.form)
        return headerElement
    }
    createFade() {
        const fade = new Creator(fadeParams).getElement()
        return fade
    }
}
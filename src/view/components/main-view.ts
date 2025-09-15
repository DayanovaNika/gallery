import Creator from "../../core/creator";
import type { DataTypes } from "../../types/data-types";
import style from "./styles/style.module.css";

const mainParams = {
    tagName: "main",
};
const listParams = {
    tagName: "ul",
    classList: [style.list]
};
const liParams = {
    tagName: "li",
};
const imageParams = {
    tagName: "img",
    classList: [style.image]
};
const containerParams = {
    tagName: "div",
    classList: [style.container]
};
const loaderContainerParams = {
    tagName: "div",
    classList: [style.loader],
};
const gifParams = {
    tagName: "img",
    classList: [style.gif],
    attributes: {
        src: '/gif.gif'
    }
};

export class MainView {
    element
    listElement
    container
    loader
    constructor() {
        this.element = new Creator(mainParams).getElement()
        this.listElement = new Creator(listParams).getElement()
        this.container = new Creator(containerParams).getElement()
        this.container.append(this.listElement)
        this.element.append(this.container)
        this.loader = this.createLoader()
    }
    createImageList(data: DataTypes) {
        const template = new DocumentFragment()
        this.clear()
        data.results.forEach((imageInfo)=> {
            const li = new Creator(liParams).getElement()
            const image = new Creator(imageParams).getElement() as HTMLImageElement
            image.src = imageInfo.urls.regular
            li.append(image)
            template.append(li)
        })
        this.listElement.append(template)
    }
    clear() {
        this.listElement.innerHTML = ''
    }
    createLoader() {
        const loaderContainer = new Creator(loaderContainerParams).getElement()
        const gif = new Creator(gifParams).getElement()
        loaderContainer.append(gif)
        this.element.append(loaderContainer)
        // лоадер изначально должен быть скрыт
        return loaderContainer
    }
    removeLoader() {
        // написать css стили для скрытия лоадера
    }
    showLoader() {
        // написать css стили для показа лоадера
    }
}
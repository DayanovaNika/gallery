import Creator from "../../core/creator";
import style from "./styles/style.module.css";

const mainParams = {
    tagName: "main",
};
const listParams = {
    tagName: "ul",
    classList: style.list
};
const liParams = {
    tagName: "li",
};
const imageParams = {
    tagName: "img",
    classList: style.image
};
const containerParams = {
    tagName: "div",
    classList: style.container
};



export class MainView {
    element = new Creator(mainParams).getElement()
    constructor() {
        
    }
    createImageList(data) {
        const listElement = new Creator(listParams).getElement()
        const template = new DocumentFragment()
        const container = new Creator(containerParams).getElement()
        data.results.forEach((imageInfo)=> {
            const li = new Creator(liParams).getElement()
            this.clear()
            const image = new Creator(imageParams).getElement() as HTMLImageElement
            image.src = imageInfo.urls.regular
            li.append(image)
            template.append(li)
        })
        listElement.append(template)
        container.append(listElement)
        this.element.append(container)
    }
    clear() {
        this.element.innerHTML = ''
    }
}
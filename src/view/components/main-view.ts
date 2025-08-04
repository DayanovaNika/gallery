import Creator from "../../core/creator";

const mainParams = {
    tagName: "main",
};
const listParams = {
    tagName: "ul",
};
const liParams = {
    tagName: "li",
};
const imageParams = {
    tagName: "img",
};



export class MainView {
    element = new Creator(mainParams).getElement()
    constructor() {
        
    }
    createImageList(data) {
        const listElement = new Creator(listParams).getElement()
        const template = new DocumentFragment()

        data.results.forEach((imageInfo)=> {
            const li = new Creator(liParams).getElement()
            this.clear()
            const image = new Creator(imageParams).getElement() as HTMLImageElement
            image.src = imageInfo.urls.regular
            li.append(image)
            template.append(li)
        })
        listElement.append(template)
        this.element.append(listElement)
    }
    clear() {
        this.element.innerHTML = ''
    }
}
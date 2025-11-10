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
    classList: [style.li]
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
const fadeParams = {
    tagName: "div",
    classList: [style.mainFade],
};
const wrapperInfoParams = {
    tagName: "div",
    classList: [style.wrapperInfo],
};
const likesWrapperParams = {
    tagName: "div",
    classList: [style.likesWrapper],
};
const likeElementParams = {
    tagName: "div",
    classList: [style.likeElement],
};
const counterParams = {
    tagName: "div",
    text: "",
    classList: [style.counter],
};
const photoDescParams = {
    tagName: "p",
    text: "",
    classList: [style.photoDesc],
};

export class MainView {
    element
    listElement
    container
    // loader
    constructor() {
        this.element = new Creator(mainParams).getElement()
        this.listElement = new Creator(listParams).getElement()
        this.container = new Creator(containerParams).getElement()
        this.container.append(this.listElement)
        this.element.append(this.container)
        // this.loader = this.createLoader()
    }
    createImageList(data: DataTypes) {
        const template = new DocumentFragment()
        this.clear()
        console.log(data);
        
        data.docs.forEach((imageInfo)=> {
            const li = new Creator(liParams).getElement()
            li.style.backgroundColor = imageInfo.color;
            const image = new Creator(imageParams).getElement() as HTMLImageElement
            // прописать условие если нету картинки (poster) сделать заглушку
            image.src = imageInfo.poster.previewUrl
            const wrapperInfo = new Creator(wrapperInfoParams).getElement() as HTMLElement
            const likesWrapper = new Creator(likesWrapperParams).getElement() as HTMLElement
            const likeElement = new Creator(likeElementParams).getElement() as HTMLElement
            counterParams.text = imageInfo.likes // проверить позже
            const counter = new Creator(counterParams).getElement() as HTMLElement
            photoDescParams.text = imageInfo.alt_description
            const photoDesc = new Creator(photoDescParams).getElement() as HTMLElement

            wrapperInfo.append(likesWrapper, photoDesc)
            likesWrapper.append(likeElement, counter)
            li.append(wrapperInfo)
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
        const fade = new Creator(fadeParams).getElement()
        loaderContainer.append(gif)
        fade.append(loaderContainer)
        this.element.append(fade)
        
        return fade
    }
    removeLoader() {
        setTimeout(() => {
            // this.loader.classList.add(style.loaderHidden);
        },1000);
    }
    showLoader() {
        // this.loader.classList.remove(style.loaderHidden)
    }
}
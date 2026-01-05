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
const ratingWrapperParams = {
    tagName: "div",
    classList: [style.ratingWrapper],
};
const ratingElementParams = {
    tagName: "div",
    classList: [style.ratingElement],
};
const counterRatingParams = {
    tagName: "div",
    text: "",
    classList: [style.counterrating],
};
const iconRatingParams = {
    tagName: "div",
    text: "",
    classList: [style.iconRating],
};
const nameParams = {
    tagName: "div",
    text: "",
    classList: [style.name],
};
const yearParams = {
    tagName: "div",
    text: "",
    classList: [style.year],
};
const criticsNameParams = {
    tagName: "div",
    text: "",
    classList: [style.criticsName],
};
const detailsWrapperParams = {
    tagName: "div",
    classList: [style.detailsWrapper],
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

// const img = document.querySelector('img');

            const image = new Creator(imageParams).getElement() as HTMLImageElement
            if (imageInfo.poster && imageInfo.poster.previewUrl) {
                image.src = imageInfo.poster.previewUrl
            }
            else {
                image.src = "/zaglushka.jpg"
            }

            const name = new Creator(nameParams).getElement() 
            if (imageInfo.name) {
                name.innerText = imageInfo.name
            } else {
                name.innerText = "no name"
            }

            const year = new Creator(yearParams).getElement()
            if (imageInfo.year) {
                year.innerText = `год: ${imageInfo.year}`
            } else {
                year.innerText= "no year"
            }

            const ratingWrapper = new Creator(ratingWrapperParams).getElement()
            
            for (const key in imageInfo.rating) {
                if ((key === "kp" || key === "imdb") && imageInfo.rating[key] > 0){
                    const ratingElement = new Creator(ratingElementParams).getElement()
                    const counterRating = new Creator(counterRatingParams).getElement()
                    const iconRating = new Creator(iconRatingParams).getElement()
                    const criticsName = new Creator(criticsNameParams).getElement()
                    criticsName.innerText = `${key}:`
                    ratingWrapper.append(ratingElement)
                    ratingElement.append(criticsName, counterRating, iconRating)
                    counterRating.innerText = imageInfo.rating[key]
                }
                else {
                    continue
                }
            }
            
            // 1 дописать проверку
            // 2 если ключ это кп или imdb тогда создать оболочки и наполнить данными,инчае пропустить итерацию
            // 3 доп проверка если рейтинг 0 тогда серая звезда


            const wrapperInfo = new Creator(wrapperInfoParams).getElement() as HTMLElement
            const detailsWrapper = new Creator(detailsWrapperParams).getElement() as HTMLElement

            li.append(wrapperInfo)
            detailsWrapper.append(ratingWrapper, year)
            wrapperInfo.append(name, detailsWrapper)
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
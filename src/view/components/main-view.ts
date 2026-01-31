import Creator from "../../core/creator";
import type { DataTypes } from "../../types/data-types";

import styleList from "./styles/list-card.module.css";
import styleMain from "./styles/main.module.css";

const mainParams = {
  tagName: "main",
};
const listParams = {
  tagName: "ul",
  classList: [styleList.list],
};
const liParams = {
  tagName: "li",
  classList: [styleList.li],
  attributes: {
    "data-id": "",
  },
};
const imageParams = {
  tagName: "img",
  classList: [styleList.image],
};
const containerParams = {
  tagName: "div",
  classList: [styleList.container],
};
const loaderContainerParams = {
  tagName: "div",
  classList: [styleMain.loader],
};
const gifParams = {
  tagName: "img",
  classList: [styleMain.gif],
  attributes: {
    src: "/gif.gif",
  },
};
const fadeParams = {
  tagName: "div",
  classList: [styleMain.mainFade],
};
const wrapperInfoParams = {
  tagName: "div",
  classList: [styleList.wrapperInfo],
};
const ratingWrapperParams = {
  tagName: "div",
  classList: [styleList.ratingWrapper],
};
const ratingElementParams = {
  tagName: "div",
  classList: [styleList.ratingElement],
};
const counterRatingParams = {
  tagName: "div",
  text: "",
  classList: [styleList.counterrating],
};
const iconRatingParams = {
  tagName: "div",
  text: "",
  classList: [styleList.iconRating],
};
const nameParams = {
  tagName: "div",
  text: "",
  classList: [styleList.name],
};
const yearParams = {
  tagName: "div",
  text: "",
  classList: [styleList.year],
};
const criticsNameParams = {
  tagName: "div",
  text: "",
  classList: [styleList.criticsName],
};
const detailsWrapperParams = {
  tagName: "div",
  classList: [styleList.detailsWrapper],
};
export class MainView {
  element;
  listElement;
  container;
  loader
  constructor() {
    this.element = new Creator(mainParams).getElement();
    this.listElement = new Creator(listParams).getElement();
    this.container = new Creator(containerParams).getElement();
    this.container.append(this.listElement);
    this.element.append(this.container);
    this.loader = this.createLoader();
  }

  createImageList(data: DataTypes) {
    const template = new DocumentFragment();
    this.clear();

    data.docs.forEach((imageInfo) => {
      liParams.attributes["data-id"] = imageInfo.id;
      const li = new Creator(liParams).getElement();

      const image = new Creator(imageParams).getElement() as HTMLImageElement;
      if (imageInfo.poster && imageInfo.poster.previewUrl) {
        image.src = imageInfo.poster.previewUrl;
      } else {
        image.src = "/zaglushka.jpg";
      }

      const name = new Creator(nameParams).getElement();
      if (imageInfo.name) {
        name.innerText = imageInfo.name;
      } else {
        name.innerText = "no name";
      }

      const year = new Creator(yearParams).getElement();
      if (imageInfo.year) {
        year.innerText = `год: ${imageInfo.year}`;
      } else {
        year.innerText = "no year";
      }

      const ratingWrapper = new Creator(ratingWrapperParams).getElement();

      for (const key in imageInfo.rating) {
        if ((key === "kp" || key === "imdb") && imageInfo.rating[key] > 0) {
          const ratingElement = new Creator(ratingElementParams).getElement();
          const counterRating = new Creator(counterRatingParams).getElement();
          const iconRating = new Creator(iconRatingParams).getElement();
          const criticsName = new Creator(criticsNameParams).getElement();
          criticsName.innerText = `${key}:`;
          ratingWrapper.append(ratingElement);
          ratingElement.append(criticsName, counterRating, iconRating);
          counterRating.innerText = imageInfo.rating[key];
        } else {
          continue;
        }
      }
      const wrapperInfo = new Creator(
        wrapperInfoParams,
      ).getElement() as HTMLElement;
      const detailsWrapper = new Creator(
        detailsWrapperParams,
      ).getElement() as HTMLElement;

      li.append(wrapperInfo);
      detailsWrapper.append(ratingWrapper, year);
      wrapperInfo.append(name, detailsWrapper);
      li.append(image);
      template.append(li);
    });
    this.listElement.append(template);
  }
  clear() {
    this.listElement.innerHTML = "";
  }
  createLoader() {
    const loaderContainer = new Creator(loaderContainerParams).getElement();
    const gif = new Creator(gifParams).getElement();
    const fade = new Creator(fadeParams).getElement();
    loaderContainer.append(gif);
    fade.append(loaderContainer);
    // this.element.append(fade);

    return fade;
  }
  removeLoader() {
    setTimeout(() => {
      // this.loader.classList.add(style.loaderHidden);
      this.loader.remove()
    });
  }
  showLoader() {
    // this.loader.classList.remove(style.loaderHidden)
    this.element.append(this.loader)
  }
}

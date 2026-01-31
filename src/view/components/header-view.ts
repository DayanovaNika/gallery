import Creator from "../../core/creator";

import styleBurger from "./styles/burger.module.css";
import styleHeader from "./styles/header-style.module.css";


const headerParams = {
  tagName: "header",
  attributes: {
    id: "header",
    "data-action": "header",
  },
  classList: [styleHeader.header],
};
const formParams = {
  tagName: "form",
  classList: [styleHeader.form],
};
const inputSearchParams = {
  tagName: "input",
  classList: [styleHeader.inputSearch],
  attributes: {
    type: "search",
    name: "search",
  },
};
const inputSubmitParams = {
  tagName: "input",
  classList: [styleHeader.inputSubmit],
  attributes: {
    type: "submit",
    value: "",
  },
};
const wrapperButtonParams = {
  tagName: "div",
  classList: [styleHeader.wrapperButtons],
};
const containerParams = {
  tagName: "div",
  classList: [styleHeader.container],
};
const burgerParams = {
  tagName: "button",
  classList: [styleBurger.burger],
};
const fadeParams = {
  tagName: "div",
  classList: [styleHeader.fade],
};
const btnContainerParams = {
  tagName: "div",
  text: "",
  classList: [styleHeader.btnContainer],
};
const burgerLineParams = {
  tagName: "span",
  classList: [styleBurger.burgerLineBase],
};
// const burgerLineSecParams = {
//     tagName: "span",
//     classList: [style.burgerLineBase]
// };
// const burgerLineThirdParams = {
//     tagName: "span",
//     classList: [style.burgerLineBase]
// };

export class HeaderView {
  form: HTMLFormElement;
  burger;
  buttonsContainer;
  header;
  fade;
  constructor(genresList) {
    this.buttonsContainer = this.creatorOfButtons(genresList);
    this.form = this.formCreator();
    this.burger = this.burgerButton();
    this.fade = this.createFade();
    this.header = this.createHeader();
  }
  creatorOfButtons(genresList) {
    const btnParams = {
      tagName: "button",
      text: "",
      attributes: {
        "data-value": "",
      },
      classList: [styleHeader.button],
    };
    const wrapperButtons = new Creator(wrapperButtonParams).getElement();
    const btnContainer = new Creator(btnContainerParams).getElement();
    genresList.forEach((genres) => {
      if (genres.name.toLowerCase() === "для взрослых") {
        return;
      }
      btnParams.text = genres.name;
      btnParams.attributes["data-value"] = genres.name;
      const currentBtn = new Creator(btnParams).getElement();
      wrapperButtons.append(currentBtn);
    });
    btnContainer.append(wrapperButtons);
    return btnContainer;
  }
  getBtnValue(event: Event) {
    const target = event.target as HTMLElement;
    const isBtn = target.closest("[data-value]") as HTMLElement | null;

    if (!isBtn) {
      return;
    }
    if (isBtn) {
      const btnData = isBtn.getAttribute("data-value");
      return btnData;
    }
  }
  formCreator() {
    const formElem = new Creator(formParams).getElement() as HTMLFormElement;
    const inputSearch = new Creator(inputSearchParams).getElement();
    const inputSubmit = new Creator(inputSubmitParams).getElement();
    formElem.append(inputSearch, inputSubmit);
    return formElem;
  }
  burgerButton() {
    const burger = new Creator(burgerParams).getElement();
    const burgerLine = new Creator(burgerLineParams).getElement();
    burger.append(burgerLine);
    // const burgerLineSec = new Creator(burgerLineSecParams).getElement()
    // const burgerLineThird = new Creator(burgerLineThirdParams).getElement()
    // burger.append(burgerLineFirst, burgerLineSec, burgerLineThird)

    return burger;
  }
  createHeader() {
    const headerElement = new Creator(headerParams).getElement() as HTMLElement;
    const containerElement = new Creator(
      containerParams,
    ).getElement() as HTMLElement;
    headerElement.append(containerElement);
    containerElement.append(
      this.fade,
      this.burger,
      this.buttonsContainer,
      this.form,
    );
    return headerElement;
  }
  createFade() {
    const fade = new Creator(fadeParams).getElement();
    return fade;
  }
  toggleClasses() {
    this.fade.classList.toggle(styleHeader.fadeOpen);
    this.burger.classList.toggle(styleBurger.active);
    this.buttonsContainer.classList.toggle(styleHeader.wrapperButtonsOpen);
    this.form.classList.toggle(styleHeader.formOpen);
  }
}

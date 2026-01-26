import Creator from "../../core/creator";
import style from "./styles/style.module.css";

const headerParams = {
  tagName: "header",
  attributes: {
    id: "header",
    "data-action": "header",
  },
  classList: [style.header],
};
const formParams = {
  tagName: "form",
  classList: [style.form],
};
const inputSearchParams = {
  tagName: "input",
  classList: [style.inputSearch],
  attributes: {
    type: "search",
    name: "search",
  },
};
const inputSubmitParams = {
  tagName: "input",
  classList: [style.inputSubmit],
  attributes: {
    type: "submit",
    value: "",
  },
};
const wrapperButtonParams = {
  tagName: "div",
  classList: [style.wrapperButtons],
};
const containerParams = {
  tagName: "div",
  classList: [style.container],
};
const burgerParams = {
  tagName: "button",
  classList: [style.burger],
};
const fadeParams = {
  tagName: "div",
  classList: [style.fade],
};
const btnContainerParams = {
  tagName: "div",
  text: "",
  classList: [style.btnContainer],
};
const burgerLineParams = {
  tagName: "span",
  classList: [style.burgerLineBase],
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
      classList: [style.button],
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
    this.fade.classList.toggle(style.fadeOpen);
    this.burger.classList.toggle(style.active);
    this.buttonsContainer.classList.toggle(style.wrapperButtonsOpen);
    this.form.classList.toggle(style.formOpen);
  }
}

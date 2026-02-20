import Creator from "../../core/creator";
import {
  cardElementParams,
  prewiewheaderElParams,
} from "./params/prewiew-params";

class HeaderPrewiew {
  prewiewHeaderElement;
  constructor(dataPreview) {
    console.log(dataPreview);

    // 3. вытащи из данных картинку и вставь вместо котика
    const imgUrl =
      "https://opis-cdn.tinkoffjournal.ru/mercury/black-cats-only-01.jpg";

    // 4. тут мы просто дёргаем стайл атрибут из параметров и присваиваем ему строку с фоном, который мы хотим отобразить в превью
    prewiewheaderElParams.attributes.style = `background-image: url(${imgUrl});`;

    this.prewiewHeaderElement = new Creator(prewiewheaderElParams).getElement();
  }

  getHeader() {
    return this.prewiewHeaderElement;
  }
}

export class PreviewView {
  cardElement;
  headerElement;

  // 1. dataPreview - данные для отображения в превью, например, url картинки (и много чего еще)
  constructor(dataPreview) {
    this.cardElement = new Creator(cardElementParams).getElement();
    // 2. передаем данные для отображения в превью в HeaderPrewiew, чтобы он мог отобразить эти данные
    this.headerElement = new HeaderPrewiew(dataPreview).getHeader();
    this.build();
  }

  getPrewiew() {
    return this.cardElement;
  }

  build() {
    this.cardElement.append(this.headerElement);
  }
}

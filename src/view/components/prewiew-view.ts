import Creator from "../../core/creator";

const cardElementParams = {
    tagName: "div",
    classList: [],
};

export class PrewiewView {
    cardElement
    constructor(dataPrewiew){
        this.cardElement = new Creator(cardElementParams).getElement()
    }
    getPrewiew(){
        return this.cardElement
    }
}
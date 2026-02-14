import Creator from "../../core/creator";
import { cardElementParams, prewiewheaderElParams } from "./params/prewiew-params";

class HeaderPrewiew {
    prewiewHeaderElement

    constructor({
        // backdrop,
    }){
        console.log(prewiewheaderElParams);
        // if(backdrop) {
            
        // }
        this.prewiewHeaderElement = new Creator(prewiewheaderElParams).getElement()
    }
    getHeader(){
        return this.prewiewHeaderElement
    }
}

export class PrewiewView {
    cardElement
    headerElement

    constructor(dataPrewiew){
        this.cardElement = new Creator(cardElementParams).getElement()
        this.headerElement = new HeaderPrewiew({}).getHeader()
    }

    getPrewiew(){
        return this.cardElement
    }

    build(){
        this.cardElement.append(this.headerElement)
    }
}
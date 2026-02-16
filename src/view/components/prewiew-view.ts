import Creator from "../../core/creator";
import { cardElementParams, prewiewheaderElParams } from "./params/prewiew-params";

class HeaderPrewiew {
    prewiewHeaderElement
    constructor() {
        console.log(prewiewheaderElParams);

        this.prewiewHeaderElement = new Creator(prewiewheaderElParams).getElement()
        this.prewiewHeaderElement.setAttribute("style", `backgroundColor: green`)
        console.log(this.prewiewHeaderElement);
        
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
        this.headerElement = new HeaderPrewiew().getHeader()
        console.log(this.headerElement);
        this.build()
    }

    getPrewiew(){
        return this.cardElement
    }

    build(){
        this.cardElement.append(this.headerElement)
        console.log(this.headerElement);
        
    }
}
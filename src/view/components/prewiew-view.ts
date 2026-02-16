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
        const headerStyle = {
            backgroundColor:"green",
            height:"100px",
        }
        prewiewheaderElParams.attributes.style = "dkddcls";
        console.log(prewiewheaderElParams);
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
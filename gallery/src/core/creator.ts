type attributesMap = Record<string, string>;

interface HeaderParamsTypes {
    tagName: string;
    text? : string | number;
    classList? : string;
    attributes? : attributesMap
}

const headerParams = {
    tagName: 'header',
    text: '',
    classList:
        "testClass",
    attributes: {},
};

class Creator { 
    params 
    element: HTMLElement

    constructor(paramsElem: HeaderParamsTypes) {
        this.params = paramsElem
        this.element = this.creatorOfElement()
        this.creatorOfElement()
    }

    creatorOfElement() {
        if (this.params.tagName) {
            return document.createElement(this.params.tagName)
        } 
    }
}

export const header = new Creator(headerParams)
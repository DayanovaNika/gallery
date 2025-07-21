import { HeaderView } from "./components/header";

export class View {
    headerView = new HeaderView().element
    appContainer 
    // mainView = new MainView()
    constructor(){
        this.appContainer = document.querySelector('#app')
        this.buildInterface()
        console.log(new HeaderView());
    }
    buildInterface() {
        this.appContainer?.append(this.headerView as HTMLElement)
    }
}

// export class MainView {
//     element = new Creator(MainParams).getElement()
//     constructor() {
//         console.log(this.element);
        
//     }
// }



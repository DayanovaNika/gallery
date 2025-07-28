import { HeaderView } from "./components/header";

export class View {
    headerView = new HeaderView()
    appContainer 
    // mainView = new MainView()
    constructor(){
        this.appContainer = document.querySelector('#app')
        this.buildInterface()
    }
    buildInterface() {
        this.appContainer?.append(this.headerView.element as HTMLElement)
    }
}

// export class MainView {
//     element = new Creator(MainParams).getElement()
//     constructor() {
//         console.log(this.element);
        
//     }
// }



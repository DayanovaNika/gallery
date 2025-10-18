import { HeaderView } from "./components/header-view";
import { MainView } from "./components/main-view";

export class View {
    appContainer 
    headerView = new HeaderView()
    mainView = new MainView()
    constructor(genresList){
        console.log(genresList);
        this.appContainer = document.querySelector('#app')
        this.buildInterface()
    }
    buildInterface() {
        this.appContainer?.append(this.headerView.header as HTMLElement)
        this.appContainer?.append(this.mainView.element as HTMLElement)
    }
}
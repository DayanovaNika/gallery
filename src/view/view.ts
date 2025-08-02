import { HeaderView } from "./components/header-view";
import { MainView } from "./components/main-view";

export class View {
    appContainer 
    headerView = new HeaderView()
    mainView = new MainView()
    constructor(){
        this.appContainer = document.querySelector('#app')
        this.buildInterface()
    }
    buildInterface() {
        this.appContainer?.append(this.headerView.element as HTMLElement)
        this.appContainer?.append(this.mainView.element as HTMLElement)
    }
}

// создать метод который будет принимать данные, создавать под header список ul, и как при создании кнопок для каждого елемента массива данных создавать li, внутри создавать тег img, в src img подставлять данные, li встиавить в список

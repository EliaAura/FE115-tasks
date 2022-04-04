import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";


class App {
    constructor(){
        this.element;
        
    }
    root = document.querySelector('#root');
    create() {
        let app = document.createElement('div');
        app.classList.add('app');
        this.element = app;
    }
    render()
    init() {
        
    }
}
export default new App().init()
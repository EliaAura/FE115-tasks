import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

function App(){
    const root = document.querySelector('#root');

    this.elem = document.createElement('div');
    this.elem.innerHTML = `
    <h2>Header</h2>
    <h2>Main</h2>
    <h2>Footer</h2>
    `

    const render = (...elems) => {
        elems.forEach(elem => root.appendChild(elem));
    }

    this.init = () => {
        render(Header, Main, Footer);
    }
}

export default App
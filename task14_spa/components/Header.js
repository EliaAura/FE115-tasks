import {widget} from "./Cart.js";

function Header(){
    const elem = document.createElement('div');
    elem.classList.add('header-component');
    elem.innerHTML = `
        <div class='logo'>
            <a href="\">
                <img src="https://st.weblancer.net/download/956120_935xp.jpg" alt="">
            </a>
        </div>
        <nav class="nav">
            <ul>
            <li><a href="\">Home</a></li>
            <li><a href="#catalog">Catalog</a></li>
            <li><a href="#about">About</a></li>
            </ul>
        </nav>
        ${widget.outerHTML}
    `
    // elem.append(widget)

    this.init = () => {
        return elem;
    }
}

export default new Header().init()
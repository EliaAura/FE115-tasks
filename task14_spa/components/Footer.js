function Footer(){
    const elem = document.createElement('div');
    elem.classList.add('footer-component');
    elem.innerHTML = `
        <div class='logo'>
            <a href="\">
                <img src="https://st.weblancer.net/download/956120_935xp.jpg" alt="">
            </a>
        </div>
        <ul>
        <li><a href>About us</a></li>
        <li><a href>Contact info</a></li>
        <li><a href>Payment</a></li>
        <li><a href>Delivery</a></li>
        <li><a href>Store events</a></li>
        <li><a href>Sales</a></li>
        <li><a href>Returns</a></li>
        <li><a href>Partnership</a></li>
        </ul>
    `
    this.init = () => {
        return elem;
    }
}

export default new Footer().init()
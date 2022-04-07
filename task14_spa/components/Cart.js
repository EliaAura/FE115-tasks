function Cart(){
    this.cart = [];
    this.totalPrice = 0;
    this.prices = [];
    this.title = 'Cart';

    const elem = document.createElement('div');
    elem.classList.add('about-component');
    elem.innerHTML = `
        <h1>Cart</h1>
    `
    const cartItems = document.createElement('div');
    cartItems.classList.add('cart-items');
    const totalPrice = document.createElement('div');
    totalPrice.classList.add('total-price');

    this.render = () => {
        cartItems.innerHTML = '';
        this.prices = [];
        this.cart.forEach(data => {
            let cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="item-image">
                    <img src="${data.image}" alt="#">
                </div>
                <div>
                    <h2>${data.title}</h2>
                </div>
            `;

            let tPrice = document.createElement('div');
            tPrice.classList.add('t-price');
            tPrice.innerText = `${data.price * (data.count ? data.count : 1)}$`;
            this.prices.push(parseFloat(tPrice.innerText));
            let counter = document.createElement('input');
            counter.setAttribute('type', 'number')
            counter.value = data.count ? data.count : 1;

            counter.addEventListener('change', (e) => {
                if (counter.value > 0){
                    data.count = +counter.value;
                    this.render();
                    localStorage.setItem('cart', JSON.stringify(this.cart));
                }else{
                    counter.value = 1;
                }
            })

            let delBtn = document.createElement('button');
            delBtn.classList.add('delete');
            delBtn.innerHTML = 'Delete';
            delBtn.addEventListener('click', _ => this.cartDelete(data.id));

            cartItem.append(tPrice, counter, delBtn);
            cartItems.append(cartItem)
        })

        console.log(this.prices);
        totalPrice.innerText = `Total Price: ${this.prices.reduce((count, item) => count + item, 0).toFixed(2)} $`;
        elem.append(cartItems, totalPrice);
        return elem;
    }
    this.cartDelete = (id) => {
        this.cart = this.cart.filter(data => data.id !== id);
        this.render();
        localStorage.setItem('cart', JSON.stringify(this.cart));

    }

    this.cartWidget = () => {
        let elem = document.createElement('div');
        elem.classList.add('cart-widget');
        elem.innerHTML = `
            <a href="#cart">Cart:&nbsp;</a>
            <span>${this.cart.length}</span>
        `

        return elem;
    }

    this.addCart = (obj) =>{

        if (obj) {
            obj.count = 1;
            this.cart.push(obj);
        }
        let count = document.querySelector('.cart-widget').lastElementChild;
        count.innerText = this.cart.length;

        localStorage.setItem('cart', JSON.stringify(this.cart));

        let flag = this.cart.some(data => data.id === obj.id);
        return flag;
    }

    this.init = () => {
        if (localStorage.getItem('cart')){
            this.cart = JSON.parse(localStorage.getItem('cart'));
        }
        return this.render();
    }
}

let elem = new Cart();
let init = elem.init();
let widget = elem.cartWidget();
let addCart = elem.addCart;
let title = elem.title

export default elem;
export {widget, addCart, title}
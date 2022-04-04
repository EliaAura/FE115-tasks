import {itemApi} from "./catalogApi.js";
import spinner from "./Spinner.js";
import {addCart} from "./Cart.js";

function Catalog(){
    const elem = document.createElement('div');
    elem.classList.add('item-component');
    let data = {};

    this.title = 'Product';

    this.ren = async (id) => {
        elem.innerHTML = '';
        let spin = spinner();
        elem.append(spin);

        let localCart = localStorage.getItem('cart');
        localCart = JSON.parse(localCart);

        data = await itemApi(id);
        elem.innerHTML = '';

        let productCart = document.createElement('div');
        productCart.classList.add('cart-item');
        let img = document.createElement('img');
        img.classList.add('item-img');
        img.setAttribute('src', data.image);
        let desc = document.createElement('p');
        desc.innerText = data.description;
        let category = document.createElement('p');
        category.innerText = data.category;
        let title = document.createElement('h2');
        title.classList.add('cart-title');
        title.innerText = data.title;
        let priceCart = document.createElement('p');
        priceCart.classList.add('cart-price');
        priceCart.innerText = data.price;
        let btnAdd = document.createElement('button');
        if (localCart.some(data => data.id === +id)){
            btnAdd.innerText = 'Added';
            btnAdd.disabled = true;
        }else{
            btnAdd.innerText = 'Add';
        }
        elem.append(title, category, img, desc, priceCart, btnAdd);
        // console.log(data);
        // Добавить кнопку "В корзину"

        btnAdd.addEventListener('click', () =>{
            if (addCart(data)){
                btnAdd.innerText = 'Added';
                btnAdd.disabled = true;
            }
        })

        // return elem;
    }

    // render();

    // elem.append(container);




    this.render = (id) => {
        this.ren(id)
        return elem;
    }
}

let product = new Catalog();

export default product;
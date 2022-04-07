import {catalogData} from "./catalogApi.js";
import spinner from "./Spinner.js";

function Catalog(){

    this.title = 'Catalog';
    
    const elem = document.createElement('div');
    elem.classList.add('catalog-component');
    elem.innerHTML = `<h1>Catalog</h1>`;
    const container = document.createElement('div');
    container.classList.add('catalog-container');
    let data = []; //Есть два варианта, либо использовать локальное храниище, либо использовать прелоадер


    const render = async (data) => {
        let spin = spinner();
        container.append(spin);
        let localCart = localStorage.getItem('cart');
        localCart = JSON.parse(localCart);

        data = await catalogData();
        container.removeChild(spin);
        
        data.forEach(data => {
            let productCart = document.createElement('div');
            productCart.classList.add('cart');
            let imgLinc = document.createElement('a');
            imgLinc.setAttribute('href', `#catalog/${data.id}`);
            let img = document.createElement('img');
            img.classList.add('cart-img');
            img.setAttribute('src', data.image);
            imgLinc.append(img);
            
            let titleLinc = document.createElement('a');
            titleLinc.setAttribute('href', `#catalog/${data.id}`);
            titleLinc.innerText = data.title;
            let title = document.createElement('h2');
            title.classList.add('cart-title');
            title.append(titleLinc);
            
            let priceCart = document.createElement('p');
            priceCart.classList.add('cart-price');
            priceCart.innerText = data.price + '$';

            let btnAdd = document.createElement('button');
            if (localCart && localCart.some(d => d.id === data.id)){
                btnAdd.innerText = 'Added';
                btnAdd.disabled = true;
            }else{
                btnAdd.innerText = 'Add';
            }
            productCart.append(imgLinc, title, priceCart, btnAdd);
            container.append(productCart);
            

            btnAdd.addEventListener('click', () => {
                import('./Cart.js')
                    .then(module => {
                        if (module.addCart(data)){
                            btnAdd.innerText = 'Added';
                            btnAdd.disabled = true;
                        }
                    })
            })
        })
    }

    render(data);

    elem.append(container)

    this.init = () => {
        return elem;
    }
}

let elem = new Catalog();
let init = elem.init();
let title = elem.title;

export default elem;
export {title};
function Home(){
    this.title ='Home'
    const elem = document.createElement('div');
    elem.classList.add('home-component');
    elem.innerHTML = `
        <h1>Home</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur delectus sapiente voluptatem enim commodi, odio maiores animi molestiae. Eos aliquid deserunt nostrum in, vitae explicabo ab molestias. Nihil, corrupti quasi.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur delectus sapiente voluptatem enim commodi, odio maiores animi molestiae. Eos aliquid deserunt nostrum in, vitae explicabo ab molestias. Nihil, corrupti quasi.</p>
    `
    this.init = () => {
        return elem;
    }
}

let elem = new Home();
let init = elem.init();
let title = elem.title;

export default init;
export {title};
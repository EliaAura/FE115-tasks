function About(){
    this.title = 'About'
    const elem = document.createElement('div');
    elem.classList.add('about-component');
    elem.innerHTML = `
        <h1>About</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto maiores molestias optio repellendus. Amet beatae, ipsam. Non unde vel veritatis.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur delectus sapiente voluptatem enim commodi, odio maiores animi molestiae.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto maiores molestias optio repellendus. Amet beatae, ipsam. Non unde vel veritatis. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <p>Amet beatae, ipsam. Non unde vel veritatis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto maiores molestias optio repellendus. </p>
        <p>Iusto maiores molestias optio repellendus. Amet beatae, ipsam. Non unde vel veritatis.</p>
    `
    this.init = () => {
        return elem;
    }
}

let elem = new About();
let init = elem.init();
let title = elem.title;

export default elem;
export {title};
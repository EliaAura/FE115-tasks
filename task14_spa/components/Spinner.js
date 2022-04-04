export default function spinner(){
    let spinner = document.createElement('div');
    spinner.classList.add('loader');
    spinner.innerText = 'Loading...'

    return spinner;
}
const tabs = function (mainSelector){
    const tabsContainer = document.querySelector(mainSelector);

    let tabs = tabsContainer.querySelector('.tabs').children;
    if(tabs.length === 0) return;

    let tabContent = tabsContainer.querySelector('.tab-content').children;
    if(tabContent.length === 0 || tabContent.length !== tabs.length) return;


    [...tabs].map((elem, i) => {
       elem.addEventListener('click', function (){
           show(i);
       })
    });

    function show(i){
        [...tabs].map((elem, i) => {
            elem.classList.remove('active');
            tabContent[i].classList.remove('active');
        })
        tabs[i].classList.add('active');
        tabContent[i].classList.add('active');
    }
}

tabs('.tabs-conteiner')

function tooltip() {
    let elements = document.querySelectorAll('.tooltip');

    [...elements].forEach(element => {
        element.addEventListener('mouseenter', function (e) {
            createTooltip(e);
        })
        
    })

    function createTooltip(e, elem) {
        console.log(e.target)

        elem = document.createElement('div');
        elem.setAttribute('class', 'tooltip-element');       
        elem.textContent = e.target.title;
        document.body.append(elem);

        elem.style.top = e.pageY + "px";
        elem.style.left = e.pageX + "px";
        elem.style.display = "block";
        e.target.addEventListener('mouseleave', function() {
            elem.style.display = "none";
        }
        )
        

    }
    
}


tooltip()
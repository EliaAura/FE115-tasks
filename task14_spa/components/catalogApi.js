async function catalogData(){
    // let data = [];
    return await fetch('https://fakestoreapi.com/products/')
        .then(resp => resp.json())
        .then(data => {
            return data;
        })
}

async function itemApi(id){
    return await fetch(`https://fakestoreapi.com/products/${id}`)
        .then(resp => resp.json())
        .then(data => {
            return data;
        })
}

export {catalogData, itemApi}
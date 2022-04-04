
class User{
    constructor(data) {
        if(data.name.length > 0 && data.address.length > 0 && data.email.length > 0 && data.phone.length > 0) this.data = data;
    }

    edit(data) {
        Object.assign(this.data, data)
    }
}

class Contacts{
    constructor() {
        this.userId = 0;
        this.contacts = [];
    }

    add(data){
        if(data.name.length > 0 && data.address.length > 0 && data.email.length > 0 && data.phone.length > 0) {
            this.userId++

            let user = new User(data);
            user.data.id = this.userId
            this.contacts.push(user);
        }
    }

    edit(id, data){
        let userFind = this.contacts.find(user => {
            return user.data.id === id ? user: null;
        })
        userFind.edit(data);
    }

    remove(id){
        this.contacts = this.contacts.filter(user => user.data.id !== id ? user : null);
        return true;
    }

    getContacts(){
        return this.contacts;
    }

    getUser() {
        return this.user;
    }

}

class ContactsApp extends Contacts{
    constructor() {
        super();
        this.init();
    }

    initFake(rez) {
        return rez.map(d => {
            let {id: id, name: name, phone: phone, email: email, address:{city, street}} = d;
            let address = `${city} ${street}`;

            this.add({id, name, phone, email, address});
        });
    }

    
    async init(){
        
        let formUser = document.createElement('form');
        formUser.setAttribute('class', 'user_form');

        let contactTitle = document.createElement('h1');
        contactTitle.setAttribute('class', 'contact_title');
        contactTitle.innerText = 'Contacts'

        let userName = document.createElement('input');
        userName.setAttribute('type', 'text');
        userName.setAttribute('name', 'name');
        userName.setAttribute('class', 'input');
        userName.setAttribute('placeholder', 'your name, surname');


        let userMail = document.createElement('input');
        userMail.setAttribute('type', 'email');
        userMail.setAttribute('name', 'email');
        userMail.setAttribute('class', 'input');
        userMail.setAttribute('placeholder', 'yourmail@mail.com');

        let userAddress = document.createElement('input');
        userAddress.setAttribute('type', 'text');
        userAddress.setAttribute('name', 'address');
        userAddress.setAttribute('class', 'input');
        userAddress.setAttribute('placeholder', 'your address');

        let userPhone = document.createElement('input');
        userPhone.setAttribute('type', 'tel');
        userPhone.setAttribute('name', 'phone');
        userPhone.setAttribute('class', 'input');
        userPhone.setAttribute('placeholder', 'your phone');


        let formButton = document.createElement('button');
        formButton.setAttribute('type', 'submit');
        formButton.setAttribute('class', 'button_submit');
        formButton.innerText = 'Save contact';

        formUser.append(contactTitle, userName, userMail, userAddress, userPhone, formButton);

        let contactsList = document.createElement('ol');
        contactsList.setAttribute('class', 'contact_list');
        this.contactsList = contactsList;

        document.body.append(formUser, contactsList);

        this.contactInputs = [userName, userMail, userAddress, userPhone];

        formUser.addEventListener('submit', (e) => {
            this.addUser(e)
        });
        

        let cookie = this.getCookie('contactsExp')

        if (!cookie){
            this.storage = [];
        }

        let dataStorage = this.storage;

        if(!dataStorage) {
            await this.getData();
        };

        if (dataStorage){
            dataStorage.forEach(elem => this.add(elem.data))
        }
        this.createUser();
        console.log(this.contacts);
    }

    addUser(e){
        e.preventDefault();

        let data = this.contactInputs.reduce((obj, elem) => ({...obj, [elem.name]:elem.value}),{})
        console.log(this);
        this.add(data);
        this.contactInputs.forEach(elem => elem.value = '')
        this.createUser();
        console.log(this.contacts);
    }

    createUser(){
        this.contactsList.innerHTML = '';
        let dataList = this.getContacts();

        dataList.map(elem => {
            let elemList = document.createElement('li');
            elemList.setAttribute('class', 'user_list_item');

            let listName = document.createElement('div');
            listName.setAttribute('class', 'user_list_item_name');
            listName.innerText = elem.data.name;
            
            let listMail = document.createElement('div');
            listMail.setAttribute('class', 'user_list_item_email');
            listMail.innerText = elem.data.email;

            let listAddress = document.createElement('div');
            listAddress.setAttribute('class', 'user_list_item_address');
            listAddress.innerText = elem.data.address;

            let listPhone = document.createElement('div');
            listPhone.setAttribute('class', 'user_list_item_phone');
            listPhone.innerText = elem.data.phone;


            let editBtn = document.createElement("button");
            editBtn.setAttribute('class', 'user_list_item_edit');
            editBtn.innerText = 'Edit'

            let removeBtn = document.createElement("button");
            removeBtn.setAttribute('class', 'user_list_item_remove');
            removeBtn.innerText = 'X';
            elemList.append(listName, listMail, listAddress, listPhone, editBtn, removeBtn)
            this.contactsList.append(elemList);

            editBtn.addEventListener('click', _ => {
                this.editUser(listName, listMail, listAddress, listPhone)
            })

            removeBtn.addEventListener('click', _ => this.userRemove(elem.data.id))

            listName.addEventListener('keydown', e => {
                this.saveUser(e, elem.data.id, listName, listMail, listAddress, listPhone)
            })

            listMail.addEventListener('keydown', e => {
                this.saveUser(e, elem.data.id, listName, listMail, listAddress, listPhone)
            })
            listAddress.addEventListener('keydown', e => {
                this.saveUser(e, elem.data.id, listName, listMail, listAddress, listPhone)
            })
            listPhone.addEventListener('keydown', e => {
                this.saveUser(e, elem.data.id, listName, listMail, listAddress, listPhone)
            })
        })

        this.storage = this.contacts;

        this.setCookie('contactsExp', 1, {'max-age': 864000})
    }

    get storage(){
        let storage = localStorage.getItem('contacts');
        return JSON.parse(storage)
    }

    set storage(data){
        let dataStorage = JSON.stringify(data);
        localStorage.setItem('contacts', dataStorage);
    }

    editUser(name, email, address, phone){
        name.setAttribute('contenteditable', 'true');
        email.setAttribute('contenteditable', 'true');
        address.setAttribute('contenteditable', 'true');
        phone.setAttribute('contenteditable', 'true');
    }

    userRemove(id){
        this.remove(id);
        this.createUser();
    }

    async getData(){
        let rez = [];
        await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => json.map(data => rez.push(data)));
            rez = this.initFake(rez);
            return rez;     
    }


    
    saveUser(e, id, name, email, address, phone) {
        if (e.key === 'Enter' && e.ctrlKey) {
            name.setAttribute('contenteditable', 'false');
            email.setAttribute('contenteditable', 'false');
            address.setAttribute('contenteditable', 'false');
            phone.setAttribute('contenteditable', 'false');
                let data = {
                name: name.innerText,
                email: email.innerText,
                address: address.innerText,
                phone: phone.innerText,
            }

            this.edit(id, data);
        }
        this.storage = this.contacts;
    }

//================================//
    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    setCookie(name, value, options = {}) {
        options = {
            path: '/',
            ...options
        };
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
        document.cookie = updatedCookie;
    }
    
}
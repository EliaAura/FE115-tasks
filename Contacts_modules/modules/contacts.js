import User from "./user.js";

export default class Contacts {
    constructor() {
        this.userId = 1;
        this.contacts = [];
    }

    add(data){
        if(data.name.length > 0 && data.address.length > 0 && data.email.length > 0 && data.phone.length > 0) {
            this.userId++;

            let user = new User(data);
            user.data.id = this.userId;
            this.contacts.push(user);
        }
    }

    edit(id, data){
        let userFind = this.contacts.find(user => {
            return user.data.id === id ? user : null;
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
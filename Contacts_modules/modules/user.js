export default class User{
    constructor(data) {
        if(data.name.length > 0 && data.address.length > 0 && data.email.length > 0 && data.phone.length > 0) this.data = data;
    }

    edit(data) {
        Object.assign(this.data, data)
    }
}

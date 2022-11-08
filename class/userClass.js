
export default class User {
    constructor(items) {
        this.items = items;

    }

    cLog() {
        // console.log(this.items);
        return (this.items ? true : false)
    }

}
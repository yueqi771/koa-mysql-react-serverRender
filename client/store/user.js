import { observable, computed, action } from 'mobx';

export default class UserStore {
    constructor({ name } = { name: '越祈' }) {
        this.name = name
    }
    @observable name;

    @computed get msg() {
        return `你的名字是' ${this.name}'`
    }

    @action changeName(name) {
        this.name = name;
    }

    toJson() {
        return {
            count: this.count,
            name: this.name
        }
    }
}
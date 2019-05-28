/*数据存储类:利用map集合存储*/
export class DataStore {
    constructor() {
        this.map = new Map();
    }
    put(key,value) {
        this.map.set(key,value);
    }
    get(key) {
        return this.map.get(key);
    }
    /*单例模式，一个类只创建一个对象*/
    static getInstance() {
        if(!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }
    /*清空数据的方法*/
    destory() {
        this.map.clear();
    }

}
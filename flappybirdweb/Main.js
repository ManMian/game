import{DataStore} from "./js/base/DataStore.js";
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";
import {Background} from "./js/runtime/Background.js";
import {Land} from "./js/runtime/Land.js";
import {Bird} from "./js/player/Bird.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

/*游戏的主文件*/
export class Main {
    constructor(){
        this.canvas = document.getElementById('bird');
        /*获取canvas的画笔*/
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        /*获取图片资源*/
        const loader = new ResourceLoader();
        loader.onLoaded(map =>this.onFirstLoaded(map));

        /* loader.onLoaded((map) =>{
           this.onFirstLoaded(map);
       });等价*/
    }
    onFirstLoaded(map) {
        this.dataStore.res = map;
        this.dataStore.ctx = this.ctx;
        this.init();
        this.registerEvent();
    }
    /*初始化游戏*/
    init(){
        /*向游戏中添加一个背景对象*/
        this.dataStore.put('background', new Background());
        /*添加一个陆地*/
        this.dataStore.put('land', new Land());
        /*添加铅笔*/
        this.dataStore.put('pencils', []);
        this.director.createPencil();
        /*添加小鸟*/
        this.dataStore.put('bird', new Bird());
        /*添加分数对象*/
        this.dataStore.put('score', new Score());

        /*添加开始按钮*/
        this.dataStore.put('start', new StartButton());

        this.director.isGameOver = false;
        this.director.run();
    }
    /*注册事件*/
    registerEvent() {
        this.canvas.addEventListener('touchstart', e => {/*????*/
            /*屏蔽事件冒泡*/
            e.preventDefault();
            if(this.director.isGameOver) {
                console.log(1)
                /*重新初始化游戏*/
                this.init();
            }else {
                this.dataStore.get('bird').birdClick();
            }
        })
    }
}
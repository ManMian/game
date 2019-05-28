import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/Downpencil.js";
import {Rectangle} from "./base/Rectangle.js";

/*导演类，负责游戏所有逻辑控制*/
export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
    }
    static getInstance() {
        if(!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
    /*创建一对铅笔*/
    createPencil() {
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        const top = minTop + (Math.random() * (maxTop - minTop));
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }
    /*判断是否生成下一对铅笔*/
    isCreatePencil() {
        const  pencils = this.dataStore.get('pencils');
        /*判断第一对铅笔右边缘走过屏幕的一半并且此时铅笔数组中只能有两个*/
        if((pencils[0].x + pencils[0].width) < (window.innerWidth / 2) && pencils.length == 2) {
            this.createPencil();
        }
    }
        /*移除铅笔*/
    outPencil() {
        const  pencils = this.dataStore.get('pencils');
        /*判断第一对铅笔右边缘走过屏幕左边一半并且此时铅笔数组中只能有四个*/
        if((pencils[0].x + pencils[0].width) < 0 && pencils.length == 4) {
            pencils.shift();
            pencils.shift();

            this.dataStore.get('score').isScore = true;
        }
    }
    /*小鸟撞击地板的检测方法*/
    crashLand() {
        let s = false;
        const bird = this.dataStore.get('bird');
        const land = this.dataStore.get('land');
        if(bird.y + bird.offSet + bird.height >= land.y){
            s =true;
        }
        return s;
    }
    /*判断鸟和铅笔的碰撞*/
    crashPencil() {
        const pencils = this.dataStore.get('pencils');
        const bird = this.dataStore.get('bird');
        /*创建小鸟的矩形*/
        const birdRect = new Rectangle(bird.x, bird.y + bird.offSet, bird.width, bird.height);

        for (let pencil of pencils) {
            const pencilRect = new Rectangle(pencil.x, pencil.y, pencil.width, pencil.height);
            if(birdRect.intersects(pencilRect)){
                return true;
            }
        }
        return false;
    }

    addScoreNumber() {
        const pencils = this.dataStore.get('pencils');
        const bird = this.dataStore.get('bird');
        const score = this.dataStore.get('score');
        /*判断小鸟越过铅笔*/
        if(bird.x + bird.width >= pencils[0].x && score.isScore) {
            score.scoreNumber++;
            score.isScore = false;
        }
    }

    /*游戏的运行*/
    run() {
        if(!this.isGameOver) {
            /*this.dataStore.ctx.drawImage(this.dataStore.res.get('background'),
           0,
           0,
           this.dataStore.res.get('background').width,
           this.dataStore.res.get('background').height,
           0,
           0,
           this.dataStore.res.get('background').width,
           this.dataStore.res.get('background').height
           );*/
            /*绘制背景*/
            this.dataStore.get('background').draw();
            /*绘制铅笔*/
            for (let pencil of this.dataStore.get('pencils')) {
                pencil.draw();
            }
            /*绘制陆地*/
            this.dataStore.get('land').draw();
            /*调用判断是否生成新的铅笔he 移除铅笔*/
            this.isCreatePencil();
            this.outPencil();

            this.dataStore.get('bird').draw();

            this.addScoreNumber();
            this.dataStore.get('score').draw();

            if (this.crashLand()){
                this.isGameOver = true;
            }
            if (this.crashPencil()) {
                this.isGameOver = true;
            }

            /*定时器*/
            let timer = requestAnimationFrame(() => {this.run();});
            this.dataStore.put('timer', timer);
        }else {
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.get('start').draw();/*!!!!!!!!!注意顺序*/
            this.dataStore.destory();

        }
    }
}
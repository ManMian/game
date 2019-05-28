import {Spirit} from "../base/Spirit.js";
import {DataStore} from "../base/DataStore.js";

export class StartButton extends Spirit{
    constructor() {
        const image = DataStore.getInstance().res.get('start');
        super(
            image,
            0,
            0,
            image.width,
            image.height,
            window.innerWidth / 2 - 30,
            window.innerHeight / 2.5,
            image.width,
            image.height
        );
    }
}
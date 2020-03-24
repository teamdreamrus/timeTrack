export class Timer {
    constructor() {
    }

    start() {
        this.detector = setInterval(() => {
            this.counter += 1;
        }, 1000);
    };
    getSeconds () {
        this.drop();
        return this.counter;
    }
    drop(){
        clearInterval(this.detector);
        this.counter = 0;
    }
}

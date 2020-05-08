export class Timer {
  constructor() {}

  start() {
    // this.detector = setInterval(() => {
    //   this.counter += 1;
    // }, 1000);
    this.timeStart = new Date().getTime();
  }
  // getSeconds() {
  //   return this.counter;
  // }
  stop() {
    this.timeStop = new Date().getTime();
  }
  // drop() {
  //   clearInterval(this.detector);
  //   this.counter = 0;
  // }
}

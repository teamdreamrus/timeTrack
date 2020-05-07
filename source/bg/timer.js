export class Timer {
  constructor() {}

  start() {
    this.detector = setInterval(() => {
      this.counter += 1;
    }, 1000);
    this.timeStart = new Date();
  }
  getSeconds() {
    return this.counter;
  }
  drop() {
    clearInterval(this.detector);
    this.counter = 0;
  }
}

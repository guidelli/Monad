class IO {
  // The constructor takes an effectful computation as an argument and stores it as a property on the new IO instance.
  constructor(effect) {
    this.effect = effect;
  }

  // A static method used to create a new IO instance with a pure value.
  static of(value) {
    // Returns a new IO instance that wraps a function which returns the provided value.
    return new IO(() => value);
  }

  // A method used to apply a function to the result of the computation contained within the IO instance, while preserving the structure of the monad.
  map(fn) {
    // Returns a new IO instance that wraps a function which applies the provided function to the result of the computation.
    return new IO(() => fn(this.effect()));
  }

  // A method used to chain a function onto the computation contained within the IO instance.
  chain(fn) {
    // Returns a new IO instance created by mapping the provided function onto the computation, and then flattening the nested IO instances by joining them.
    return this.map(fn).join();
  }

  // A method used to join nested IO instances.
  join() {
    // Returns a new IO instance that wraps a function which retrieves the result of the computation contained within the nested IO instance.
    return new IO(() => this.effect().effect());
  }

  // A method used to run the computation contained within the IO instance.
  run() {
    // Returns the result of the computation.
    return this.effect();
  }
}
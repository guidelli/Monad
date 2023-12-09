class Either {

  // The static of() method creates a new instance of Right with the given value.
  static of(value) {
    return new Right(value);
  }

  // The static left() method creates a new instance of Left with the given value.
  static left(value) {
    return new Left(value);
  }
}

// The Left class extends the Either class and represents the Left side of the Either monad.
class Left extends Either {

  // The map() method returns this Left instance, as there is no value to transform.
  map() {
    return this;
  }

  // The chain() method returns this Left instance, as there is no value to pass to the given function.
  chain() {
    return this;
  }
}

// The Right class extends the Either class and represents the Right side of the Either monad.
class Right extends Either {

  // The map() method applies the given function to the value contained in this Right instance and returns a new Right instance with the transformed value.
  map(fn) {
    return Either.of(fn(this.value));
  }

  // The chain() method applies the given function to the value contained in this Right instance and returns the result.
  chain(fn) {
    return fn(this.value);
  }
}
export { Either }
// Let's make an object and start adding methods to it!
class LoScore {
  identity(val) {
    return val;
  }

  /**
  | ARRAYS
  |~~~~~~~~~~
  * */
  uniq(array) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      if (!newArray.includes(array[i])) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  }

  /**
  | COLLECTIONS
  |~~~~~~~~~~
  * */
  each(collection, iterator) {
    if (collection instanceof Array) {
      for (let i = 0; i < collection.length; i += 1) {
        iterator(collection[i], i, collection);
      }
    } else {
      const keys = Object.keys(collection);
      for (let i = 0; i < keys.length; i += 1) {
        iterator(collection[keys[i]], keys[i], collection);
      }
    }
  }

  map(collection, iteratee) {
    const output = [];

    this.each(collection, (value) => {
      output.push(iteratee(value));
    });

    return output;
  }

  filter(collection, test) {
    const result = [];
    this.each(collection, (val) => test(val) && result.push(val));
    return result;
  }

  reject(collection, test) {
    const output = [];

    this.filter(collection, (value) => {
      if (!test(value)) {
        output.push(value);
      }
    });
    return output;
  }

  reduce(collection, iterator, accumulator) {
    const array = collection.slice();

    if (accumulator === undefined) {
      accumulator = array[0];
      array.shift();

      this.each(array, (value) => {
        return (accumulator = iterator(accumulator, value));
      });
    } else {
      this.each(array, (value) => {
        return (accumulator = iterator(accumulator, value));
      });
    }

    return accumulator;
  }

  every(collection, test) {
    return this.reduce(
      collection,
      (accumulator, item) => {
        if (test === undefined) {
          return true;
        }
        if (!accumulator) {
          return false;
        }
        accumulator = test(item);
        if (accumulator) {
          return true;
        }
      },
      true
    );
  }

  /**
  | OBJECTS
  |~~~~~~~~~~
  * */
  extend(main) {
    const output = main;

    const objects = [...arguments].slice(1);

    let obj;

    this.each(objects, (value, key, objects) => {
      obj = objects[key];

      this.each(obj, (value, key, obj) => {
        output[key] = obj[key];
      });
    });

    return output;
  }

  /**
  | FUNCTIONS
  |~~~~~~~~~~
  * */

  once(func) {
    let alreadyCalled = false;

    let functionResult;

    return (value) => {
      if (!alreadyCalled) {
        functionResult = func(value);
        alreadyCalled = true;
        return functionResult;
      }
      return functionResult;
    };
  }

  memoize(func) {
    const cache = {};

    return (value) => {
      if (cache[value]) {
        return cache[value];
      }

      let funcResult = func(value);
      cache[value] = JSON.stringify(value);
      return funcResult;
    };
  }

  invoke(collection, functionOrKey) {
    const output = [];

    for (const key of collection) {
      if (functionOrKey instanceof Function) {
        output.push(functionOrKey.apply(key));
      } else {
        output.push(key[functionOrKey].apply(key));
      }
    }
    return output;
  }

  /**
  | ADVANCED REQUIREMENTS
  |~~~~~~~~~~~~~
  * */

  sortBy() {
    // YOUR CODE HERE
  }

  zip() {
    // YOUR CODE HREE
  }

  delay() {
    // YOUR CODE HERE
  }

  defaults() {
    // YOUR CODE HERE
  }

  throttle() {
    // YOUR CODE HERE
  }
}

module.exports = new LoScore();

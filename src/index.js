

class MyArray {
  constructor(...rest) {
    if (rest.length === 1 && typeof rest[0] === 'number') {
      this.length = rest[0];
    } else {
      for (let i = 0; i < rest.length; i++) {
        this[i] = rest[i];
      }
      this.length = arguments.length;
    }
  }
  push(...arg) {
    for (let i = 0; i < arg.length; i++) {
      this[this.length] = arg[i];
      this.length += 1;
    }
    return this.length;
  }

  pop() {
    const deletedElem = this[this.length - 1];

    if (this.length === 0) {
      return undefined;
    }

    delete this[this.length - 1];
    this.length = this.length - 1;
    return deletedElem;
  }


  map(callback, thisArg) {
    const mapArr = new MyArray();

    if (arguments.length > 0 && typeof callback === 'function') {
      for (let i = 0; i < this.length; i++) {
        mapArr[i] = callback.call(thisArg, this[i], i, this);
        mapArr.length += 1;
      }
    } else {
      throw new TypeError('callback is not a function');
    }
    return mapArr;
  }
  sort(callback) {
    if (callback) {
      for (let i = 0; i < this.length - 1; i++) {
        for (let j = 0; j < this.length - 1; j++) {
          if (callback(this[j], this[j + 1]) > 0) {
            const max = this[j];
            this[j] = this[j + 1];
            this[j + 1] = max;
          }
        }
      }
    } else if (arguments.length === 0) {
      for (let i = 0; i < this.length - 1; i++) {
        for (let j = 0; j < this.length - i; j++) {
          if (`${this[j]}` > `${this[j + 1]}`) {
            const max = this[j];
            this[j] = this[j + 1];
            this[j + 1] = max;
          }
        }
      }
    } else {
      throw new TypeError('callback is not a function');
    }
    return this;
  }
  static from(arr, callback, thisArg) {
    const arrFromed = new MyArray();

    if (arr.length === 0 || arr === 0) {
      throw new TypeError('Elements or length of array is not defined');
    } else if (arr === null) {
      throw new TypeError('Your array is to be null');
    }

    if (callback && thisArg) {
      for (let i = 0; i < arr.length; i++) {
        arrFromed.length += 1;
        arrFromed[i] = callback.call(thisArg, arr[i], i, arr);
      }
    } else if (callback) {
      for (let i = 0; i < arr.length; i++) {
        arrFromed.length += 1;
        arrFromed[i] = callback(arr[i], i, arr);
      }
    } else {
      for (let i = 0; i < arr.length; i++) {
        arrFromed.push(arr[i]);
      }
    }
    return arrFromed;
  }

  toString() {
    let str = '';

    for (let i = 0; i < this.length; i++) {
      if (i === this.length - 1) {
        str += this[i];
        break;
      }
      str += `${this[i]},`;
    }
    return str;
  }

  reduce(callback, initialValue) {
    if (this.length === 0 && !initialValue) {
      throw new TypeError('arr\'s empty and without initialValue');
    } else if (this.length === 0 && initialValue) {
      return initialValue;
    } else if (this.length === 1 && !initialValue) {
      return this[0];
    }

    let acc = initialValue || initialValue !== undefined ? initialValue : this[0];
    let i = initialValue || initialValue !== undefined ? 0 : 1;

    for (i; i < this.length; i++) {
      acc = callback(acc, this[i], i, this);
    }
    return acc;
  }
  filter(callback, ...arg) {
    const arrFiltered = new MyArray();

    if (arg.length > 0 && typeof callback === 'function') {
      for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
          arrFiltered[i] = this[i];
          arrFiltered.length += 1;
        }
      }
    }

    return arrFiltered;
  }

  * [Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }

  forEach(callback, thisArg) {
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  }
}


export default MyArray;



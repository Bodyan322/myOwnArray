

class MyArray {
  constructor(...rest) {
    if (rest.length === 1 && typeof rest[0] === 'number') {
      this.length = rest[0];
    } else {
      for (let i = 0; i < rest.length; i++) {
        this[i] = rest[i];
      }
      this.length = rest.length;
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
    if (this.length === 0) {
      return undefined;
    }

    const deletedElem = this[this.length - 1];
    delete this[this.length - 1];
    this.length -= 1;
    return deletedElem;
  }


  map(callback, thisArg) {
    const arr = new MyArray();

    for (let i = 0; i < this.length; i++) {
      arr[i] = callback.call(thisArg, this[i], i, this);
      arr.length += 1;
    }
    return arr;
  }
  sort(callback) {
    for (let i = 0; i < this.length - 1; i++) {
      for (let j = 0; j < this.length - 1; j++) {
        if (callback && callback(this[j], this[j + 1]) > 0) {
          const max = this[j];
          this[j] = this[j + 1];
          this[j + 1] = max;
        } else if (!callback && `${this[j]}` > `${this[j + 1]}`) {
          const max = this[j];
          this[j] = this[j + 1];
          this[j + 1] = max;
        }
      }
    }
    return this;
  }
  static from(arr, callback, thisArg) {
    const arrFromed = new MyArray();

    for (let i = 0; i < arr.length; i++) {
      if (arr && typeof callback === 'function') {
        arrFromed[i] = callback.call(thisArg, arr[i], i, arr);
      } else if (arr) {
        arrFromed[i] = arr[i];
      }
      arrFromed.length += 1;
    }

    return arrFromed;
  }

  toString() {
    let str = this.length === 0 ? '' : this[0];

    for (let i = 1; i < this.length; i++) {
      str += `,${this[i]}`;
    }
    return str;
  }

  reduce(callback, initialValue) {
    if (this.length === 0 && !initialValue) {
      throw new TypeError('arr\'s empty and without initialValue');
    } else if (this.length === 0 && initialValue) {
      return initialValue;
    }

    let acc = initialValue || initialValue !== undefined ? initialValue : this[0];
    let i = initialValue || initialValue !== undefined ? 0 : 1;

    for (i; i < this.length; i++) {
      acc = callback(acc, this[i], i, this);
    }
    return acc;
  }
  filter(callback, thisArg) {
    const arrFiltered = new MyArray();

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        arrFiltered[arrFiltered.length] = this[i];
        arrFiltered.length += 1;
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
  find(callback, thisArg) {
    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        return this[i];
      }
    }
  }
  slice(begin, end) {
    const arrSliced = new MyArray();
    let startValue = begin ? begin : 0;
    let endValue = end ? end : this.length;

    startValue = begin < 0 ? this.length + begin : startValue;
    endValue = end < 0 ? this.length + end : endValue;

    for (let i = startValue; i < endValue; i++) {
      arrSliced.push(this[i]);
    }
    return arrSliced;
  }
}


export default MyArray;



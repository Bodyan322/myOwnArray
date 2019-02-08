class MyArray <T>{
  length: number;
  [key: number]: T;
  
  constructor(...args: T[] | number[]) {
    if (args.length === 1 && typeof args[0] === 'number') {
      this.length = <number>args[0];
    } else {
      for (let i = 0; i < args.length; i++) {
        this[i] = <T>args[i];
      }
      this.length = args.length;
    }
  }
  push(...arg: T[]): number {
    for (let i = 0; i < arg.length; i++) {
      this[this.length] = arg[i];
      this.length += 1;
    }
    return this.length;
  }

  pop(): T | undefined {
    if (this.length === 0) {
      return undefined;
    }

    const deletedElem = this[this.length - 1];
    delete this[this.length - 1];
    this.length -= 1;
    return deletedElem;
  }


  map<U>(callback: (value?: T, index?: number, array?: MyArray<T>) => U, thisArg?: any) {
    const arr = new MyArray<U>();

    for (let i = 0; i < this.length; i++) {
      arr[i] = callback.call(thisArg, this[i], i, this);
      arr.length += 1;
    }
    return arr;
  }
  sort(callback?: (a?: T, b?: T) => number): this {
    const cb = callback ? callback : (a: T, b: T) => `${a}` > `${b}`;

    for (let i = 0; i < this.length - 1; i++) {
      for (let j = 0; j < this.length - 1; j++) {
        if (cb(this[j], this[j + 1]) > 0) {
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
      if (typeof callback === 'function') {
        arrFromed[i] = callback.call(thisArg, arr[i], i, arr);
      } else {
        arrFromed[i] = arr[i];
      }
      arrFromed.length += 1;
    }

    return arrFromed;
  }

  toString() : string {
    let str: string = this.length === 0 ? '' : `${this[0]}`;

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

    let acc = initialValue !== undefined ? callback(initialValue, this[0], 0, this) : this[0];

    for (let i = 1; i < this.length; i++) {
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

    const startValue = begin < 0 ? this.length + begin : begin || 0;
    const endValue = end < 0 ? this.length + end : end || this.length;

    for (let i = startValue; i < endValue; i++) {
      arrSliced[arrSliced.length] = this[i];
      arrSliced.length += 1;
    }
    return arrSliced;
  }
}


export default MyArray;


